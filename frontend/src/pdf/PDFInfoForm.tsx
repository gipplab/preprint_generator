import {PDFFile} from "./PDFParser";
import {PDFFileForm} from "./PDFFileForm";
import {TagInputField} from "../inputComponents/TagInputField";
import React, {useState} from "react";

export function PDFInfoForm(props: { file: PDFFile | undefined, onSubmit: (bibTexEntries: { [id: string]: string }, keywords: string[]) => void }) {
    const [keywords, setKeywords] = useState<string[]>([])
    return <>
        {props.file &&
            <div style={{width: "80%"}}>
                <h6>BibTex Information</h6>
                <PDFFileForm onSubmit={(bibTexEntries) => {
                    props.onSubmit(bibTexEntries, keywords)
                }} info={props.file.info}/>
                <br/>
                <h6>Keywords</h6>
                <div style={{position: "relative", bottom: 0, left: 0}}>
                    <TagInputField keywords={props.file.info.keywords} submitKeywords={(res) => {
                        setKeywords(res)
                    }}/>
                </div>
            </div>

        }
    </>;
}