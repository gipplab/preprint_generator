import React, {Component} from 'react';
import './App.css';
import {FileUploader} from "react-drag-drop-files";
import {PDFDocument} from 'pdf-lib'
import {PDFFileForm} from "./PDFFileForm";
import {parsePDF, PDFFile, PDFInfo} from "./pdf/PDFParser";
import {createBibTexAnnotation} from "./pdf/PDFBibTexAnnotationGenerator";
import {AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import {TagInputField} from "./TagInputField";
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';

const fileTypes = ["PDF"];

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

class App extends Component<AppProps, AppState> {
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
                                {this.state.apiConnected ? (
                                    <Tooltip title="API connected!"><PowerIcon/></Tooltip>) : (
                                    <Tooltip title="API disconnected!"><PowerOffIcon/></Tooltip>)}
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <header className="App-header">
                        {(!this.state.file) &&
                            <>
                                <h5>Drag & Drop a preprint PDF to enhance it! </h5>
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
                                              types={fileTypes}/>
                            </>}
                        {this.state.file &&
                            <div style={{maxWidth: "80%"}}>
                                <h5>BibTex Information</h5>
                                <PDFFileForm onSubmit={async (bibTexEntries) => {
                                    await createBibTexAnnotation(
                                        this.state.file!.file,
                                        this.state.file!.name,
                                        bibTexEntries
                                    )
                                }} info={this.state.file.info}/>
                                <br/>
                                <h5>Keywords</h5>
                                <div style={{position: "relative", bottom: 0, left: 0}}>
                                    <TagInputField/>
                                </div>
                            </div>

                        }
                    </header>
                </div>
            </ThemeProvider>
        );
    }
}


export default App;
