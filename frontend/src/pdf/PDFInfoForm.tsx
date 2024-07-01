import {PDFFile} from "./PDFParser";
import {BibTexEntry, PDFFileForm} from "./PDFFileForm";
import {TagInputField} from "../inputComponents/TagInputField";
import React, {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import {
    Accordion, AccordionDetails, AccordionSummary, Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton,
    Slide, styled,
    TextField, Typography, Tabs, Tab, AppBar, Alert
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {arxivid2doi, doi2bib, RelatedPaperInfo, relatedPaperToString} from "../annotation/AnnotationAPI";
import {requestPreprints} from "../EnhancedPreprintGenerator";
import {GenerateButton} from "../inputComponents/GenerateButton";
import Card from "../card/Card";
import {GenerateLatexButton} from "../latex/GenerateLatexButton";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function PDFInfoForm(props: {
    file: PDFFile,
    onSubmitPDF: (bibTexEntries: {
        [id: string]: string
    }, keywords: string[], similarPreprints: RelatedPaperInfo[]) => void,
    onSubmitLatex: (bibTexEntries: {
        [id: string]: string
    }, keywords: string[], similarPreprints: RelatedPaperInfo[]) => void
}) {
    const [keywords, setKeywords] = useState<string[]>(props.file!.info.keywords)
    const [open, setOpen] = useState(false)
    const [similarPapers, setSimilarPapers] = useState<RelatedPaperInfo[]>([])
    const [relatedPapers, setRelatedPapers] = useState<RelatedPaperInfo[]>([])
    const [relatedPaperTmp, setRelatedPaperTmp] = useState<RelatedPaperInfo | null>(null)
    const [id, setId] = useState("")
    const [entries, setEntries] = useState<BibTexEntry[]>([]);
    const [publishDate, setPublishDate] = useState(props.file.info.date)
    const [artType, setArtType] = useState("")
    const [artTypeError, setArtTypeError] = useState(false)
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <div style={{width: "80%"}}>
                <Tabs variant="fullWidth" value={tabIndex} onChange={handleTabChange}
                      aria-label="PDF Info Tabs">
                    <Tab label="1. Edit BibTex Information"/>
                    <Tab label="2. Edit Keywords & Related Papers (Optional)"/>
                    <Tab label="3. Parse from BibTex"/>
                    <Tab label="4. Check all Information"/>
                </Tabs>
            {tabIndex === 0 && (
                <Card title="Edit BibTex Information">
                    <PDFFileForm info={props.file.info} artType={artType} artTypeError={artTypeError} entries={entries}
                                 publishDate={publishDate}
                                 setArtType={setArtType} setArtTypeError={setArtTypeError} setEntries={setEntries}
                                 setPublishDate={setPublishDate}/>
                </Card>
            )}
            {tabIndex === 1 && (
                <Card title="Edit Keywords & Related Papers (Optional)">
                    <h6 style={{margin: 10}}></h6>
                    <div style={{position: "relative", bottom: 0, left: 0, marginBottom: 16}}>
                        <TagInputField keywords={keywords} setKeywords={setKeywords}/>
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <Button style={{marginBottom: "16px"}} variant="contained"
                                onClick={async () => {
                                    const loadedRelatedPapers = await requestPreprints("", keywords)
                                    setSimilarPapers(loadedRelatedPapers || [])
                                }}>
                            Load Related Preprints based on Keywords
                        </Button>
                        <Button style={{marginLeft: "16px", marginBottom: "16px"}} variant="contained"
                                onClick={() => setOpen(true)}>
                            Add other Related Papers
                        </Button>
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => setOpen(false)}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"Add Related Paper"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="related-paper">
                                    Add new related papers with a DOI or arXiv ID
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    value={id}
                                    onChange={(value) => {
                                        setId(value.target.value)
                                    }}
                                    label="DOI or arXiv ID"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                                <DialogContentText
                                    id="related-paper-text">{(relatedPaperTmp !== null) ? relatedPaperToString(relatedPaperTmp) : ""}</DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button disabled={relatedPaperTmp === null} onClick={() => {
                                    setRelatedPapers([...relatedPapers, relatedPaperTmp!])
                                    setRelatedPaperTmp(null)
                                    setId("")
                                    setOpen(false)
                                }}>Add</Button>
                                <Button onClick={async () => {
                                    const doiPaper = await doi2bib(id)
                                    if (doiPaper !== null) {
                                        setRelatedPaperTmp(doiPaper!)
                                        return
                                    }
                                    const arxivPaper = await arxivid2doi(id)
                                    if (arxivPaper !== null) {
                                        setRelatedPaperTmp(arxivPaper!)
                                        return
                                    }
                                }
                                }>Load</Button>
                                <Button onClick={() => setOpen(false)}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div>
                        {relatedPapers.map((relatedPaper) => {
                            return (
                                <Accordion key={"rp" + relatedPaper.title}>
                                    <Box sx={{display: "flex", alignItems: "center"}}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            sx={{flexGrow: 1}}
                                            id="panel1a-header"
                                        >
                                            <Typography style={{textAlign: "left"}}>{relatedPaper.title}</Typography>
                                        </AccordionSummary>
                                        <IconButton style={{marginLeft: "-20px"}}>
                                            <ClearIcon
                                                onClick={() => setRelatedPapers(relatedPapers.filter((value) => value !== relatedPaper))}/>
                                        </IconButton>
                                    </Box>
                                    <AccordionDetails>
                                        <Typography style={{textAlign: "left"}}>
                                            {relatedPaperToString(relatedPaper)}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                        {similarPapers.map((similarPaper) => {
                            return (
                                <Accordion key={"sp" + similarPaper.title}>
                                    <Box sx={{display: "flex", alignItems: "center"}}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            sx={{flexGrow: 1}}
                                            id="panel1a-header"
                                        >
                                            <Typography style={{textAlign: "left"}}>{similarPaper.title}</Typography>
                                        </AccordionSummary>
                                        <IconButton style={{marginLeft: "-20px"}}>
                                            <ClearIcon
                                                onClick={() => setSimilarPapers(similarPapers.filter((value) => value !== similarPaper))}/>
                                        </IconButton>
                                    </Box>
                                    <AccordionDetails>
                                        <Typography style={{textAlign: "left"}}>
                                            {relatedPaperToString(similarPaper)}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </div>
                </Card>
            )}
            {tabIndex === 2 && (
                <Card title="Parse from BibTex">
                    <Alert severity="warning" style={{marginBottom: 16}}>Parsing from BibTex will overwrite existing
                        values.</Alert>
                    <TextField
                        label="BibTex Input"
                        multiline
                        rows={10}
                        variant="outlined"
                        fullWidth
                        // Add the functionality to handle the BibTex input and parsing logic here
                    />
                    <Button variant="contained" color="primary" style={{marginTop: 16}}>
                        Parse BibTex
                    </Button>
                </Card>
            )}
            {tabIndex === 3 && (
                <div style={{marginBottom: 40}}>
                    <Card title="Check all Information">
                        <GenerateButton onClick={() => {
                            const bibTexEntries: { [id: string]: string } = {}
                            bibTexEntries["artType"] = artType
                            entries.forEach((entry) => {
                                bibTexEntries[entry.tag] = entry.value
                            })
                            bibTexEntries["title"] = bibTexEntries["title"]
                            bibTexEntries["year"] = "" + publishDate.getFullYear()
                            bibTexEntries["month"] = "" + ('0' + (publishDate.getMonth() + 1)).slice(-2)
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
                                props.onSubmitPDF(bibTexEntries, keywords, [...relatedPapers, ...similarPapers].sort((a, b) => (a.title > b.title) ? 1 : (a.title === b.title) ? 1 : -1))
                            }
                        }}/>
                        <GenerateLatexButton style={{marginLeft: 40}} onClick={() => {
                            const bibTexEntries: { [id: string]: string } = {}
                            bibTexEntries["artType"] = artType
                            entries.forEach((entry) => {
                                bibTexEntries[entry.tag] = entry.value
                            })
                            bibTexEntries["title"] = bibTexEntries["title"]
                            bibTexEntries["year"] = "" + publishDate.getFullYear()
                            bibTexEntries["month"] = "" + ('0' + (publishDate.getMonth() + 1)).slice(-2)
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
                                props.onSubmitLatex(bibTexEntries, keywords, [...relatedPapers, ...similarPapers].sort((a, b) => (a.title > b.title) ? 1 : (a.title === b.title) ? 1 : -1))
                            }
                        }}/>
                    </Card>
                </div>
            )}
        </div>
    );
}
