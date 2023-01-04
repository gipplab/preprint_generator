import {TextField, Chip} from '@mui/material';
import React, {useState} from "react";


interface TagInputFieldInterface {
    keywords: string[]
}

export function TagInputField(props: TagInputFieldInterface) {
    const [tags, setTags] = useState<string[]>(props.keywords);
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
                        if (inputValue !== "" && tags.indexOf(inputValue) === -1) {
                            setTags([...tags, inputValue.toLowerCase()]);
                            setInputValue('');
                        }
                    }
                }}
                variant="outlined"
                helperText="Press enter to add a tag"
            />
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {tags.map((tag) => (
                    <Chip
                        key={tag}
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