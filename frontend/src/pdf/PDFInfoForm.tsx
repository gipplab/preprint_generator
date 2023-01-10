import {PDFFile} from "./PDFParser";
import {PDFFileForm} from "./PDFFileForm";
import {TagInputField} from "../inputComponents/TagInputField";
import React from "react";

export function PDFInfoForm(props: { file: PDFFile | undefined, onSubmit: (bibTexEntries: { [id: string]: string }) => void }) {
    return <>
        {props.file &&
            <div style={{width: "80%"}}>
                <h6>BibTex Information</h6>
                <PDFFileForm onSubmit={props.onSubmit} info={props.file.info}/>
                <br/>
                <h6>Keywords</h6>
                <div style={{position: "relative", bottom: 0, left: 0}}>
                    <TagInputField keywords={props.file.info.keywords}/>
                </div>
            </div>

        }
    </>;
}