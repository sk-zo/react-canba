import React from "react";

function TextOption({
    component,
    updateComponent
}) {
    const handleFontSizeChange = (e) => {
        updateComponent(component.id, {
          style: {
            ...component.style,
            fontSize: `${e.target.value}px`,
          },
        });
      };
    
    const handleColorChange = (e) => {
        updateComponent(component.id, {
          style: {
            ...component.style,
            color: e.target.value,
          },
        });
    };

    const handleTextAlignChange = (e) => {
      updateComponent(component.id, {
        style: {
          ...component.style,
          textAlign: e.target.value,
        },
      });
    };

    const handleFontWeightChange = (e) => {
      updateComponent(component.id, {
        style: {
          ...component.style,
          fontWeight: e.target.value,
        }
      })
    }

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
            Color:
            <input type="color" value={component.style.color} onChange={handleColorChange} />
          </div>
          <div>
            Text Align:
            <input 
              type="radio" 
              name="text-option-align"
              value={"left"}
              checked={component.style.textAlign === "left"}
              onChange={handleTextAlignChange}
            />left
            <input 
              type="radio" 
              name="text-option-align"
              value={"center"}
              checked={component.style.textAlign === "center"}
              onChange={handleTextAlignChange}
            />center
            <input 
              type="radio" 
              name="text-option-align"
              value={"right"}
              checked={component.style.textAlign === "right"}
              onChange={handleTextAlignChange}
            />right
          </div>
          <div>
            font-weight:
            <input 
              type="radio"
              name="text-option-bold" 
              value={"normal"}
              checked={component.style.fontWeight === "normal"}
              onChange={handleFontWeightChange}
            /> normal
            <input 
              type="radio"
              name="text-option-bold" 
              value={"bold"}
              checked={component.style.fontWeight === "bold"}
              onChange={handleFontWeightChange}
            /> bold
          </div>
        </div>
    );
}

export default TextOption