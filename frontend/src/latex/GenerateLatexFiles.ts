import {latexSty} from "./LatexSty";

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
export function downloadLatexFiles(): void {
    const styText = latexSty
    const texText = '...'; // Replace with your .tex file content
    const mdText = '...';  // Replace with your .md file content

    downloadFileFromText(styText, 'example.sty');
    downloadFileFromText(texText, 'example.tex');
    downloadFileFromText(mdText, 'example.md');
}