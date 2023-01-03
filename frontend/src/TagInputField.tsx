import {Close} from '@mui/icons-material';
import {TextField, Chip, IconButton} from '@mui/material';
import React, {useState} from "react";


export function TagInputField() {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <TextField
                label="Tags"
                style={{flexGrow: 0, flexShrink: 0}}
                value={inputValue}
                onChange={(event) => {
                    setInputValue(event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        // Add the current input value as a new tag
                        setTags([...tags, inputValue]);
                        setInputValue('');
                    }
                }}
                variant="outlined"
                helperText="Press enter to add a tag"
            />
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {tags.map((tag) => (
                    <Chip
                        label={tag}
                        style={{marginLeft: "5px", marginBottom: "5px"}}
                        onDelete={() => {
                            // Remove the tag from the array
                            setTags(tags.filter((t) => t !== tag));
                        }}
                    />
                ))}
            </div>
        </div>
    );
}