import React from "react";
import {TextField} from "@mui/material";

export function PublishDateSelector(props: { publishDate: Date, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) {
    return <TextField
        id="date"
        label="Publish Date"
        type="month"
        helperText="Enter the publish date"
        value={`${props.publishDate.getFullYear()}-${("0" + (props.publishDate.getMonth() + 1)).slice(-2)}`}
        onChange={(e) => {
            props.onChange(e)
        }}
        InputLabelProps={{
            shrink: true,
        }}
    />;
}