import {PDFDocument, PDFName} from 'pdf-lib';
import {jsPDF} from 'jspdf';
import {RelatedPaperInfo, relatedPaperToString} from "../annotation/AnnotationAPI";

function saveByteArray(reportName: string, byte: Uint8Array) {
    const blob = new Blob([byte], {type: "application/pdf"});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = reportName;
    link.click();
}


function createCitationPDF(uuid: string, size: { width: number, height: number }, bibTexEntries: {
    [id: string]: string
}, similarPreprints?: RelatedPaperInfo[]): { pdf: ArrayBuffer, text: string } {
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [size.width, size.height]
    });
    const leftMargin = 50;
    const topMargin = 50;
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Header Title
    pdf.setFontSize(25);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Citation for this Paper', leftMargin, topMargin);

    // Online Version Link
    pdf.setFontSize(12);
    pdf.setTextColor("#0000EE")
    pdf.setFont('helvetica', 'normal');
    const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const url = `${baseUrl}/preprint/${uuid}`;
    pdf.textWithLink('Click here for the Online Version', leftMargin, topMargin + 30, {url: url});

    // Citation Box
    const citationStartY = topMargin + 50;
    const citationBoxPadding = 40;
    pdf.setFont('courier', 'normal');
    pdf.setTextColor("#000000")
    pdf.setFontSize(12);

    let bibAnnotationText = `@${bibTexEntries["artType"]}{${bibTexEntries["ref"]}`
    delete bibTexEntries["artType"]
    delete bibTexEntries["ref"]
    for (let key in bibTexEntries) {
        let value = bibTexEntries[key];
        if (value !== "") {
            bibAnnotationText += `,\n ${key}={${value}}`
        }
    }
    bibAnnotationText += "\n}"

    const linesBibtex = pdf.splitTextToSize(bibAnnotationText, pageWidth - 2 * leftMargin - 2 * citationBoxPadding);
    const citationBoxHeight = linesBibtex.length * 12 * 1.1 + 2 * citationBoxPadding;

    const cornerRadius = 20; // Radius of the rounded corners
    pdf.roundedRect(leftMargin, citationStartY, pageWidth - 2 * leftMargin, citationBoxHeight, cornerRadius, cornerRadius);
    pdf.text(linesBibtex, leftMargin + citationBoxPadding, citationStartY + citationBoxPadding); // Adjust as per line height

    if (!similarPreprints || similarPreprints.length === 0) {
        return {pdf: pdf.output('arraybuffer'), text: bibAnnotationText}
    }

    // Related Papers Section
    const relatedPapersStartY = citationStartY + citationBoxHeight + 50;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Related Papers', leftMargin, relatedPapersStartY);

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    let similarPreprintsText = ""
    similarPreprints.forEach((preprint, index) => {
        similarPreprintsText += `${index + 1}) ${relatedPaperToString(preprint)}\n\n`
    })

    const linesRelatedPapers = pdf.splitTextToSize(similarPreprintsText, pageWidth - 2 * leftMargin);

    pdf.text(linesRelatedPapers, leftMargin, relatedPapersStartY + 50);

    // Output as array buffer to merge with the existing PDF
    return {pdf: pdf.output('arraybuffer'), text: bibAnnotationText}
}


async function mergePDFs(originalPdfDoc: PDFDocument, citationPdfBytes: ArrayBuffer): Promise<PDFDocument> {
    const citationPdfDoc = await PDFDocument.load(citationPdfBytes);
    originalPdfDoc.getPageCount();
// Merge the PDFs
    const copiedPages = await originalPdfDoc.copyPages(citationPdfDoc, citationPdfDoc.getPageIndices());
    copiedPages.forEach(page => originalPdfDoc.addPage(page));

    // Add a button to the first page that links to the first page of the citation
    const firstPage = originalPdfDoc.getPage(0);
    const {width, height} = firstPage.getSize();

    let buttonImageBytes = await fetch("/citation_button.png").then((res) => res.arrayBuffer())
    let buttonImage = await originalPdfDoc.embedPng(buttonImageBytes)
    const buttonScale = 0.15;
    const buttonWidth = 758 * buttonScale;  // Set the button width
    const buttonHeight = 201 * buttonScale;  // Set the button height
    const buttonX = width - buttonWidth - 10;  // Position the button X pixels from the right edge
    const buttonY = height - buttonHeight - 10;  // Position the button Y pixels from the bottom edge

    firstPage.drawImage(buttonImage, {
        x: buttonX,
        y: buttonY,
        width: buttonWidth,
        height: buttonHeight
    })
    let link = originalPdfDoc.context.register(
        originalPdfDoc.context.obj({
            Type: 'Annot',
            Subtype: 'Link',
            /* Bounds of the link on the page */
            Rect: [
                buttonX, // lower left x coord
                buttonY, // lower left y coord
                buttonX + buttonWidth, // upper right x coord
                buttonY + buttonHeight, // upper right y coord
            ],
            /* Give the link a 2-unit-wide border, with sharp corners */
            Border: [0, 0, 0],
            /* Make the border color blue: rgb(0, 0, 1) */
            C: [0, 0, 1],
            /* Page to be visited when the link is clicked */
            Dest: [copiedPages[0].ref, 'XYZ', null, null, null],
        }),
    );
    firstPage.node.set(PDFName.of('Annots'), originalPdfDoc.context.obj([link]));

    return originalPdfDoc;
}


export async function createBibTexAnnotation(file: PDFDocument, name: string, uuid: string, download: boolean, bibTexEntries: {
    [id: string]: string
}, similarPreprints?: any[]): Promise<string> {

    // Create a PDF from the HTML content
    const citation = createCitationPDF(uuid, file.getPage(0).getSize(), bibTexEntries, similarPreprints);
    const bibTexText = citation.text
    const bibTexBytes = citation.pdf

    // Merge the new citation PDF with the original PDF
    let pdfBytes = await mergePDFs(file, bibTexBytes);

    // Save the merged PDF
    if (download) {
        saveByteArray(name, await pdfBytes.save());
    }

    // Return the annotation text (or modify as per your requirement)
    return bibTexText;
}