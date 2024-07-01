import {PDFFile} from "./PDFParser";
import {BibTexEntry, PDFFileForm} from "./PDFFileForm";
import {TagInputField} from "../inputComponents/TagInputField";
import React, {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
// import {
//     Accordion, AccordionDetails, AccordionSummary, Box,
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle, IconButton,
//     Slide, styled,
//     TextField, Typography
// } from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {arxivid2doi, doi2bib, RelatedPaperInfo, relatedPaperToString} from "../annotation/AnnotationAPI";
import {requestPreprints} from "../EnhancedPreprintGenerator";
import {GenerateButton} from "../inputComponents/GenerateButton";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui/Card"
import {Input} from '../components/ui/Input';
import {Button} from '../components/ui/Button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../components/ui/Select';
import {Label} from '../components/ui/Label';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../components/ui/Tabs';
import {Textarea} from '../components/ui/Textarea';
import {Alert, AlertDescription, AlertTitle} from '../components/ui/Alert';
import {AlertTriangle, FileDown, Upload, Plus, X, Asterisk} from 'lucide-react';
import {RadioGroup, RadioGroupItem} from '../components/ui/RadioGroup';
import {Badge} from '../components/ui/Badge';
import {GenerateLatexButton} from "../latex/GenerateLatexButton";
import "../output.css"

// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & {
//         children: React.ReactElement<any, any>;
//     },
//     ref: React.Ref<unknown>,
// ) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });


export function PDFInfoForm(props: {
    file: PDFFile,
    onSubmitPDF: (bibTexEntries: {
        [id: string]: string
    }, keywords: string[], similarPreprints: RelatedPaperInfo[]) => void,
    onSubmitLatex: (bibTexEntries: {
        [id: string]: string
    }, keywords: string[], similarPreprints: RelatedPaperInfo[]) => void
}) {
    //const [keywords, setKeywords] = useState<string[]>(props.file!.info.keywords)
    const [open, setOpen] = useState(false)
    const [similarPapers, setSimilarPapers] = useState<RelatedPaperInfo[]>([])
    const [relatedPapers, setRelatedPapers] = useState<RelatedPaperInfo[]>([])
    const [relatedPaperTmp, setRelatedPaperTmp] = useState<RelatedPaperInfo | null>(null)
    const [id, setId] = useState("")
    const [entries, setEntries] = useState<BibTexEntry[]>([]);
    const [publishDate, setPublishDate] = useState(props.file.info.date)
    const [artType, setArtType] = useState("")
    const [artTypeError, setArtTypeError] = useState(false)

    const [activeTab, setActiveTab] = useState('basic');
    const [generationType, setGenerationType] = useState('pdf');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [keywordInput, setKeywordInput] = useState('');
    const [customFields, setCustomFields] = useState<{ name: string, value: string }[]>([]);
    const [newFieldName, setNewFieldName] = useState('');
    const [newFieldValue, setNewFieldValue] = useState('');

    const addKeyword = () => {
        if (keywordInput.trim() !== '' && !keywords.includes(keywordInput.trim())) {
            setKeywords([...keywords, keywordInput.trim()]);
            setKeywordInput('');
        }
    };

    const removeKeyword = (keyword: string) => {
        setKeywords(keywords.filter(k => k !== keyword));
    };

    const addCustomField = () => {
        if (newFieldName.trim() !== '' && newFieldValue.trim() !== '') {
            setCustomFields([...customFields, {name: newFieldName.trim(), value: newFieldValue.trim()}]);
            setNewFieldName('');
            setNewFieldValue('');
        }
    };

    const removeCustomField = (index: number) => {
        setCustomFields(customFields.filter((_, i) => i !== index));
    };

    const RequiredBadge = () => (
        <Badge variant="secondary" className="ml-2 flex items-center space-x-1">
            <Asterisk className="h-3 w-3 text-red-500 mr-1"/> Required
        </Badge>
    );


    return <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-4">
                    <TabsTrigger value="basic" className="relative flex items-center justify-between">
                        Basic Info
                        <RequiredBadge/>
                    </TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    <TabsTrigger value="keywords-related">Keywords & Related</TabsTrigger>
                    <TabsTrigger value="parse">Parse BibTeX</TabsTrigger>
                    <TabsTrigger value="generate" className="relative">
                        Generate
                        <RequiredBadge/>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="type">Type</Label>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Theme"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="publish-date">Publish Date</Label>
                            <Input id="publish-date" type="date"/>
                        </div>
                        <div>
                            <Label htmlFor="reference">Reference</Label>
                            <Input id="reference" placeholder="Enter the Reference"/>
                        </div>
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Enter the Title"/>
                        </div>
                        <div>
                            <Label htmlFor="authors">Authors</Label>
                            <Input id="authors" placeholder="Enter Authors (separated by comma)"/>
                        </div>
                        <Button variant="outline" onClick={() => setActiveTab('parse')} className="w-full mt-4">
                            Parse from BibTeX
                        </Button>
                    </div>
                    <Button onClick={() => setActiveTab('generate')} className="w-full mt-4">
                        Proceed to Generate
                    </Button>
                </TabsContent>

                <TabsContent value="advanced">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="journal">Journal</Label>
                            <Input id="journal" placeholder="Enter the Journal"/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="volume">Volume</Label>
                                <Input id="volume" type="number"/>
                            </div>
                            <div>
                                <Label htmlFor="number">Number</Label>
                                <Input id="number" type="number"/>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="pages">Pages</Label>
                            <Input id="pages" placeholder="Enter the Pages"/>
                        </div>

                        {/* Custom Fields Section */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Custom Fields</h3>
                            {customFields.map((field, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-2">
                                    <Input value={field.name} readOnly className="w-1/3"/>
                                    <Input value={field.value} readOnly className="w-2/3"/>
                                    <Button onClick={() => removeCustomField(index)} size="icon"
                                            variant="ghost">
                                        <X className="h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                            <div className="flex items-end space-x-2 mt-2">
                                <div className="w-1/3">
                                    <Label htmlFor="new-field-name">Field Name</Label>
                                    <Input
                                        id="new-field-name"
                                        value={newFieldName}
                                        onChange={(e) => setNewFieldName(e.target.value)}
                                        placeholder="e.g., DOI"
                                    />
                                </div>
                                <div className="w-2/3">
                                    <Label htmlFor="new-field-value">Field Value</Label>
                                    <Input
                                        id="new-field-value"
                                        value={newFieldValue}
                                        onChange={(e) => setNewFieldValue(e.target.value)}
                                        placeholder="Enter value"
                                    />
                                </div>
                                <Button onClick={addCustomField} size="icon">
                                    <Plus className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Button onClick={() => setActiveTab('generate')} className="w-full mt-4">
                        Proceed to Generate
                    </Button>
                </TabsContent>
                <TabsContent value="keywords-related">
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="keywords">Keywords</Label>
                            <div className="flex space-x-2">
                                <Input
                                    id="keywords"
                                    value={keywordInput}
                                    onChange={(e) => setKeywordInput(e.target.value)}
                                    placeholder="Enter a keyword"
                                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                                />
                                <Button onClick={addKeyword} size="icon">
                                    <Plus className="h-4 w-4"/>
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {keywords.map((keyword, index) => (
                                    <Badge key={index} variant="secondary" className="text-sm">
                                        {keyword}
                                        <button onClick={() => removeKeyword(keyword)} className="ml-1 text-xs">
                                            <X className="h-3 w-3"/>
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Related Papers</Label>
                            <Button variant="outline" className="w-full">Load Related Papers</Button>
                            <Button variant="outline" className="w-full">Add Other Related Papers</Button>
                        </div>
                    </div>
                    <Button onClick={() => setActiveTab('generate')} className="w-full mt-4">
                        Proceed to Generate
                    </Button>
                </TabsContent>

                <TabsContent value="parse">
                    <div className="space-y-4">
                        <Alert variant="default">
                            <AlertTriangle className="h-4 w-4"/>
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription>
                                Parsing from BibTeX will overwrite any existing content in other fields. Make
                                sure you have saved any important information before proceeding.
                            </AlertDescription>
                        </Alert>
                        <div>
                            <Label htmlFor="bibtex-input">Paste BibTeX Here</Label>
                            <Textarea id="bibtex-input" placeholder="Paste your BibTeX entry here" rows={10}/>
                        </div>
                        <Button className="w-full">Parse BibTeX</Button>
                    </div>
                    <Button onClick={() => setActiveTab('generate')} className="w-full mt-4">
                        Proceed to Generate
                    </Button>
                </TabsContent>

                <TabsContent value="generate">
                    <div className="space-y-6">
                        <div>
                            <Label className="text-base">Select Output Format</Label>
                            <RadioGroup defaultValue="pdf" onValueChange={setGenerationType}
                                        className="flex flex-col space-y-1 mt-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="pdf" id="pdf"/>
                                    <Label htmlFor="pdf">PDF</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="latex" id="latex"/>
                                    <Label htmlFor="latex">LaTeX</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <Button className="w-full flex items-center justify-center">
                                <FileDown className="mr-2 h-4 w-4"/> Generate {generationType.toUpperCase()}
                            </Button>
                            <Button className="w-full flex items-center justify-center">
                                <Upload className="mr-2 h-4 w-4"/> Generate and
                                Upload {generationType.toUpperCase()}
                            </Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
            {/*<Card title="1. Edit BibTex Information">
                <PDFFileForm info={props.file.info} artType={artType} artTypeError={artTypeError} entries={entries}
                             publishDate={publishDate}
                             setArtType={setArtType} setArtTypeError={setArtTypeError} setEntries={setEntries}
                             setPublishDate={setPublishDate}/>
            </Card>
            <Card title="2. Edit relevant preprint Keywords (Optional)">
                <h6 style={{margin: 10}}></h6>
                <div style={{position: "relative", bottom: 0, left: 0}}>
                    <TagInputField keywords={keywords} setKeywords={setKeywords}/>
                </div>
            </Card>
            <Card title="3. Add related papers (Optional)">
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
            <div style={{marginBottom: 40}}>
                <Card title="4. Check all Information">
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
            </div>*/}
    </>;
}