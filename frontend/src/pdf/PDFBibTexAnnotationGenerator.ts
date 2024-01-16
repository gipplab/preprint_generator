import {PDFDocument, PDFName} from 'pdf-lib';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

function saveByteArray(reportName: string, byte: Uint8Array) {
    var blob = new Blob([byte], {type: "application/pdf"});
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = reportName;
    link.click();
};



function createCitationPDF(): ArrayBuffer {
    const pdf = new jsPDF();
    const leftMargin = 20;
    const topMargin = 20;
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Header Title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Citation for this Paper', leftMargin, topMargin);

    // Online Version Link
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.textWithLink('Click here for the Online Version', leftMargin, topMargin + 10, { url: 'http://example.com' });

    // Citation Box
    const citationStartY = topMargin + 20;
    const citationBoxPadding = 10;
    pdf.setFont('courier', 'normal');
    pdf.setFontSize(12);

    const citationText = `@techreport{citeassist,
  title={Citeassist: Enhancing Scholarly Workflow through Automated Preprint Citation and BibTeX Generation},
  author={anonymous},
  institution={anonymous},
  address={anonymous},
  number={1},
  year={2024},
  month={01}
}`;
    const lines = pdf.splitTextToSize(citationText, pageWidth - 2 * leftMargin - 2 * citationBoxPadding);
    const citationBoxHeight = lines.length * 4 * 1.15 + 2 * citationBoxPadding; // 6 is an approximate line height

    const cornerRadius = 5; // Radius of the rounded corners
    pdf.roundedRect(leftMargin, citationStartY, pageWidth - 2 * leftMargin, citationBoxHeight, cornerRadius, cornerRadius);
    pdf.text(lines, leftMargin + citationBoxPadding, citationStartY + citationBoxPadding); // Adjust as per line height

    // Related Papers Section
    const relatedPapersStartY = citationStartY + citationBoxHeight + 20;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Related Papers', leftMargin, relatedPapersStartY);

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    const relatedPapersText = '1. Anonymous. Enhanced Preprint Generator. 2024.';
    pdf.text(relatedPapersText, leftMargin, relatedPapersStartY + 10);

    // Output as array buffer to merge with the existing PDF
    return pdf.output('arraybuffer');
}


async function mergePDFs(originalPdfDoc: PDFDocument, citationPdfBytes: ArrayBuffer): Promise<PDFDocument> {
    const citationPdfDoc = await PDFDocument.load(citationPdfBytes);
    const originalPageCount = originalPdfDoc.getPageCount();

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


export async function createBibTexAnnotation(file: PDFDocument, name: string, uuid: string, bibTexEntries: {
    [id: string]: string
}, similarPreprints?: any[]): Promise<string> {

    // Create a PDF from the HTML content
    const citationPdfBytes = createCitationPDF();

    // Merge the new citation PDF with the original PDF
    let pdfBytes = await mergePDFs(file, citationPdfBytes);

    // Save the merged PDF
    saveByteArray(name, await pdfBytes.save());

    // Return the annotation text (or modify as per your requirement)
    return "Annotation Text";
}