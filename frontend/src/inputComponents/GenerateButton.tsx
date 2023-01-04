import {Button} from "@mui/material";
import React from "react";

export function GenerateButton(props: { onClick: () => void }) {
    return <Button
        variant="contained" onClick={props.onClick}>Generate
    </Button>;
}