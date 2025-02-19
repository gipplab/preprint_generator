import {latexSty} from "./LatexSty";
import {latexMD} from "./LatexMD";
import {generateLatexTex} from "./LatexTex";

function downloadFileFromText(content: string, filename: string): void {
    const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Example usage
export function downloadLatexFiles(annotation: string, link: string, relatedPapers: string[], onlineLink: boolean = true): void {
    const styText = latexSty
    const texText = generateLatexTex(annotation, link, relatedPapers, onlineLink)
    const mdText = latexMD

    downloadFileFromText(styText, 'annotation.sty');
    downloadFileFromText(texText, 'annotation.tex');
    downloadFileFromText(mdText, 'instructions.md');
}