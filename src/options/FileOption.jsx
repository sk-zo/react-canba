import React from "react";

function FileOption({component, updateComponent}) {
    const handleFileUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            updateComponent(component.id, { file: file });
        }
    };
    
    return (
        <div>
            <input 
                type="file" 
                id={`upload-file-${component.id}`}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />
            <label htmlFor={`upload-file-${component.id}`}>
                <span style={{ cursor: 'pointer' }}>파일 업로드</span>
            </label>
        </div>
    );
}

export default FileOption;