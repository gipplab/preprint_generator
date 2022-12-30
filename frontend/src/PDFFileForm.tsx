import React, {useState} from 'react';
import {PDFInfo} from "./pdf/PDFParser";

interface PDFFileFormInterface {
    info: PDFInfo
    onSubmit: (info: PDFInfo) => void
}

export function PDFFileForm(props: PDFFileFormInterface) {
    let artType = props.info.artType
    let artTitle = props.info.artTitle
    let title = props.info.title
    let author = props.info.author
    let pages = props.info.pages
    let date = props.info.date
    return (
        <div>
            <div>
                <label htmlFor="type">What describes your work the best?:</label>
                <select name="article" id="type" onChange={(value) => artType = value.target.value}>
                    <option value="article">Journal article</option>
                    <option value="book">Book</option>
                    <option value="booklet">Printed work without a publisher</option>
                    <option value="inbook">Any section in a book</option>
                    <option value="incollection">A titled section of a book</option>
                    <option value="inproceedings">Conference paper</option>
                    <option value="manual">Manual</option>
                    <option value="mastersthesis">Master's thesis</option>
                    <option value="phdthesis">PhD thesis</option>
                    <option value="techreport">Technical report or white paper</option>
                    <option value="unpublished">A work that has not yet been officially published</option>
                    <option value="misc">Miscellaneous: if nothing else fits</option>
                </select>
            </div>
            <div>
                <label htmlFor="reference">Choose a reference name:</label>
                <input id="reference" defaultValue={artTitle} onChange={(value) => artTitle = value.target.value}/>
            </div>
            <div>
                <label htmlFor="title">Choose a title:</label>
                <input id="title" defaultValue={title} onChange={(value) => title = value.target.value}/>
            </div>
            <div>
                <label htmlFor="author">Author:</label>
                <input id="author" defaultValue={author} onChange={(value) => author = value.target.value}/>
            </div>
            <div>
                <label htmlFor="date">Choose a publishing date:</label>
                <input id="date"
                       defaultValue={`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`}
                       type="month"
                       onChange={(value) => date = new Date(value.target.value)}/>
            </div>
            <button
                onClick={() => props.onSubmit({artType, keywords: [], artTitle, title, author, pages, date})}>Submit
            </button>
        </div>
    )
}