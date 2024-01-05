import {Button, Chip, Grid,} from '@mui/material';
import React, {useState} from 'react';
import {PDFInfo} from "./PDFParser";
import {GenerateButton} from "../inputComponents/GenerateButton";
import {EntryFieldGenerator} from "../inputComponents/EntryFieldGenerator";
import {EntryInputField} from "../inputComponents/EntryInputField";
import {PublishDateSelector} from "../inputComponents/PublishDateSelector";
import {ArticleTypeSelect} from "../inputComponents/ArticleTypeSelect";

interface PDFFileFormInterface {
    info: PDFInfo
    entries: BibTexEntry[]
    setEntries: React.Dispatch<React.SetStateAction<BibTexEntry[]>>
    publishDate: Date
    setPublishDate: React.Dispatch<React.SetStateAction<Date>>
    artType: string
    setArtType: React.Dispatch<React.SetStateAction<string>>
    artTypeError: boolean
    setArtTypeError: React.Dispatch<React.SetStateAction<boolean>>
}

export interface BibTexEntry {
    name: string
    tag: string
    default: boolean
    value: string
    error?: boolean
    type?: string
}

export function PDFFileForm(props: PDFFileFormInterface) {
    const bibTexEntries = {
        ref: {name: "Reference", tag: "ref", default: true, value: props.info.artTitle},
        title: {name: "Title", tag: "title", default: true, value: props.info.title},
        author: {name: "Author (seperated by comma)", tag: "author", default: true, value: props.info.author || ""},
        pages: {name: "Pages", tag: "pages", default: true, value: "" + props.info.pages, type: "number"},
        doi: {name: "DOI", tag: "doi", default: true, value: "", type: ""},
        url: {name: "URL", tag: "url", default: true, value: "", type: ""},
        journal: {name: "Journal", tag: "journal", default: true, value: "", type: ""},
        volume: {name: "Volume", tag: "volume", default: true, value: "", type: "number"},
        number: {name: "Number", tag: "number", default: true, value: "", type: "number"},
        publisher: {name: "Publisher", tag: "publisher", default: true, value: "", type: ""},
        address: {name: "Address", tag: "address", default: true, value: "", type: ""},
        howpublished: {name: "howpublished", tag: "howpublished", default: true, value: "", type: ""},
        booktitle: {name: "Booktitle", tag: "booktitle", default: true, value: "", type: ""},
        editor: {name: "Editor", tag: "editor", default: true, value: "", type: ""},
        series: {name: "Series", tag: "series", default: true, value: "", type: ""},
        organization: {name: "Organization", tag: "organization", default: true, value: "", type: ""},
        school: {name: "School", tag: "school", default: true, value: "", type: ""},
        note: {name: "Note", tag: "note", default: true, value: "", type: ""},
        institution: {name: "Institution", tag: "institution", default: true, value: "", type: ""},
    }
    const artTypeFields: { [type: string]: BibTexEntry[] } = {
        "article": [bibTexEntries.ref, bibTexEntries.author, bibTexEntries.title, bibTexEntries.journal, bibTexEntries.volume, bibTexEntries.number, bibTexEntries.pages],
        "book": [bibTexEntries.ref, bibTexEntries.author, bibTexEntries.title, bibTexEntries.publisher, bibTexEntries.address],
        "booklet": [bibTexEntries.ref, bibTexEntries.title, bibTexEntries.author, bibTexEntries.howpublished],
        "inbook": [bibTexEntries.ref, bibTexEntries.author, bibTexEntries.title, bibTexEntries.booktitle, bibTexEntries.publisher, bibTexEntries.address, bibTexEntries.pages],
        "incollection": [bibTexEntries.ref, bibTexEntries.author, bibTexEntries.title, bibTexEntries.booktitle, bibTexEntries.publisher, bibTexEntries.address, bibTexEntries.pages],
        "inproceedings": [bibTexEntries.ref, bibTexEntries.author, bibTexEntries.title, bibTexEntries.booktitle, bibTexEntries.series, bibTexEntries.pages, bibTexEntries.publisher, bibTexEntries.address],
        "manual": [bibTexEntries.ref, bibTexEntries.title, bibTexEntries.author, bibTexEntries.organization, bibTexEntries.address],
        "mastersthesis": [bibTexEntries.ref, bibTexEntries.author, bibTexEntries.title, bibTexEntries.school, bibTexEntries.address],
        "misc": [bibTexEntries.ref, bibTexEntries.title, bibTexEntries.author, bibTexEntries.howpublished, bibTexEntries.note],
        "phdthesis": [bibTexEntries.ref, bibTexEntries.author, bibTexEntries.title, bibTexEntries.school, bibTexEntries.address],
        "proceedings": [bibTexEntries.ref, bibTexEntries.editor, bibTexEntries.title, bibTexEntries.series, bibTexEntries.volume, bibTexEntries.publisher, bibTexEntries.address],
        "techreport": [bibTexEntries.ref, bibTexEntries.title, bibTexEntries.author, bibTexEntries.institution, bibTexEntries.address, bibTexEntries.number],
        "unpublished": [bibTexEntries.ref, bibTexEntries.author, bibTexEntries.title],
    }
    const [suggestions, setSuggestions] = useState<BibTexEntry[]>([])

    let [newField, setNewField] = useState("")

    function addField(field: string) {
        let newEntry: BibTexEntry
        if (field in bibTexEntries) {
            const index = Object.keys(bibTexEntries).indexOf(field)
            newEntry = {...Object.values(bibTexEntries)[index], default: false}
        } else {
            newEntry = {
                name: field,
                tag: field,
                default: false,
                value: ""
            }
        }

        if (field !== "" && props.entries.map((entry) => {
            return entry.name
        }).indexOf(newEntry.name) === -1) {
            props.setEntries([...props.entries, newEntry])
            setSuggestions(Object.values(bibTexEntries).filter((entry) => [...props.entries, newEntry].map((entry) => entry.tag).indexOf(entry.tag) === -1).map((entry) => {
                return {...entry, default: false}
            }))
            setNewField("")
        }
    }

    function handleSubmit() {
        addField(newField)
    }

    return (
        <div>
            <Grid container spacing={2} style={{display: "flex"}}>
                <Grid item>
                    <ArticleTypeSelect value={props.artType} error={props.artTypeError} onChange={(value) => {
                        props.setArtTypeError(false)
                        props.setArtType(value.target.value as string)
                        props.setEntries(artTypeFields[value.target.value as string])
                        setSuggestions(Object.values(bibTexEntries).filter((entry) => artTypeFields[value.target.value as string].map((entry) => entry.tag).indexOf(entry.tag) === -1).map((entry) => {
                            return {...entry, default: false}
                        }))
                    }}/>
                </Grid>
                <Grid item>
                    <PublishDateSelector publishDate={props.publishDate} onChange={(e) => {
                        const [year, month] = e.target.value.split("-").map((part: string) => {
                            return parseInt(part)
                        })
                        props.setPublishDate(new Date(year, month - 1))
                    }}/>
                </Grid>
                {
                    props.entries.map((entry) => (
                        <Grid item key={entry.tag}>
                            <EntryInputField entry={entry} onChange={(e) => {
                                entry.error = false
                                props.setEntries(props.entries.map((obj) => {
                                    if (obj === entry) {
                                        return {...obj, value: e.target.value}
                                    }
                                    return obj
                                }))
                            }} onClick={() => {
                                const tempEntries = props.entries.filter((element) => {
                                    return element !== entry
                                })
                                props.setEntries(tempEntries)
                                setSuggestions(Object.values(bibTexEntries).filter((entry) => tempEntries.map((entry) => entry.tag).indexOf(entry.tag) === -1).map((entry) => {
                                    return {...entry, default: false}
                                }))
                            }}/>
                        </Grid>
                    ))
                }
            </Grid>
            <br/>
            <div style={{display: "flex", alignItems: "center"}}>
                <EntryFieldGenerator value={newField} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit()
                    }
                }} onChange={(e) => setNewField(e.target.value)} onClick={handleSubmit}/>
                <div style={{display: 'flex', flexWrap: 'wrap', paddingBottom: "20px"}}>
                    {suggestions.map((suggestion) =>
                        (<Chip onClick={() => {
                                props.setEntries([...props.entries, suggestion])
                                setSuggestions(Object.values(bibTexEntries).filter((entry) => [...props.entries, suggestion].map((entry) => entry.tag).indexOf(entry.tag) === -1).map((entry) => {
                                    return {...entry, default: false}
                                }))
                            }
                            } style={{marginLeft: "5px", marginBottom: "5px"}} key={suggestion.tag}
                               label={suggestion.tag}/>
                        ))}
                </div>
            </div>
        </div>
    )
}
