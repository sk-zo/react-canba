import React from "react";
import './input.css'

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
        <div className="tpye">
          <div className="tpyeA">
          글자 크기 :  &nbsp;
          <input
            type="number"
            class="inputField"
            value={parseInt(component.style.fontSize)}
            onChange={handleFontSizeChange}
          />
          </div>
          <div className="tpyeA">
            글자 색 : &nbsp;
            <input type="color" value={component.style.color} onChange={handleColorChange} />
          </div>
          <div className="tpyeA">
          글자 위치 :
          <label style={{ display: 'block' }}>
            <input 
              type="radio" 
              name="text-option-align"
              value={"왼쪽 정렬"}
              checked={component.style.textAlign === "왼쪽 정렬"}
              onChange={handleTextAlignChange}
            />왼쪽 정렬
          </label>
          <label style={{ display: 'block' }}>
            <input 
              type="radio" 
              name="text-option-align"
              value={"가운데 정렬"}
              checked={component.style.textAlign === "가운데 정렬"}
              onChange={handleTextAlignChange}
            />가운데 정렬
          </label>
          <label style={{ display: 'block' }}>
            <input 
              type="radio" 
              name="text-option-align"
              value={"오른쪽 정렬"}
              checked={component.style.textAlign === "오른쪽 정렬"}
              onChange={handleTextAlignChange}
            />오른쪽 정렬
          </label>
        </div>

          <div className="tpyeA">
            글자 굵기 : &nbsp;
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