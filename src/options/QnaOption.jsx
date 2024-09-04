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
            <input type="color" value={component.style.color} onChange={handleColorChange} />
          </div>
          <button onClick={addQuestion} className="add-Button">문항 추가 + </button>
          <button onClick={removeQuestion} className="remove-Button">문항 제거 - </button>

        </div>
    );
}

export default QnaOption