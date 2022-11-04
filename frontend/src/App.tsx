import React, {Component} from 'react';
import './App.css';
import {FileUploader} from "react-drag-drop-files";
import {PDFDocument} from 'pdf-lib'
import {PDFFileForm} from "./PDFFileForm";

const fileTypes = ["PDF"];

interface AppProps {
}

interface AppState {
    apiResponse?: string;
    file?: PDFFile;
}

interface PDFFile {
    name: string;
    file: PDFDocument;
    title: string;
    author: string;
    venue: string;
    pages: number;
    date: Date;
}

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

function saveByteArray(reportName: string, byte: Uint8Array) {
    var blob = new Blob([byte], {type: "application/pdf"});
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = reportName;
    link.click();
};

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {apiResponse: "Not connected!"};
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res})).catch(() => {
        });
    }

    componentWillMount() {
        this.callAPI();
    }

    async editPDF(pdf: PDFFile) {
        console.log(this.state.file)
        const pages = pdf.file.getPages()
        pages[0].drawText('You can modify PDFs too!')
        const pdfBytes = await pdf.file.save()
        console.log(pdf.file.getTitle())
        //saveByteArray(pdf.name, pdfBytes);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <button onClick={() => {
                        this.setState({file: undefined})
                    }}>Reset Document
                    </button>
                    <p className="App-intro">{this.state.apiResponse}</p>
                    {(!this.state.file) &&
                        <FileUploader handleChange={async (file: any) => {
                            let pdfDoc = await PDFDocument.load(await toBase64(file))
                            let pdfFile: PDFFile = {
                                author: pdfDoc.getAuthor() || "",
                                title: pdfDoc.getTitle() || "",
                                venue: pdfDoc.getProducer() || "",
                                date: pdfDoc.getCreationDate() || new Date(),
                                pages: pdfDoc.getPageCount(),
                                name: file.name, file: pdfDoc
                            }
                            this.setState({
                                file: pdfFile
                            })
                            await this.editPDF(pdfFile)

                        }} name="file"
                                      types={fileTypes}/>}
                    {this.state.file && <div>{this.state.file.name}</div>}
                    {this.state.file &&
                        <PDFFileForm onSubmit={(file) => console.log(file)} title={this.state.file.title}
                                     author={this.state.file.author}
                                     venue={this.state.file.venue} date={this.state.file.date}
                                     pages={this.state.file.pages}/>}
                </header>
            </div>
        );
    }
}


export default App;
