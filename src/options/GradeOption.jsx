import React from "react";
import './input.css';

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
        <div className="tpye">
            <div className="tpyeA">
                <span className="option-title">글자 크기 : &nbsp;</span>
                <input 
                    type="number" 
                    className="inputField-option"
                    value={parseInt(component.style.fontSize)}
                    onChange={handleFontSizeChange}
                />
            </div>
            <div className="tpyeA">
                <span className="option-title">글자 색상 : &nbsp;</span>
                <input 
                    type="color"
                    value={component.style.color}
                    onChange={handleFontColorChange}
                />
            </div>
            <div className="tpyeA">
                <span className="option-title">별 크기 : &nbsp;</span>
                <input 
                    type="number" 
                    className="inputField-option"
                    value={parseInt(component.style.starSize)}
                    onChange={handleStarSizeChange}
                />
            </div>
            <div className="tpyeA">
                <span className="option-title">별 색상 : &nbsp;</span>
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