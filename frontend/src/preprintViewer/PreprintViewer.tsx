import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Container, Grid, Paper, Typography, Box, Button, useTheme, useMediaQuery} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import config from "../config.json";
import '../EnhancedPreprintGenerator.css';
import {EnhancedPreprintGeneratorAppBar} from "../EnhancedPreprintGeneratorAppBar";
import {ThemeProvider} from "@mui/material/styles";
import darkTheme from "../theme";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../components/ui/Card";
import GitHubIcon from "@mui/icons-material/GitHub"; // Assuming this CSS file has your styling

const backendURL = process.env.REACT_APP_BACKEND_URL || config.backend_url;

interface Preprint {
    title: string;
    author: string;
    year: string;
    annotation: string;
    // Add other relevant fields for your preprint
}

const PreprintViewer = () => {
    const {title} = useParams();
    const [preprint, setPreprint] = useState<Preprint | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    useEffect(() => {
        fetch(`${backendURL}/preprint/info/${title}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: Preprint) => {
                setPreprint(data);
            })
            .catch(error => {
                console.error('Error fetching preprint', error);
            });
    }, [title]);

    return (
        <div className="min-h-screen flex items-center justify-center overflow-y-auto">
            <Card className="w-full max-w-5xl mx-auto bg-white shadow-xl border border-indigo-100">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-lg">
                    <CardTitle className="font-bold text-center text-white">
                        <h1 className="text-3xl"><a href="/">CiteAssist</a></h1>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <Grid container spacing={3}>
                        {preprint && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <Paper style={{padding: '20px'}}>
                                        <>
                                            <Typography variant="h5">{preprint.title}</Typography>
                                            <Typography
                                                variant="subtitle1">Author: {preprint.author}</Typography>
                                            <Typography variant="subtitle1">Year: {preprint.year}</Typography>
                                        </>
                                    </Paper>
                                    <Paper style={{padding: '20px', marginTop: '20px'}}>
                                        <Typography variant="body1">
                                            Citation:
                                            <pre style={{
                                                textAlign: "left",
                                                whiteSpace: "pre-wrap",
                                                wordWrap: "break-word"
                                            }}>
                                                    {preprint.annotation}
                                                </pre>
                                        </Typography>
                                        <Button
                                            startIcon={<ContentCopyIcon/>}
                                            onClick={() => copyToClipboard(preprint.annotation)}
                                            size="small"
                                        >
                                            Copy Citation
                                        </Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <iframe
                                        src={`${backendURL}/preprint/${title}`}
                                        width="100%"
                                        height={isMobile ? "300px" : "600px"}
                                        style={{border: 'none'}}
                                        title="PDF Viewer"
                                    ></iframe>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4 rounded-b-lg border-t border-gray-200">
                    <div className="w-full flex justify-between items-center text-sm text-gray-600">
                        <span>© 2024 GippLab</span>
                        <a
                            href="https://github.com/gipplab/preprint_generator"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
                        >
                            <GitHubIcon/>
                            View on GitHub
                        </a>
                    </div>
                </CardFooter>
            </Card>
        </div>);
};
{/*<ThemeProvider theme={darkTheme}>
            <Box className="App">
                <EnhancedPreprintGeneratorAppBar file={undefined} apiConnected={true} onClick={undefined}/>
                <header className={"App-header"} style={{justifyContent: "center"}}>
                    <Container maxWidth="lg">

                    </Container>
                </header>
            </Box>
        </ThemeProvider>*/
}


export default PreprintViewer;
