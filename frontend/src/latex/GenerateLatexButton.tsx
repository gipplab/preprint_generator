import {Button} from "@mui/material";
import React from "react";

export function GenerateLatexButton(props: { onClick: () => void, style?: React.CSSProperties }) {
    return <Button
        variant="contained" style={{fontWeight: "bold", ...props.style}} onClick={props.onClick}>Generate Latex Files & Upload
    </Button>;
}