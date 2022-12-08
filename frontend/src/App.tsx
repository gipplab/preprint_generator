import React, {Component} from 'react';
import './App.css';
import {FileUploader} from "react-drag-drop-files";
import {PDFDocument} from 'pdf-lib'
import {PDFFileForm} from "./PDFFileForm";
import {parsePDF, PDFFile, PDFInfo} from "./pdf/PDFParser";
import {createBibTexAnnotation} from "./pdf/PDFBibTexAnnotationGenerator";

const fileTypes = ["PDF"];

interface AppProps {
}

interface AppState {
    apiResponse?: string;
    file?: PDFFile;
}

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

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
                                name: file.name,
                                file: pdfDoc,
                                info: parsePDF(pdfDoc, file.name)
                            }
                            this.setState({
                                file: pdfFile
                            })

                        }} name="file"
                                      types={fileTypes}/>}
                    {this.state.file && <div>{this.state.file.name}</div>}
                    {this.state.file &&
                        <PDFFileForm onSubmit={async (file) => {
                            console.log(file)
                            await createBibTexAnnotation({
                                file: this.state.file!.file,
                                name: this.state.file!.name,
                                info: file
                            })
                        }} info={this.state.file.info}/>}
                </header>
            </div>
        );
    }
}


export default App;
