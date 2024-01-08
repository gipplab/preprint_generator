import {PDFDocument} from "pdf-lib";
import {extractKeywords} from "../languageProcessing/ExtractKeywords";

export interface PDFFile {
    name: string;
    file: PDFDocument;
    info: PDFInfo
}

export interface PDFInfo {
    artType: string;
    artTitle: string;
    title: string;
    volume?: number;
    issn?: string;
    number?: number;
    journal?: string;
    doi?: string;
    author?: string;
    pages: number;
    date: Date;
    keywords: string[]
}

export function parsePDF(file: PDFDocument, text: { firstPage: any; text: string }, name: string): PDFInfo {
    const maxHeight = Math.max(...text.firstPage.items.map((item: { height: number }) => {
        return item.height
    }))
    let artType = "article"
    let author = file.getAuthor()
    let title = text.firstPage.items.filter((item: { height: number }) => {
        return item.height == maxHeight
    }).map((item: any) => {
        return item.str
    }).join("").trim().replace(/\s+/g, " ") || file.getTitle() || name.substring(0, name.length - 4).replace(/\s+/g, " ")
    let pages = file.getPageCount()
    let date = file.getCreationDate() || new Date()
    let volume
    let issn
    let number
    let journal
    let doi
    let artTitle = ((author || title).replace(/\s/g, '')) + date.getFullYear()
    let keywords: string[] = extractKeywords(text.text, 10)

    return {artType, author, date, pages, artTitle, title, volume, issn, number, journal, doi, keywords}
}
