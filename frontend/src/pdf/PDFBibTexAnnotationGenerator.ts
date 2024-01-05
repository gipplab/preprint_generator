import {breakTextIntoLines, PDFDocument, PDFName, PDFPage, PDFString, rgb, StandardFonts} from "pdf-lib";
import {RelatedPaperInfo, relatedPaperToString} from "../annotation/AnnotationAPI";

function saveByteArray(reportName: string, byte: Uint8Array) {
    var blob = new Blob([byte], {type: "application/pdf"});
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = reportName;
    link.click();
};


const createPageLinkAnnotation = async (pdfDoc: PDFDocument, position: { x: number, y: number, scale: number } = {
    x: 120,
    y: 60,
    scale: 0.1
}) => {

    let firstPage = pdfDoc.getPage(0)
    let bibPage = pdfDoc.addPage([firstPage.getWidth(), firstPage.getHeight()])
    let pageRef = bibPage.ref
    const {width, height} = firstPage.getSize()
    let buttonImageBytes = await fetch("/citation_button_small.png").then((res) => res.arrayBuffer())
    let buttonImage = await pdfDoc.embedPng(buttonImageBytes)
    let buttonScale = buttonImage.scale(position.scale)
    firstPage.drawImage(buttonImage, {
        x: width - position.x,
        y: height - position.y,
        width: buttonScale.width,
        height: buttonScale.height
    })
    let link = pdfDoc.context.register(
        pdfDoc.context.obj({
            Type: 'Annot',
            Subtype: 'Link',
            /* Bounds of the link on the page */
            Rect: [
                width - position.x, // lower left x coord
                height - position.y, // lower left y coord
                width - position.x + buttonScale.width, // upper right x coord
                height - position.y + buttonScale.height, // upper right y coord
            ],
            /* Give the link a 2-unit-wide border, with sharp corners */
            Border: [0, 0, 0],
            /* Make the border color blue: rgb(0, 0, 1) */
            C: [0, 0, 1],
            /* Page to be visited when the link is clicked */
            Dest: [pageRef, 'XYZ', null, null, null],
        }),
    );
    firstPage.node.set(PDFName.of('Annots'), pdfDoc.context.obj([link]));
    return bibPage
}

async function addBibTexAnnotation(pdfDoc: PDFDocument, page: PDFPage, uuid: string, bibTexEntries: {
    [id: string]: string
}, similarPreprints?: RelatedPaperInfo[]) {
    const {width, height} = page.getSize()
    let normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    let annotationFont = await pdfDoc.embedFont(StandardFonts.Courier)
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
    let bibAnnotationFontsize = 10
    const textWidth = (t: string) => annotationFont.widthOfTextAtSize(t, bibAnnotationFontsize);
    const lineCount = breakTextIntoLines(bibAnnotationText, [""], width - 100, textWidth).length;
    let bibAnnotationHeight = bibAnnotationFontsize * lineCount * 1.5
    page.drawText("Citation for this Paper", {x: 150, y: height - 50, size: 30, font: normalFont})
    page.drawText("BibTeX:", {x: 50, y: height - 90, size: 20, font: normalFont})

    const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    const url = `${baseUrl}/preprint/${uuid}`; // Adjust title for URL
    const urlLink = pdfDoc.context.register(
        pdfDoc.context.obj({
            Type: 'Annot',
            Subtype: 'Link',
            Rect: [50, height - 140, 270, height - 110], // Adjust these coordinates as needed
            Border: [0, 0, 0],
            /* Make the border color blue: rgb(0, 0, 1) */
            C: [0, 0, 1],
            A: {
                Type: 'Action',
                S: 'URI',
                URI: PDFString.of(url),
            },
        })
    );

    page.node.set(PDFName.of('Annots'), pdfDoc.context.obj([urlLink]));

    const text = 'Explore This Preprint on Our Web Portal';
    const fontSize = 12; // Adjust as needed
    page.drawText(text, {
        x: 50, // Align this with the Rect coordinates
        y: height - 130, // Align this with the Rect coordinates
        size: fontSize,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0, 0, 1) // Blue color, adjust as needed
    });

    page.drawText(bibAnnotationText, {
        x: 55,
        y: height - 155 - bibAnnotationFontsize,
        maxWidth: width - 100,
        wordBreaks: [""],
        lineHeight: bibAnnotationFontsize * 1.5,
        size: bibAnnotationFontsize,
        font: annotationFont
    })
    page.drawRectangle({
        x: 50,
        y: height - 160 - bibAnnotationHeight,
        width: width - 100,
        height: bibAnnotationHeight + 10,
        borderWidth: 1,
        opacity: 0,
        borderColor: rgb(0, 0, 0)
    })
    if (!similarPreprints || similarPreprints.length == 0) {
        return bibAnnotationText
    }

    let similarPreprintFontsize = 12
    let similarPreprintsText = ""
    similarPreprints.forEach((preprint, index) => {
        similarPreprintsText += `${index + 1}) ${relatedPaperToString(preprint)}\n\n`
    })

    page.drawText("Related Papers:", {x: 50, y: height - 185 - bibAnnotationHeight, size: 20, font: normalFont})
    page.drawText(similarPreprintsText, {
        x: 55,
        y: height - 200 - bibAnnotationHeight - similarPreprintFontsize,
        maxWidth: width - 100,
        lineHeight: similarPreprintFontsize * 1.5,
        size: similarPreprintFontsize,
        font: normalFont
    })

    return bibAnnotationText
}

export async function createBibTexAnnotation(file: PDFDocument, name: string, uuid: string, bibTexEntries: {
    [id: string]: string
}, similarPreprints?: RelatedPaperInfo[]) {
    let pdfDoc = file
    let bibPage = await createPageLinkAnnotation(pdfDoc)
    const annotationText = await addBibTexAnnotation(pdfDoc, bibPage, uuid, bibTexEntries, similarPreprints)
    let pdfBytes = await pdfDoc.save()
    saveByteArray(name, pdfBytes);
    return annotationText
}