import {PDFDocument, PDFName} from 'pdf-lib';
import {jsPDF} from 'jspdf';
import {RelatedPaperInfo, relatedPaperToString} from "../annotation/AnnotationAPI";
import unidecode from "unidecode";


function createCitationPDF(uuid: string, size: { width: number, height: number }, bibTexEntries: {
    [id: string]: string
}, similarPreprints?: RelatedPaperInfo[], onlineLink: boolean = false): { pdf: ArrayBuffer, text: string } {
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [size.width, size.height]
    });
    const leftMargin = 50;
    var topMargin = 50;
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
    if (onlineLink) {
        topMargin += 30
        pdf.textWithLink('Click here for the Online Version', leftMargin, topMargin, {url: url});
    }

    // Citation Box
    const citationStartY = topMargin + 20;
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

    const linesBibtex: string[] = pdf.splitTextToSize(bibAnnotationText, pageWidth - 2 * leftMargin - 2 * citationBoxPadding);
    const filteredLinesBibtex = linesBibtex.map(s => unidecode(s))

    const citationBoxHeight = filteredLinesBibtex.length * 12 * 1.1 + 2 * citationBoxPadding;

    const cornerRadius = 20; // Radius of the rounded corners
    pdf.roundedRect(leftMargin, citationStartY, pageWidth - 2 * leftMargin, citationBoxHeight, cornerRadius, cornerRadius);
    pdf.text(filteredLinesBibtex, leftMargin + citationBoxPadding, citationStartY + citationBoxPadding); // Adjust as per line height

    if (!similarPreprints || similarPreprints.length === 0) {
        return {pdf: pdf.output('arraybuffer'), text: bibAnnotationText}
    }

    // Related Papers Section
    const relatedPapersStartY = citationStartY + citationBoxHeight + 50;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Related Papers', leftMargin, relatedPapersStartY);

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    let currentY = relatedPapersStartY + 50; // Initial Y position for the first related paper
    const lineHeight = 10; // Adjust based on your font size and line spacing

    similarPreprints.forEach((preprint, index) => {
        const preprintText = `${index + 1}) ${relatedPaperToString(preprint)}\n\n`;
        const lines: string[] = pdf.splitTextToSize(preprintText, pageWidth - 2 * leftMargin);

        const filteredLines = lines.map(s => unidecode(s))
        const blockHeight = filteredLines.length * lineHeight;

        // Print the text without making it a link
        pdf.text(filteredLines, leftMargin, currentY);

        // Overlay a transparent link rectangle over the text block
        // Note: The link rectangle coordinates are (x, y, width, height)
        if (preprint.url) {
            pdf.link(leftMargin, currentY - lineHeight * 0.8, pageWidth - 2 * leftMargin, blockHeight, {url: preprint.url});
        }

        // Update currentY to the next block position, adding extra space between entries if needed
        currentY += blockHeight + lineHeight; // Adjust spacing as needed
    });

    // Output as array buffer to merge with the existing PDF
    return {pdf: pdf.output('arraybuffer'), text: bibAnnotationText};

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


export async function createBibTexAnnotation(file: PDFDocument, uuid: string, bibTexEntries: {
    [id: string]: string
}, similarPreprints?: any[], onlineLink: boolean = true): Promise<{ text: string; bytes: Uint8Array; }> {

    // Create a PDF from the HTML content
    const citation = createCitationPDF(uuid, file.getPage(0).getSize(), bibTexEntries, similarPreprints, onlineLink);
    const bibTexText = citation.text
    const bibTexBytes = citation.pdf

    // Merge the new citation PDF with the original PDF
    let pdfBytes = await mergePDFs(file, bibTexBytes);

    // Return the annotation text (or modify as per your requirement)
    return {text: bibTexText, bytes: await pdfBytes.save()};
}