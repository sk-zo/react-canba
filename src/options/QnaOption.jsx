import React from "react";

function QnaOption({
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
          <label>
          Font Size:
          <input
            type="number"
            value={parseInt(component.style.fontSize)}
            onChange={handleFontSizeChange}
          />
          </label>
          <label>
            Color:
            <input type="color" value={component.style.color} onChange={handleColorChange} />
          </label>
        </div>
    );
}

export default QnaOption