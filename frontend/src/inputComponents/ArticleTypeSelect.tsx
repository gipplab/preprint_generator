import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";

export function ArticleTypeSelect(props: { value: string, error: boolean, onChange: (value: SelectChangeEvent) => void }) {
    return <FormControl style={{minWidth: 120}}>
        <InputLabel id="type-label">Type</InputLabel>
        <Select id="type" labelId="type-label" value={props.value} label="Type" error={props.error}
                onChange={(value) => {
                    props.onChange(value)
                }}>
            <MenuItem value="article">Journal article</MenuItem>
            <MenuItem value="book">Book</MenuItem>
            <MenuItem value="booklet">Printed work without a publisher</MenuItem>
            <MenuItem value="inbook">Any section in a book</MenuItem>
            <MenuItem value="incollection">A titled section of a book</MenuItem>
            <MenuItem value="inproceedings">Conference paper</MenuItem>
            <MenuItem value="manual">Manual</MenuItem>
            <MenuItem value="mastersthesis">Master's thesis</MenuItem>
            <MenuItem value="phdthesis">PhD thesis</MenuItem>
            <MenuItem value="techreport">Technical report or white paper</MenuItem>
            <MenuItem value="unpublished">A work that has not yet been officially published
            </MenuItem>
            <MenuItem value="misc">Miscellaneous: if nothing else fits</MenuItem>
        </Select>
        <FormHelperText>Select the paper type</FormHelperText>
    </FormControl>;
}