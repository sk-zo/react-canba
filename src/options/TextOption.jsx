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
        </div>
    );
}

export default TextOption