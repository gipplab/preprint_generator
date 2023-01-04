import {PDFFile} from "./PDFParser";
import {FileUploader} from "react-drag-drop-files";
import React from "react";

const fileTypes = ["PDF"];

export function PDFFileUploader(props: { file: PDFFile | undefined, handleChange: (file: any) => Promise<void> }) {
    return <>
        {(!props.file) &&
            <>
                <h6>Drag & Drop a preprint PDF to enhance it! </h6>
                <FileUploader handleChange={props.handleChange} name="file"
                              types={fileTypes}/>
            </>}
    </>;
}