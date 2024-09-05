import React from "react";

function QuizOption({component, updateComponent}) {
    const handleTextareaFontSizeChange = (e) => {
        updateComponent(component.id, {
            style: {
                ...component.style,
                textareaFontSize: `${e.target.value}px`,
            },
        });
    };
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

    const handleTextareaFontColorChange = (e) => {
        updateComponent(component.id, {
            style: {
                ...component.style,
                textareaColor: e.target.value,
            },
        });
    };

    const handleCorrectBackgroundColorChange = (e) => {
        updateComponent(component.id, {
            style: {
                ...component.style,
                correctBackgroundColor: e.target.value,
            },
        });
    };

    const handleWrongBackgroundColorChange = (e) => {
        updateComponent(component.id, {
            style: {
                ...component.style,
                wrongBackgroundColor: e.target.value,
            }
        })
    };

    const handleItemTextChange = (e, index) => {
        const updatedItems = component.items.map((item, i) =>
            i === index ? { ...item, text: e.target.value } : item
        );
        updateComponent(component.id, { items: updatedItems });
    };

    const handleItemExplanationChange = (e, index) => {
        const updatedItems = component.items.map((item, i) =>
            i === index ? { ...item, explanation: e.target.value } : item
        );
        updateComponent(component.id, { items: updatedItems });
    };

    const handleItemIsCorrectChange = (e, index) => {
        const updatedItems = component.items.map((item, i) =>
            i === index ? { ...item, isCorrect: e.target.checked } : item
        );
        updateComponent(component.id, { items: updatedItems });
    };

    const additem = () => {
        const updatedItems = [...component.items, 
            {
                text: '보기를 입력하세요', 
                explanation: '보기를 선택 시, 보여줄 텍스트를 입력하세요',
                isCorrect: false,
                isSelected: false
            }
        ];
        updateComponent(component.id, { items: updatedItems, style: {...component.style, height:'min-content'} });
    };

    const removeitem = () => {
        const updatedItems = component.items.length > 1 
                            ? component.items.slice(0, -1) 
                            : component.items;

        updateComponent(component.id, { items: updatedItems, style: {...component.style, height:'min-content'}});
    };

    return (
        <div className="tpye">
            <div className="Quiz-option-text-color"> 
                <div className="Quiz-option-textarea">
                    <div className="Quiz-option-textarea-title"> 질문 </div>
                        <div className="tpyeA">     
                            <span className="option-title">글자 크기 : &nbsp;</span>
                            <input 
                                type="number" 
                                className="inputField-option"
                                value={parseInt(component.style.textareaFontSize)}
                                onChange={handleTextareaFontSizeChange}
                            />
                        </div>
                        <div className="tpyeA">
                        <span className="option-title">글자 색상 : &nbsp;</span>
                            
                            <input 
                                type="color"
                                value={component.style.textareaColor}
                                onChange={handleTextareaFontColorChange}
                            />
                        </div>
                       
                    
                </div>
            <div className="Quiz-option-choice">
                <div className="Quiz-option-choice-title"> 보기 </div>
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
                                value={component.style.Textareaolor}
                                onChange={handleFontColorChange}
                            />
                    </div>
                    <div className="tpyeA">
                    <span className="option-title">정답 색상 : &nbsp;</span>
                        <input 
                            type="color"
                            value={component.style.correctBackgroundColor}
                            onChange={handleCorrectBackgroundColorChange}
                        />
                    </div>
                    <div className="tpyeA">
                    <span className="option-title">오답 색상 : &nbsp;</span>
                        <input 
                            type="color"
                            value={component.style.wrongBackgroundColor}
                            onChange={handleWrongBackgroundColorChange}
                        />
                    </div>
                    
                </div>
            </div>
            <button onClick={additem} className="add-Button">보기 추가 + </button>
            <button onClick={removeitem} className="remove-Button">보기 제거 - </button>
            <div className="tpyeA">
            <span className="option-title">보기  &nbsp;</span>
                {component.items.map((item, index) => (
                    <div className="quizDiv">
                        <input 
                            type="text" 
                            className="inputField-quiz"
                            placeholder={item.text}
                            onChange={(e) => handleItemTextChange(e, index)}
                        />
                        <input 
                            type="text" 
                            className="inputField-quiz"
                            placeholder={item.explanation}
                            onChange={(e) => handleItemExplanationChange(e, index)}
                        />
                        <label>
                            정답 여부:
                            <input 
                                type="checkbox" 
                                checked={item.isCorrect}
                                onChange={(e) => handleItemIsCorrectChange(e, index)}
                            />
                        </label>
                        
                    </div>
                ))}
            </div>
            
            

        </div>
    )
}

export default QuizOption;