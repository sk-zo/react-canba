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
      updateComponent(component.id, {questions: updatedQuestions});
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

        </div>
    );
}

export default QnaOption