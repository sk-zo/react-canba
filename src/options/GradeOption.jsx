import React from "react";

function GradeOption({component, updateComponent}) {
    const handleFontSizeChange = (e) => {
        updateComponent(component.id, {
            style: {
                ...component.style,
                fontSize: `${e.target.value}px`,
            },
        });
    };

    const handleFontColorChange = (e) => {
        updateComponent(component.id, {
            style: {
                ...component.style,
                color: e.target.value,
            },
        });
    };

    const handleStarColorChange = (e) => {
        updateComponent(component.id, {
            style: {
                ...component.style,
                starColor: e.target.value,
            },
        });
    };

    const handleStarSizeChange = (e) => {
        updateComponent(component.id, {
            style: {
                ...component.style,
                starSize: `${e.target.value}px`,
            },
        });
    };

    return (
        <div>
            <div>
                Font Size:
                <input 
                    type="number" 
                    value={parseInt(component.style.fontSize)}
                    onChange={handleFontSizeChange}
                />
            </div>
            <div>
                Font Color:
                <input 
                    type="color"
                    value={component.style.color}
                    onChange={handleFontColorChange}
                />
            </div>
            <div>
                Star Size:
                <input 
                    type="number" 
                    value={parseInt(component.style.starSize)}
                    onChange={handleStarSizeChange}
                />
            </div>
            <div>
                Star Color:
                <input 
                    type="color"
                    value={component.style.starColor}
                    onChange={handleStarColorChange}
                />
            </div>
        </div>
    )
}

export default GradeOption;