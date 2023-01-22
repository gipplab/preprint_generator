import React, {ChangeEvent} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {BibTexEntry} from "../pdf/PDFFileForm";

export function EntryInputField(props: { entry: BibTexEntry, onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void, onClick: () => void }) {
    return <TextField
        id="outlined-multiline-static"
        error={props.entry.error}
        label={props.entry.tag}
        type={props.entry.type}
        value={props.entry.value}
        helperText={`Enter the ${props.entry.name}`}
        onChange={(e) => {
            props.onChange(e)
        }}
        {...(!props.entry.default ? {
            InputProps: {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton edge="end" color="primary"
                                    onClick={props.onClick}>
                            <ClearIcon/>
                        </IconButton>
                    </InputAdornment>)
            }
        } : {})}
    />;
}