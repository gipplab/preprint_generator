import {PDFDocument} from "pdf-lib";

export interface PDFFile {
    name: string;
    file: PDFDocument;
    info: PDFInfo
}

export interface PDFInfo {
    title: string;
    author: string;
    venue: string;
    pages: number;
    date: Date;
}

export function parsePDF(file: PDFDocument): PDFInfo {
    let author = file.getAuthor() || ""
    let title = file.getTitle() || ""
    let pages = file.getPageCount()
    let date = file.getCreationDate() || new Date()
    console.log(file.getPage(0))

    return {author: author, date: date, pages: pages, venue: "", title: title}
}