import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@mui/material';
import {parse, Entry} from '@retorquere/bibtex-parser';
import {BibTexEntry} from "../pdf/PDFFileForm";

interface BibTexEntryDialogProps {
    open: boolean;
    onClose: () => void;
    onParseBibtex: (newEntries: BibTexEntry[]) => void;
}

const BibTexEntryDialog: React.FC<BibTexEntryDialogProps> = ({open, onClose, onParseBibtex}) => {
        const [bibTexInput, setBibTexInput] = useState("");

        const handleBibTexSubmit = () => {
            const parsedEntries = parseBibTex(bibTexInput);
            if (parsedEntries) {
                onParseBibtex(parsedEntries);
            }
            setBibTexInput("");
            onClose();
        };

        const parseBibTex = (input: string): BibTexEntry[] | null => {
            try {
                const parsed = parse(input);
                console.log(parsed)
                return transformParsedData(parsed.entries);
            } catch (error) {
                console.error("Error parsing BibTeX: ", error);
                return [];
            }
        };

        const transformParsedData = (entries: Entry[]): BibTexEntry[] | null => {
            if (entries.length === 0) return null
            const newEntries = Object.entries(entries[0].fields).map(([key, value]) => {
                return {
                    name: key,
                    tag: key,
                    default: true,
                    value: value[0],
                };
            });
            newEntries.push({
                name: "type",
                tag: "type",
                default: false,
                value: entries[0].type
            })
            return newEntries
        }


        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Add BibTeX Entry</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="bibTex"
                        label="BibTeX String"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={bibTexInput}
                        onChange={(e) => setBibTexInput(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleBibTexSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        );
    }
;

export default BibTexEntryDialog;
