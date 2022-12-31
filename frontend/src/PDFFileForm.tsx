import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import React, {useState} from 'react';
import {PDFInfo} from "./pdf/PDFParser";

interface PDFFileFormInterface {
    info: PDFInfo
    onSubmit: (info: PDFInfo) => void
}

interface BibTexEntry {
    name: string
    default: boolean
    value: any
}

export function PDFFileForm(props: PDFFileFormInterface) {
    let bibTexEntries: BibTexEntry[] = ["Reference", "Title", "Author",].map((entry) => {
        return {name: entry, default: true, value: null}
    })
    let artType = props.info.artType
    let artTitle = props.info.artTitle
    let title = props.info.title
    let author = props.info.author
    let pages = props.info.pages
    let date = props.info.date
    return (
        <div>
            <div style={{maxWidth: "80%"}}>
                <Grid container spacing={2}>
                    <Grid item>
                        <FormControl style={{minWidth: 120}}>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select id="type" labelId="type-label" label="Type" onChange={(value) => {
                                artType = value.target.value as string
                            }}>
                                <MenuItem value="article">Journal article</MenuItem>
                                <MenuItem value="book">Book</MenuItem>
                                <MenuItem value="booklet">Printed work without a publisher</MenuItem>
                                <MenuItem value="inbook">Any section in a book</MenuItem>
                                <MenuItem value="incollection">A titled section of a book</MenuItem>
                                <MenuItem value="inproceedings">Conference paper</MenuItem>
                                <MenuItem value="manual">Manual</MenuItem>
                                <MenuItem value="mastersthesis">Master's thesis</MenuItem>
                                <MenuItem value="phdthesis">PhD thesis</MenuItem>
                                <MenuItem value="techreport">Technical report or white paper</MenuItem>
                                <MenuItem value="unpublished">A work that has not yet been officially published
                                </MenuItem>
                                <MenuItem value="misc">Miscellaneous: if nothing else fits</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        bibTexEntries.map((entry) => (
                            <Grid item>
                                <TextField
                                    id="outlined-multiline-static"
                                    label={entry.name}
                                    multiline
                                    onChange={(value) => entry.value = value}
                                    defaultValue={entry.value || ""}
                                />
                            </Grid>
                        ))
                    }
                    <Grid item>
                        <Button
                            //TODO add proper onClick and add input button
                            variant="contained" onClick={() => props.onSubmit({
                            artType: artType, keywords: [], artTitle, title, author, pages, date
                        })}>Submit
                        </Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}