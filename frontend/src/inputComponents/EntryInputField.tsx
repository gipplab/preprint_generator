import React, {ChangeEvent, useState, useEffect, useRef} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {BibTexEntry} from "../pdf/PDFFileForm";

export function EntryInputField(props: {
    entry: BibTexEntry,
    onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    onClick: () => void
}) {
    const [inputWidth, setInputWidth] = useState('auto');
    const textMeasureRef = useRef<HTMLSpanElement>(null);

    const updateWidth = () => {
        if (textMeasureRef.current) {
            const maxWidth = window.innerWidth * 0.8 - 100;
            const textWidth = textMeasureRef.current.offsetWidth;
            const calculatedWidth = Math.min(Math.max(200, textWidth + 60), maxWidth); // +40 for some padding
            setInputWidth(`${calculatedWidth}px`);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateWidth);
        updateWidth(); // Initial update

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, [props.entry.value]);

    return (
        <>
            <span
                ref={textMeasureRef}
                style={{
                    visibility: 'hidden',
                    position: 'fixed', // Changed to fixed
                    left: '-9999px', // Position off-screen
                    whiteSpace: 'pre',
                    fontSize: '16px', // Match TextField font size
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Match TextField font family
                    // Add any other styles that your TextField has
                }}
            >
                {props.entry.value}
            </span>

            <TextField
                id="outlined-basic"
                error={props.entry.error}
                label={props.entry.tag}
                type={props.entry.type}
                value={props.entry.value}
                helperText={`Enter the ${props.entry.name}`}
                onChange={(e) => {
                    props.onChange(e);
                    updateWidth();
                }}
                style={{width: inputWidth}}
                {...(!props.entry.default ? {
                    InputProps: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end" color="primary"
                                            onClick={props.onClick}>
                                    <ClearIcon/>
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                } : {})}
            />
        </>
    );
}
