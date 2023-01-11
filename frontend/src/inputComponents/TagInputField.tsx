import {TextField, Chip} from '@mui/material';
import React, {useState} from "react";


interface TagInputFieldInterface {
    keywords: string[]
    setKeywords: (keywords: string[]) => void
}

export function TagInputField(props: TagInputFieldInterface) {
    const [inputValue, setInputValue] = useState<string>('');

    return (
        <div style={{display: "flex", alignItems: "start"}}>
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
                        if (inputValue !== "" && props.keywords.indexOf(inputValue) === -1) {
                            props.setKeywords([...props.keywords, inputValue.toLowerCase()]);
                            setInputValue('');
                        }
                    }
                }}
                variant="outlined"
                helperText="Press enter to add a tag"
            />
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {props.keywords.map((tag) => (
                    <Chip
                        key={tag}
                        label={tag}
                        style={{marginLeft: "5px", marginBottom: "5px"}}
                        onDelete={() => {
                            // Remove the tag from the array
                            props.setKeywords(props.keywords.filter((t) => t !== tag));
                        }}
                    />
                ))}
            </div>
        </div>
    );
}