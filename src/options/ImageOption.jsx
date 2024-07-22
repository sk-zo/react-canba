import React from "react";

function ImageOption({
    component,
    updateComponent
}) {

    const handleImageUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            updateComponent(component.id, { src: imageUrl});
        }
    };


    return (
        <div>
            <input 
                type="file" 
                accept='image/*'
                onChange={handleImageUpload}
            />        
        </div>
    );
}

export default ImageOption