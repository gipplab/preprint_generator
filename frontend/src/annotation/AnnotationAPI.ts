// Inspired by: https://github.com/davidagraf/doi2bib2/blob/master/server/doi2bib.js

export interface RelatedPaperInfo {
    title: string,
    authors?: string,
    url?: string,
    doi?: string,
    year?: string

}

export function relatedPaperToString(paper: RelatedPaperInfo) {
    let result = ""
    if (paper.authors) {
        result += paper.authors + ". "
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

export async function doi2bib(doi_id: string): Promise<RelatedPaperInfo> {
    const doiOptions = doi2bibOptions(doi_id)
    const res = await fetch(doiOptions.url, {headers: doiOptions.headers})
    const text = await res.text()
    const titleRes = text.match(/title = {(.+)},/)
    const authorRes = text.match(/author = {(.+)},/)
    const urlRes = text.match(/url = {(.+)},/)
    const doiRes = text.match(/doi = {(.+)},/)
    const yearRes = text.match(/year = {(.+)},/)
    const title = (titleRes) ? (((titleRes.length > 1) ? titleRes[1] : doi_id)) : doi_id
    const author = (authorRes) ? (((authorRes.length > 1) ? authorRes[1] : undefined)) : undefined
    const url = (urlRes) ? (((urlRes.length > 1) ? urlRes[1] : undefined)) : undefined
    const doi = (doiRes) ? (((doiRes.length > 1) ? doiRes[1] : undefined)) : undefined
    const year = (yearRes) ? (((yearRes.length > 1) ? yearRes[1] : undefined)) : undefined
    return {authors: author, doi: doi, title: title, url: url, year: year}
}

function arxivid2doiOptions(arxivid: string) {
    var options = {
        url: 'http://export.arxiv.org/api/query?id_list=' + arxivid
    };
    return options;
}


export async function arxivid2doi(arxivid: string): Promise<RelatedPaperInfo> {
    const arxivOptions = arxivid2doiOptions(arxivid)
    const res = await fetch(arxivOptions.url)
    const text = await res.text()
    const titleRes = text.match(/<title>(.+)<\/title>/s)
    const authorRes = text.match(/<name>(.+)<\/name>/g)
    const urlRes = text.match(/<link href="(.+)" rel="alternate"/)
    const yearRes = text.match(/<published>(.+)<\/published>/)
    const title = (titleRes) ? (((titleRes.length > 1) ? titleRes[1].replaceAll("\n", "").trim() : arxivid)) : arxivid
    const author = (authorRes) ? (((authorRes.length > 1) ? authorRes.map(author => author.split("<name>")[1].split("</name>")[0]).join(", ") : undefined)) : undefined
    const url = (urlRes) ? (((urlRes.length > 1) ? urlRes[1] : undefined)) : undefined
    const year = (yearRes) ? (((yearRes.length > 1) ? (new Date(yearRes[1])).getFullYear().toString() : undefined)) : undefined
    return {authors: author, title: title, url: url, year: year}
}