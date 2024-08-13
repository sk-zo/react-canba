import React from "react";

function ImageOption({
    component,
    updateComponent
}) {

    const handleImageUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            updateComponent(component.id, { src: imageUrl, file: file});
        }
    };


    return (
        <div>
            <input 
                type="file" 
                accept='image/*'
                id={`upload-image-${component.id}`}
                onChange={handleImageUpload}
                style={{ display: 'none' }}
            />
            <label htmlFor={`upload-image-${component.id}`}>
                <span style={{ cursor: 'pointer' }}>파일 업로드</span>
            </label>
        </div>
    );
}

export default ImageOption;