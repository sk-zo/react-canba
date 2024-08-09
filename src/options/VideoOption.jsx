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
                onChange={handleVideoUpload}
            />
        </div>
    );
}

export default VideoOption;