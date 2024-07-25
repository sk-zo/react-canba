import React from "react";

function FileOption({component, updateComponent}) {
    const handleFileUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            updateComponent(component.id, { src: file });
        }
    };
    
    return (
        <div>
            <input type="file" onChange={handleFileUpload}/>
        </div>
    );
}

export default FileOption;