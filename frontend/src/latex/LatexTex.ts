export function generateLatexTex(annotation: string, link: string, relatedPapers: string[], onlineLink: boolean = false) {
    return "\\hypertarget{annotation}{}\n" +
        "\\citationtitle\n\n" +
        `${onlineLink ? `\\onlineversion{${link}}\n` : ""}` +
        "\\begin{bibtexannotation}\n" +
        annotation +
        "\\end{bibtexannotation}\n\n" +
        (relatedPapers.length !== 0 ?
            "\\begin{relatedpapers}\n" +
            relatedPapers.map((rel) => `    \\relatedpaper{${rel}}\n`).join("") +
            "\\end{relatedpapers}" : "")
}