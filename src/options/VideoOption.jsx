import React from "react";

function VideoOption({component, updateComponent}) {
    const handleVideoUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            updateComponent(component.id, { src: videoUrl, file: file});
        }
    };

    return (
        <div>
            <input 
                type="file" 
                accept="video/*"
                id={`upload-video-${component.id}`}
                onChange={handleVideoUpload}
                style={{ display: 'none' }}
            />
            <label htmlFor={`upload-video-${component.id}`}>
                <span style={{ cursor: 'pointer' }}>파일 업로드</span>
            </label>
        </div>
    );
}

export default VideoOption;