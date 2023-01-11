import React, {Component} from 'react';
import './EnhancedPreprintGenerator.css';
import {PDFDocument} from 'pdf-lib'
import {parsePDF, PDFFile} from "./pdf/PDFParser";
import {createBibTexAnnotation} from "./pdf/PDFBibTexAnnotationGenerator";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {EnhancedPreprintGeneratorAppBar} from "./EnhancedPreprintGeneratorAppBar";
import {PDFFileUploader} from "./pdf/PDFFileUploader";
import {PDFInfoForm} from "./pdf/PDFInfoForm";

const PDFJS = window.pdfjsLib;

interface AppProps {
}

interface AppState {
    apiConnected?: boolean;
    file?: PDFFile;
}

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

async function getPDFText(base64File: string) {
    const pdfJSFile = await PDFJS.getDocument(base64File).promise
    const numPages = pdfJSFile.numPages;
    console.log(await pdfJSFile.getMetadata())
    console.log(await (await pdfJSFile.getPage(1)).getTextContent())
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

class EnhancedPreprintGenerator extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {apiConnected: false};
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(_ => this.setState({apiConnected: true})).catch(() => {
            this.setState({apiConnected: false})
        });
    }

    storePreprint(title: string, keywords: string[], doi?: string) {
        fetch(`http://localhost:9000/database/storePreprint?title=${title}&keywords=${JSON.stringify(keywords)}${doi ? "&doi=" + doi : ""}`, {
            method: 'PUT'
        }).then(_ => {
        })
    }

    async requestPreprints(title: string, keywords: string[]) {
        const response = await fetch(`http://localhost:9000/database/getRelatedPreprints?keywords=${JSON.stringify(keywords)}`)
        const result: { title: string, doi?: string, keywords: string[] }[] = JSON.parse(await response.text())
        return result.filter((preprint) => {
            return preprint.title !== title
        })
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
                            <PDFInfoForm file={this.state.file} onSubmit={async (bibTexEntries, keywords) => {
                                this.storePreprint(bibTexEntries["title"], keywords, bibTexEntries["doi"])
                                console.log(await this.requestPreprints(bibTexEntries["title"], keywords))
                                await createBibTexAnnotation(
                                    this.state.file!.file,
                                    this.state.file!.name,
                                    bibTexEntries
                                )
                            }}/>
                        }
                    </header>
                </div>
            </ThemeProvider>
        );
    }
}


export default EnhancedPreprintGenerator;
