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
    const firstPageText = (await (await pdfJSFile.getPage(1)).getTextContent()).items.map((item: { str: any; }) => {
        return item.str
    }).join(" ") as string
    let text = '';
    for (let i = 2; i <= numPages; i++) {
        const page = await pdfJSFile.getPage(i)
        const pageText = await page.getTextContent();
        text += pageText.items.map((item: { str: any; }) => {
            return item.str
        }).join(" ")
    }
    return {firstPage: firstPageText, text}
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
                        <PDFFileUploader file={this.state.file} handleChange={async (file: any) => {
                            let base64File = await toBase64(file)
                            let pdfDoc = await PDFDocument.load(base64File)

                            //TODO make useful
                            const pdfText = await getPDFText(base64File);
                            console.log(pdfText)

                            let pdfFile: PDFFile = {
                                name: file.name,
                                file: pdfDoc,
                                info: parsePDF(pdfDoc, pdfText, file.name)
                            }
                            this.setState({
                                file: pdfFile
                            })

                        }}/>
                        <PDFInfoForm file={this.state.file} onSubmit={async (bibTexEntries) => {
                            await createBibTexAnnotation(
                                this.state.file!.file,
                                this.state.file!.name,
                                bibTexEntries
                            )
                        }}/>
                    </header>
                </div>
            </ThemeProvider>
        );
    }
}


export default EnhancedPreprintGenerator;
