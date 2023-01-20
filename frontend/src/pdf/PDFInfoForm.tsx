import {PDFFile} from "./PDFParser";
import {PDFFileForm} from "./PDFFileForm";
import {TagInputField} from "../inputComponents/TagInputField";
import React, {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide, styled,
    TextField, Typography
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {arxivid2doi, doi2bib, RelatedPaperInfo, relatedPaperToString} from "../annotation/AnnotationAPI";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export function PDFInfoForm(props: { file: PDFFile, onSubmit: (bibTexEntries: { [id: string]: string }, keywords: string[]) => void }) {
    const [keywords, setKeywords] = useState<string[]>(props.file!.info.keywords)
    const [open, setOpen] = useState(false)
    const [relatedPapers, setRelatedPapers] = useState<RelatedPaperInfo[]>([])
    const [relatedPaperTmp, setRelatedPaperTmp] = useState<RelatedPaperInfo | null>(null)
    const [id, setId] = useState("")
    return <>
        <div style={{width: "80%"}}>
            <h6>BibTex Information</h6>
            <PDFFileForm onSubmit={(bibTexEntries) => {
                props.onSubmit(bibTexEntries, keywords)
            }} info={props.file.info}/>
            <h6>Keywords</h6>
            <div style={{position: "relative", bottom: 0, left: 0}}>
                <TagInputField keywords={keywords} setKeywords={setKeywords}/>
            </div>
            <h6>Add related papers</h6>
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                <Button style={{marginBottom: "16px"}} variant="contained" onClick={() => setOpen(true)}>
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
            <div style={{marginBottom: "5%"}}>
                {relatedPapers.map((relatedPaper) => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography style={{textAlign: "left"}}>{relatedPaper.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={{textAlign: "left"}}>
                                    {relatedPaperToString(relatedPaper)}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>
        </div>

    </>;
}