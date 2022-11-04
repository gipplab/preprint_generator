import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {FileUploader} from "react-drag-drop-files";
import {PDFDocument} from 'pdf-lib'

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
    var fileName = reportName;
    link.download = fileName;
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

    async editPDF(pdf: PDFDocument) {
        console.log(this.state.file)
        const pages = pdf.getPages()
        pages[0].drawText('You can modify PDFs too!')
        const pdfBytes = await pdf.save()
        saveByteArray("Sample Report", pdfBytes);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p className="App-intro">{this.state.apiResponse}</p>
                    {(!this.state.file) &&
                        <FileUploader handleChange={async (file: any) => {
                            console.log(await toBase64(file))
                            let pdfFile = {name: file.name, file: await PDFDocument.load(await toBase64(file))}
                            this.setState({
                                file: pdfFile
                            })
                            await this.editPDF(pdfFile.file)

                        }} name="file"
                                      types={fileTypes}/>}
                    {this.state.file && <div>{this.state.file.name}</div>}
                </header>
            </div>
        );
    }
}


export default App;
