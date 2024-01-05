import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Container, Grid, Paper, Typography, Box, Button, useTheme, useMediaQuery} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import config from "../config.json";
import '../EnhancedPreprintGenerator.css';
import {EnhancedPreprintGeneratorAppBar} from "../EnhancedPreprintGeneratorAppBar";
import {ThemeProvider} from "@mui/material/styles";
import darkTheme from "../theme"; // Assuming this CSS file has your styling

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
        fetch(`${config.backend_url}/preprint/info/${title}`)
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
        <ThemeProvider theme={darkTheme}>
            <Box className="App">
                <EnhancedPreprintGeneratorAppBar file={undefined} apiConnected={true} onClick={undefined}/>
                <header className={"App-header"} style={{justifyContent: "center"}}>
                    <Container maxWidth="lg">
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
                                            src={`${config.backend_url}/preprint/${title}`}
                                            width="100%"
                                            height={isMobile ? "300px" : "600px"}
                                            style={{border: 'none'}}
                                            title="PDF Viewer"
                                        ></iframe>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Container>
                </header>
            </Box>
        </ThemeProvider>
    );
};

export default PreprintViewer;
