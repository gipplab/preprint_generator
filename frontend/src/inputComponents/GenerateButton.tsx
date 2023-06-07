import {Button} from "@mui/material";
import React from "react";

export function GenerateButton(props: { onClick: () => void }) {
    return <Button
        variant="contained" style={{fontWeight: "bold"}} onClick={props.onClick}>4. Generate Preprint
    </Button>;
}