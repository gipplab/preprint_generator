import React, {ChangeEvent} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export function EntryFieldGenerator(props: { value: string, onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void, onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void, onClick: () => void }) {
    return <TextField
        label="Add New Field"
        value={props.value}
        helperText="Press enter to add a new field"
        onKeyDown={(e) => {
            props.onKeyDown(e)
        }}
        onChange={props.onChange}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton edge="end" color="primary"
                                onClick={props.onClick}>
                        <AddOutlinedIcon/>
                    </IconButton>
                </InputAdornment>)
        }}
    />;
}