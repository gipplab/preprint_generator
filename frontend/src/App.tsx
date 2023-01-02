import React, {Component} from 'react';
import './App.css';
import {FileUploader} from "react-drag-drop-files";
import {PDFDocument} from 'pdf-lib'
import {PDFFileForm} from "./PDFFileForm";
import {parsePDF, PDFFile, PDFInfo} from "./pdf/PDFParser";
import {createBibTexAnnotation} from "./pdf/PDFBibTexAnnotationGenerator";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';

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

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
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
            <ThemeProvider theme={darkTheme}>
                <div className="App">
                    <Box sx={{flexGrow: 1}}>
                        <AppBar position="static">
                            <Toolbar>
                                <ArticleIcon/>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    {this.state.file ? this.state.file.name : "Enhanced Preprint Generator"}
                                </Typography>
                                <Button color="inherit" onClick={() => {
                                    this.setState({file: undefined})
                                }}>Reset Document</Button>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <header className="App-header">
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
                        <br/>
                        {this.state.file &&
                            <PDFFileForm onSubmit={async (bibTexEntries) => {
                                await createBibTexAnnotation(
                                    this.state.file!.file,
                                    this.state.file!.name,
                                    bibTexEntries
                                )
                            }} info={this.state.file.info}/>}
                    </header>
                </div>
            </ThemeProvider>
        );
    }
}


export default App;
