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

    const addQuestion = () => {
      
      const updatedQuestions = [...component.questions, '질문을 입력해주세요.'];
      updateComponent(component.id, {questions: updatedQuestions, style: {...component.style, height:'min-content'}});
    }

    const removeQuestion = () => {
      const updatedQuestions = component.questions.length > 1 
                              ? component.questions.slice(0, -1)
                              : component.questions;
      updateComponent(component.id, {questions: updatedQuestions, style: {...component.style, height:'min-content'}});
    }

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
          <button onClick={addQuestion}>문항 추가</button>
          <button onClick={removeQuestion}>문항 제거</button>

        </div>
    );
}

export default QnaOption