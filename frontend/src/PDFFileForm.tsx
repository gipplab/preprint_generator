import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    TextFieldProps
} from '@mui/material';
import React, {useState} from 'react';
import {PDFInfo} from "./pdf/PDFParser";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface PDFFileFormInterface {
    info: PDFInfo
    onSubmit: (bibTexEntries: { [id: string]: string }) => void
}

interface BibTexEntry {
    name: string
    tag: string
    default: boolean
    value: string
    type?: string
}

export function PDFFileForm(props: PDFFileFormInterface) {
    const [entries, setEntries] = useState<BibTexEntry[]>([
        {name: "Reference", tag: "ref", default: true, value: props.info.artTitle},
        {name: "Title", tag: "title", default: true, value: props.info.title},
        {name: "Author", tag: "author", default: true, value: props.info.author || ""},
        {name: "Pages", tag: "pages", default: true, value: "" + props.info.pages, type: "number"},
    ]);
    let [newField, setNewField] = useState("")
    let [publishDate, setPublishDate] = useState(props.info.date)
    let [artType, setArtType] = useState("article")
    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <Grid container spacing={2} style={{justifyContent: "center"}}>
                <Grid item>
                    <FormControl style={{minWidth: 120}}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select id="type" labelId="type-label" value={artType} label="Type" onChange={(value) => {
                            setArtType(value.target.value as string)
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
                <Grid item>
                    <TextField
                        id="date"
                        label="Publish Date"
                        type="month"
                        value={`${publishDate.getFullYear()}-${('0' + (publishDate.getMonth() + 1)).slice(-2)}`}
                        onChange={(e) => {
                            const [year, month] = e.target.value.split("-").map((part) => {
                                return parseInt(part)
                            })
                            setPublishDate(new Date(year, month - 1))
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                {
                    entries.map((entry) => (
                        <Grid item>
                            <TextField
                                id="outlined-multiline-static"
                                label={entry.name}
                                type={entry.type}
                                value={entry.value}
                                onChange={(e) => {
                                    setEntries(entries.map((obj) => {
                                        if (obj == entry) {
                                            return {...obj, value: e.target.value}
                                        }
                                        return obj
                                    }))
                                }}
                                {...(!entry.default ? {
                                    InputProps: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" color="primary"
                                                            onClick={() => {
                                                                setEntries(entries.filter((element) => {
                                                                    return element !== entry
                                                                }))
                                                            }}>
                                                    <RemoveCircleOutlineIcon/>
                                                </IconButton>
                                            </InputAdornment>)
                                    }
                                } : {})}
                            />
                        </Grid>
                    ))
                }
                <Grid item>
                    <TextField
                        label="New Field"
                        value={newField}
                        onChange={(e) => setNewField(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" color="primary"
                                                onClick={() => {
                                                    let newEntry = {
                                                        name: newField,
                                                        tag: newField,
                                                        default: false,
                                                        value: ""
                                                    }
                                                    if (newField != "" && entries.indexOf(newEntry) == -1) {
                                                        setEntries([...entries, newEntry])
                                                        setNewField("")
                                                    }
                                                }}>
                                        <AddOutlinedIcon/>
                                    </IconButton>
                                </InputAdornment>)
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained" onClick={() => {
                        const bibTexEntries: { [id: string]: string } = {}
                        bibTexEntries["artType"] = artType
                        bibTexEntries["publish"] = `${publishDate.getFullYear()}-${('0' + (publishDate.getMonth() + 1)).slice(-2)}`
                        entries.forEach((entry) => {
                            bibTexEntries[entry.tag] = entry.value
                        })
                        props.onSubmit(bibTexEntries)
                    }}>Generate
                    </Button>
                </Grid>

            </Grid>
        </div>
    )
}