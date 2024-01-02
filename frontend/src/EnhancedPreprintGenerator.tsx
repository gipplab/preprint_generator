import React, {Component} from 'react';
import './EnhancedPreprintGenerator.css';
import {PDFDocument} from 'pdf-lib'
import {parsePDF, PDFFile} from "./pdf/PDFParser";
import {createBibTexAnnotation} from "./pdf/PDFBibTexAnnotationGenerator";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {EnhancedPreprintGeneratorAppBar} from "./EnhancedPreprintGeneratorAppBar";
import {PDFFileUploader} from "./pdf/PDFFileUploader";
import {PDFInfoForm} from "./pdf/PDFInfoForm";
import {arxivid2doi, doi2bib, RelatedPaperInfo} from "./annotation/AnnotationAPI"
import config from "./config.json"
import darkTheme from "./theme";

const PDFJS = window.pdfjsLib;

interface AppProps {
}

interface AppState {
    apiConnected?: boolean;
    file?: PDFFile;
}


interface StorePreprintArgs {
    title: string;
    keywords: string[];
    doi?: string;
    author?: string;
    url?: string;
    year?: string;
    annotation?: string;
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
        response = await fetch(`${config.backend_url}/database/getRelatedPreprints?keywords=${JSON.stringify(keywords)}`)
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
        this.state = {apiConnected: false};
    }

    callAPI() {
        fetch(`${config.backend_url}/testAPI`)
            .then(res => res.text())
            .then(_ => this.setState({apiConnected: true})).catch(() => {
            this.setState({apiConnected: false})
        });
    }


    async storePreprint(args: StorePreprintArgs) {
        const {title, keywords, doi, author, url, year, annotation, file} = args;

        let file_base64 = '';
        if (file) {
            file_base64 = await file.file.saveAsBase64();
        }

        const payload = {
            title: title,
            keywords: keywords,
            doi: doi,
            author: author,
            url: url,
            year: year,
            annotation: annotation,
            file: file_base64, // Base64 encoded file
        };

        fetch(`${config.backend_url}/database/storePreprint`, {
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
                    <header className="App-header">
                        {!this.state.file &&
                            <PDFFileUploader handleChange={async (file: any) => {
                                let base64File = await toBase64(file)
                                let pdfDoc = await PDFDocument.load(base64File)
                                const pdfText = await getPDFText(base64File);
                                let pdfFile: PDFFile = {
                                    name: file.name,
                                    file: pdfDoc,
                                    info: parsePDF(pdfDoc, pdfText, file.name)
                                }
                                this.setState({
                                    file: pdfFile
                                })

                            }}/>
                        }
                        {this.state.file &&
                            <PDFInfoForm file={this.state.file}
                                         onSubmit={async (bibTexEntries, keywords, similarPreprints: RelatedPaperInfo[]) => {
                                             const fileBackup = await this.state.file!.file.copy()
                                             const annotationText = await createBibTexAnnotation(
                                                 this.state.file!.file,
                                                 this.state.file!.name,
                                                 bibTexEntries,
                                                 similarPreprints
                                             )
                                             await this.storePreprint({
                                                 title: bibTexEntries["title"],
                                                 keywords: keywords,
                                                 doi: bibTexEntries["doi"],
                                                 author: bibTexEntries["author"],
                                                 url: bibTexEntries["url"],
                                                 year: bibTexEntries["year"],
                                                 annotation: annotationText,
                                                 file: this.state.file
                                             })
                                             this.setState({
                                                 file: {
                                                     file: fileBackup,
                                                     info: this.state.file!.info,
                                                     name: this.state.file!.name
                                                 }
                                             })
                                         }}/>
                        }
                    </header>
                </div>
            </ThemeProvider>
        );
    }
}


export default EnhancedPreprintGenerator;
