import React, {useState} from 'react';
import {PDFInfo} from "./utils/PDFParser";

interface PDFFileFormInterface {
    info: PDFInfo
    onSubmit: (info: PDFInfo) => void
}

export function PDFFileForm(props: PDFFileFormInterface) {
    let artTitle = props.info.artTitle
    let title = props.info.title
    let author = props.info.author
    let pages = props.info.pages
    let date = props.info.date
    return (
        <div>
            <div>Article Title</div>
            <input defaultValue={artTitle} onChange={(value) => artTitle = value.target.value}/>
            <div>Title</div>
            <input defaultValue={title} onChange={(value) => title = value.target.value}/>
            <div>Author</div>
            <input defaultValue={author} onChange={(value) => author = value.target.value}/>
            <div>Date</div>
            <input defaultValue={`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`}
                   type="month"
                   onChange={(value) => date = new Date(value.target.value)}/>
            <button onClick={() => props.onSubmit({artTitle, title, author, pages, date})}>Submit</button>
        </div>
    )
}