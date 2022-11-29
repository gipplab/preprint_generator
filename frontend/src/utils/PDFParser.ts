import {PDFDocument} from "pdf-lib";

export interface PDFFile {
    name: string;
    file: PDFDocument;
    info: PDFInfo
}

export interface PDFInfo {
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
}

export function parsePDF(file: PDFDocument, name: string): PDFInfo {
    let author = file.getAuthor()
    let title = file.getTitle() || name.substring(0, name.length - 4)
    let pages = file.getPageCount()
    let date = file.getCreationDate() || new Date()
    let volume
    let issn
    let number
    let journal
    let doi
    let artTitle = ((author || title).replace(/\s/g, '')) + date.getFullYear()


    return {author, date, pages, artTitle, title, volume, issn, number, journal, doi}
}