// Inspired by: https://github.com/davidagraf/doi2bib2/blob/master/server/doi2bib.js

export interface RelatedPaperInfo {
    title: string,
    author?: string,
    url?: string,
    doi?: string,
    year?: string

}

export function relatedPaperToString(paper: RelatedPaperInfo) {
    let result = ""
    if (paper.author) {
        result += paper.author + ". "
    }
    result += paper.title + ". "
    if (paper.url) {
        result += paper.url + ". "
    }
    if (paper.doi) {
        result += paper.doi + ". "
    }
    if (paper.year) {
        result += paper.year + ". "
    }
    return result
}

function doi2bibOptions(doi: string) {
    return {
        url: 'https://doi.org/' + doi,
        headers: {
            'Accept': 'application/x-bibtex; charset=utf-8'
        }
    };
}

export async function doi2bib(doi_id: string): Promise<RelatedPaperInfo | null> {
    const doiOptions = doi2bibOptions(doi_id)
    let text: string
    try {
        const res = await fetch(doiOptions.url, {headers: doiOptions.headers})
        text = await res.text()
    } catch (_) {
        return null
    }
    const titleRes = text.match(/title = {(.+)},/)
    const authorRes = text.match(/author = {(.+)},/)
    const urlRes = text.match(/url = {(.+)},/)
    const doiRes = text.match(/doi = {(.+)},/)
    const yearRes = text.match(/year = {(.+)},/)
    const title = (titleRes) ? (((titleRes.length > 1) ? titleRes[1] : "Error")) : "Error"
    if (title == "Error") {
        return null
    }
    const author = (authorRes) ? (((authorRes.length > 1) ? authorRes[1] : undefined)) : undefined
    const url = (urlRes) ? (((urlRes.length > 1) ? urlRes[1] : undefined)) : undefined
    const doi = (doiRes) ? (((doiRes.length > 1) ? doiRes[1] : undefined)) : undefined
    const year = (yearRes) ? (((yearRes.length > 1) ? yearRes[1] : undefined)) : undefined
    return {author: author, doi: doi, title: title, url: url, year: year}
}

function arxivid2doiOptions(arxivid: string) {
    const options = {
        url: 'https://export.arxiv.org/api/query?id_list=' + arxivid
    };
    return options;
}


export async function arxivid2doi(arxivid: string): Promise<RelatedPaperInfo | null> {
    const arxivOptions = arxivid2doiOptions(arxivid)
    let text: string
    try {
        const res = await fetch(arxivOptions.url)
        text = await res.text()
    } catch (_) {
        return null
    }
    const titleRes = text.match(/<title>(.+)<\/title>/s)
    const authorRes = text.match(/<name>(.+)<\/name>/g)
    const urlRes = text.match(/<link href="(.+)" rel="alternate"/)
    const yearRes = text.match(/<published>(.+)<\/published>/)
    const title = (titleRes) ? (((titleRes.length > 1) ? titleRes[1].replaceAll("\n", "").trim() : "Error")) : "Error"
    if (title == "Error") {
        return null
    }
    const author = (authorRes) ? (((authorRes.length > 1) ? authorRes.map(author => author.split("<name>")[1].split("</name>")[0]).join(", ") : undefined)) : undefined
    const url = (urlRes) ? (((urlRes.length > 1) ? urlRes[1] : undefined)) : undefined
    const year = (yearRes) ? (((yearRes.length > 1) ? (new Date(yearRes[1])).getFullYear().toString() : undefined)) : undefined
    return {author: author, title: title, url: url, year: year}
}