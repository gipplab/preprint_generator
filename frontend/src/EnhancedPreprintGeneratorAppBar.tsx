import {PDFFile} from "./pdf/PDFParser";
import {AppBar, Button, Toolbar, Tooltip, Typography} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import PowerIcon from "@mui/icons-material/Power";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import React from "react";

export function EnhancedPreprintGeneratorAppBar(props: { file: PDFFile | undefined, apiConnected: boolean | undefined, onClick: () => void }) {
    return <AppBar position="sticky">
        <Toolbar style={{justifyContent: "space-between", alignItems: "center"}}>
            <div style={{flex: 0.33, display: "flex", alignItems: "center"}}>
                <ArticleIcon/>
            </div>
            <Typography variant="h5" component="div" style={{flex: 0.33}}>
                {props.file ? props.file.name : "Enhanced Preprint Generator"}
            </Typography>
            <div style={{
                flex: 0.33,
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center"
            }}>
                {props.apiConnected ? (
                    <Tooltip title="API connected!"><PowerIcon/></Tooltip>) : (
                    <Tooltip title="API disconnected!"><PowerOffIcon/></Tooltip>)}
                <Button color="inherit" onClick={props.onClick}>Reset Document</Button>
            </div>
        </Toolbar>
    </AppBar>;
}