import {Button} from "@mui/material";
import React from "react";

export function GenerateButton(props: { onClick: () => void, style?: React.CSSProperties }) {
    return <Button
        variant="contained" style={{fontWeight: "bold",...props.style}} onClick={props.onClick}>Generate Preprint PDF & Upload
    </Button>;
}