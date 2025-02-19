import {FileUploader} from "react-drag-drop-files";
import React from "react";
import "../styles/globals.css"

const fileTypes = ["PDF"];

export function PDFFileUploader(props: { handleChange: (file: any) => Promise<void> }) {
    return (
        <>
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">Drag & Drop a preprint PDF to enhance it! </h2>
            <FileUploader classes="min-h-48 w-80 bg-cyan-100" handleChange={props.handleChange} name="file"

                          types={fileTypes}/>

        </>
    )
}