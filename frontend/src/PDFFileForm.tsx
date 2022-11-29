import React, {useState} from 'react';
import {PDFInfo} from "./utils/PDFParser";

interface PDFFileFormInterface {
    info: PDFInfo
    onSubmit: (info: PDFInfo) => void
}

export function PDFFileForm(props: PDFFileFormInterface) {
    let title = props.info.title
    let author = props.info.author
    let venue = props.info.venue
    let pages = props.info.pages
    let date = props.info.date
    return (
        <div>
            <div>Title</div>
            <input defaultValue={title} onChange={(value) => title = value.target.value}/>
            <div>Author</div>
            <input defaultValue={author} onChange={(value) => author = value.target.value}/>
            <div>Venue</div>
            <input defaultValue={venue} onChange={(value) => venue = value.target.value}/>
            <div>Date</div>
            <input defaultValue={`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`}
                   type="month"
                   onChange={(value) => date = new Date(value.target.value)}/>
            <button onClick={() => props.onSubmit({title, author, venue, pages, date})}>Submit</button>
        </div>
    )
}