export function generateLatexTex(annotation: string, link: string, relatedPapers: string[]) {
    return "\\hypertarget{annotation}{}\n" +
        "\\citationtitle\n" +
        "\n" +
        `\\onlineversion{${link}}` +
        "\n" +
        "\\begin{bibtexannotation}\n" +
        annotation +
        "\\end{bibtexannotation}\n" +
        "\n" +
        "\\begin{relatedpapers}\n" +
        relatedPapers.map((rel) => `    \\relatedpaper{${rel}}\n`).join("") +
        "\\end{relatedpapers}"
}