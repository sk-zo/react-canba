import React from "react";

function AudioOption({component, updateComponent}) {
    const handleAudioUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const audioUrl = URL.createObjectURL(file);
            updateComponent(component.id, { src: audioUrl, file: file });
        }
    };

    return (
        <div>
            <input 
                type="file" 
                accept="audio/*"
                id={`upload-audio-${component.id}`}
                onChange={handleAudioUpload}
                style={{ display: 'none' }}
            />
            <label htmlFor={`upload-audio-${component.id}`}>
                <span style={{ cursor: 'pointer' }}>파일 업로드</span>
            </label>
        </div>
    )
}

export default AudioOption;