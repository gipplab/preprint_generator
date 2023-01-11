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
    onSubmit: (bibTexEntries: { [id: string]: string }) => void
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
    const [entries, setEntries] = useState<BibTexEntry[]>([
        {name: "Reference", tag: "ref", default: true, value: props.info.artTitle},
        {name: "Title", tag: "title", default: true, value: props.info.title},
        {name: "Author", tag: "author", default: true, value: props.info.author || ""},
        {name: "Pages", tag: "pages", default: true, value: "" + props.info.pages, type: "number"},
    ]);
    let suggestions_default = ["doi", "volume", "journal"]
    const [suggestions, setSuggestions] = useState<string[]>(suggestions_default)

    let [newField, setNewField] = useState("")
    let [publishDate, setPublishDate] = useState(props.info.date)
    let [artType, setArtType] = useState("")
    let [artTypeError, setArtTypeError] = useState(false)

    function addField(field: string) {
        let newEntry = {
            name: field,
            tag: field,
            default: false,
            value: ""
        }
        if (field !== "" && entries.map((entry) => {
            return entry.name
        }).indexOf(newEntry.name) === -1) {
            setEntries([...entries, newEntry])
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
                    <ArticleTypeSelect value={artType} error={artTypeError} onChange={(value) => {
                        setArtTypeError(false)
                        setArtType(value.target.value as string)
                    }}/>
                </Grid>
                <Grid item>
                    <PublishDateSelector publishDate={publishDate} onChange={(e) => {
                        const [year, month] = e.target.value.split("-").map((part: string) => {
                            return parseInt(part)
                        })
                        setPublishDate(new Date(year, month - 1))
                    }}/>
                </Grid>
                {
                    entries.map((entry) => (
                        <Grid item key={entry.tag}>
                            <EntryInputField entry={entry} onChange={(e) => {
                                entry.error = false
                                setEntries(entries.map((obj) => {
                                    if (obj === entry) {
                                        return {...obj, value: e.target.value}
                                    }
                                    return obj
                                }))
                            }} onClick={() => {
                                if (suggestions_default.indexOf(entry.name) !== -1) {
                                    setSuggestions([...suggestions, entry.name])
                                }
                                setEntries(entries.filter((element) => {
                                    return element !== entry
                                }))
                            }}/>
                        </Grid>
                    ))
                }
                <Grid item>
                    <GenerateButton onClick={() => {
                        const bibTexEntries: { [id: string]: string } = {}
                        bibTexEntries["artType"] = artType
                        bibTexEntries["publish"] = `${publishDate.getFullYear()}-${('0' + (publishDate.getMonth() + 1)).slice(-2)}`
                        entries.forEach((entry) => {
                            bibTexEntries[entry.tag] = entry.value
                        })
                        let generate = true
                        if (artType === "") {
                            generate = false
                            setArtTypeError(true)
                        }
                        setEntries(entries.map((entry) => {
                            if (entry.value === "") {
                                generate = false
                                return {...entry, error: true}
                            }
                            return entry
                        }))
                        if (generate) {
                            props.onSubmit(bibTexEntries)
                        }
                    }}/>
                </Grid>

            </Grid>
            <h6>Add new fields</h6>
            <div style={{display: "flex", alignItems: "flex-start"}}>
                <EntryFieldGenerator value={newField} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit()
                    }
                }} onChange={(e) => setNewField(e.target.value)} onClick={handleSubmit}/>
                {suggestions.map((suggestion) =>
                    (<Chip onClick={() => {
                            setSuggestions(suggestions.filter((value) => {
                                return value !== suggestion
                            }))
                            addField(suggestion)
                        }
                        } style={{marginLeft: "5px", marginBottom: "5px"}} key={suggestion}
                           label={suggestion}/>
                    ))}
            </div>
        </div>
    )
}