import React from "react";

function QuizOption({component, updateComponent}) {
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
                정답 보기 Color:
                <input 
                    type="color"
                    value={component.style.correctBackgroundColor}
                    onChange={handleCorrectBackgroundColorChange}
                />
            </div>
            <div>
                오답 보기 Color:
                <input 
                    type="color"
                    value={component.style.wrongBackgroundColor}
                    onChange={handleWrongBackgroundColorChange}
                />
            </div>
            <button onClick={additem}>보기 추가</button>
            <div>
            <b>보기 수정</b>
                {component.items.map((item, index) => (
                    <div>
                        <input 
                            type="text" 
                            placeholder={item.text}
                            onChange={(e) => handleItemTextChange(e, index)}
                        />
                        <input 
                            type="text" 
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
            
            <button onClick={removeitem}>보기 제거</button>

        </div>
    )
}

export default QuizOption;