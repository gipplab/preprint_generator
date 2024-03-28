import React, {Component} from 'react';
import './EnhancedPreprintGenerator.css';
import {PDFDocument} from 'pdf-lib'
import {parsePDF, PDFFile} from "./pdf/PDFParser";
import {createBibTexAnnotation} from "./pdf/PDFBibTexAnnotationGenerator";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {EnhancedPreprintGeneratorAppBar} from "./EnhancedPreprintGeneratorAppBar";
import {PDFFileUploader} from "./pdf/PDFFileUploader";
import {PDFInfoForm} from "./pdf/PDFInfoForm";
import {RelatedPaperInfo, relatedPaperToString} from "./annotation/AnnotationAPI"
import {v4 as uuidv4} from 'uuid';
import config from "./config.json"
import darkTheme from "./theme";
import {downloadLatexFiles} from "./latex/GenerateLatexFiles";
import {CircularProgress} from "@mui/material";

const backendURL = process.env.REACT_APP_BACKEND_URL || config.backend_url;

const PDFJS = window.pdfjsLib;

interface AppProps {
}

interface AppState {
    apiConnected?: boolean;
    file?: PDFFile;
    loading: boolean;
}


interface StorePreprintArgs {
    title: string;
    keywords: string[];
    doi?: string;
    author?: string;
    url?: string;
    year?: string;
    annotation?: string;
    uuid: string
    file?: PDFFile;
}

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

async function getPDFText(base64File: string) {
    const pdfJSFile = await PDFJS.getDocument(base64File).promise
    const numPages = pdfJSFile.numPages;
    const firstPage = await (await pdfJSFile.getPage(1)).getTextContent()
    let text = '';
    for (let i = 2; i <= numPages; i++) {
        const page = await pdfJSFile.getPage(i)
        const pageText = await page.getTextContent();
        text += pageText.items.map((item: { str: any; }) => {
            return item.str
        }).join(" ")
    }
    return {firstPage: firstPage, text}
}

export async function requestPreprints(title: string, keywords: string[]) {
    let response
    try {
        response = await fetch(`${backendURL}/database/getRelatedPreprints?keywords=${JSON.stringify(keywords)}`)
    } catch (e) {
        return undefined
    }

    const result: RelatedPaperInfo[] = JSON.parse(await response.text())
    return result.filter((preprint) => {
        return preprint.title !== title
    })
}

class EnhancedPreprintGenerator extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {apiConnected: false, loading: false};
    }

    callAPI() {
        fetch(`${backendURL}/testAPI`)
            .then(res => res.text())
            .then(_ => this.setState({apiConnected: true})).catch(() => {
            this.setState({apiConnected: false})
        });
    }


    async storePreprint(args: StorePreprintArgs) {
        const {title, keywords, doi, author, url, year, annotation, uuid, file} = args;

        let file_base64 = '';
        if (file) {
            file_base64 = await file.file.saveAsBase64();
        }

        const payload = {
            id: uuid,
            title: title,
            keywords: keywords,
            doi: doi,
            author: author,
            url: url,
            year: year,
            annotation: annotation,
            file: file_base64, // Base64 encoded file
        };

        fetch(`${backendURL}/database/storePreprint`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(_ => {
            // Handle success
        }).catch(_ => {
            // Handle error
        });
    }


    componentWillMount() {
        this.callAPI();
    }

    render() {
        return (
            <ThemeProvider theme={darkTheme}>
                <div className="App">
                    <EnhancedPreprintGeneratorAppBar
                        file={this.state.file} apiConnected={this.state.apiConnected}
                        onClick={() => {
                            this.setState({file: undefined})
                        }}
                    />
                    <header className="App-header" style={(this.state.file ? {} : {justifyContent: "center"})}>
                        {(!this.state.file && !this.state.loading) &&
                            <PDFFileUploader handleChange={async (file: File) => {
                                this.setState({loading: true})
                                let base64File = await toBase64(file)
                                let pdfDoc = await PDFDocument.load(base64File)
                                const pdfText = await getPDFText(base64File);
                                const info = await parsePDF(file, pdfDoc, pdfText, file.name)
                                let pdfFile: PDFFile = {
                                    name: file.name,
                                    file: pdfDoc,
                                    info: info
                                }
                                this.setState({
                                    file: pdfFile,
                                    loading: false
                                })
                            }}/>
                        }
                        {this.state.loading &&
                            <CircularProgress/>
                        }
                        {(this.state.file && !this.state.loading) &&
                            <PDFInfoForm file={this.state.file}
                                         onSubmitPDF={(bibTexEntries, keywords, similarPreprints) => this.OnGeneration(bibTexEntries, keywords, similarPreprints)}
                                         onSubmitLatex={(bibTexEntries, keywords, similarPreprints) => this.OnGeneration(bibTexEntries, keywords, similarPreprints, true)}/>
                        }
                    </header>
                </div>
            </ThemeProvider>
        )
            ;
    }

    private async OnGeneration(bibTexEntries: {
        [p: string]: string
    }, keywords: string[], similarPreprints: RelatedPaperInfo[], latex = false) {

        const fileBackup = await this.state.file!.file.copy()
        const uuid = uuidv4()
        const annotationText = await createBibTexAnnotation(
            this.state.file!.file,
            this.state.file!.name,
            uuid,
            !latex,
            bibTexEntries,
            similarPreprints
        )
        const baseUrl = `${window.location.protocol}//${window.location.hostname}${(window.location.port) ? ":" : ""}${window.location.port}`;
        const url = `${baseUrl}/preprint/${uuid}`;
        if (latex) {
            downloadLatexFiles(annotationText, url, similarPreprints.map((preprint) => relatedPaperToString(preprint)))
        }
        await this.storePreprint({
            title: bibTexEntries["title"],
            keywords: keywords,
            doi: bibTexEntries["doi"],
            author: bibTexEntries["author"],
            url: bibTexEntries["url"] || url,
            year: bibTexEntries["year"],
            annotation: annotationText,
            file: this.state.file,
            uuid: uuid
        })
        this.setState({
            file: {
                file: fileBackup,
                info: this.state.file!.info,
                name: this.state.file!.name
            }
        })
    };

}


export default EnhancedPreprintGenerator;
