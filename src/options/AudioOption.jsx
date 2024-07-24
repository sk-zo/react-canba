import React from "react";

function AudioOption({component, updateComponent}) {
    const handleAudioUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const audioUrl = URL.createObjectURL(file);
            updateComponent(component.id, { src: audioUrl });
        }
    };

    return (
        <div>
            <input 
                type="file" 
                accept="audio/*"
                onChange={handleAudioUpload}
            />
        </div>
    )
}

export default AudioOption;