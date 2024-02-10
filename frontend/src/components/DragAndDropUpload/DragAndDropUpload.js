import React, { useCallback, useState } from "react";
import {
    DragAndDropContainer,
    DragAndDropText,
} from "../../style/layout/StyledDragAndDropUpload";
function DragAndDropUpload({ onFilesAdded }) {
    const [dragOver, setDragOver] = useState(false);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
    }, []);

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            setDragOver(false);
            const files = e.dataTransfer.files;
            if (onFilesAdded) {
                onFilesAdded(files);
            }
        },
        [onFilesAdded]
    );

    const handleFileSelect = useCallback(
        (e) => {
            const files = e.target.files;
            if (onFilesAdded) {
                onFilesAdded(files);
            }
        },
        [onFilesAdded]
    );

    return (
        <DragAndDropContainer
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
            style={{ borderColor: dragOver ? "#0000ff" : "#cccccc" }}
        >
            <input
                id="fileInput"
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileSelect}
            />
            <DragAndDropText>
                Drag and drop files here or click to upload
            </DragAndDropText>
        </DragAndDropContainer>
    );
}

export default DragAndDropUpload;
