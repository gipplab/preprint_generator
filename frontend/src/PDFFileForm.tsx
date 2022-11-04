import React, {useState} from 'react';

interface PDFFileFormInterface {
    title: string
    author: string
    venue: string
    date: Date
    pages: number
    onSubmit: (info: PDFInformation) => void
}

interface PDFInformation {
    title: string
    author: string
    venue: string
    date: Date
}

export function PDFFileForm(props: PDFFileFormInterface) {
    let title = props.title
    let author = props.author
    let venue = props.venue
    let date = props.date

    return (
        <div>
            <div>Title</div>
            <input defaultValue={title} onChange={(value) => title = value.target.value}/>
            <div>Author</div>
            <input defaultValue={author} onChange={(value) => author = value.target.value}/>
            <div>Venue</div>
            <input defaultValue={venue} onChange={(value) => venue = value.target.value}/>
            <div>Date</div>
            <input defaultValue={date.toString()} type="month" onChange={(value) => date = new Date(value.target.value)}/>
            <button onClick={() => props.onSubmit({title, author, venue, date})}>Submit</button>
        </div>
    )
}