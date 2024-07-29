import React from "react";

function VotingOption({component, updateComponent}) {
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

    const handleBackgroundColorChange = (e) => {
        updateComponent(component.id, {
            style: {
                ...component.style,
                backgroundColor: e.target.value,
            },
        });
    };

    const handleItemContentChange = (e, index) => {
        const updatedItems = component.items.map((item, i) =>
            i === index ? { ...item, content: e.target.value } : item
        );
        updateComponent(component.id, { items: updatedItems });
    };

    const addItem = () => {
        const updatedItems = [...component.items, {content: '내용을 입력해주세요.', isSelected: false}];
        updateComponent(component.id, {items: updatedItems, style: {...component.style, height:'min-content'}});
    }

    const removeItem = () => {
        const updatedItems = component.items.length > 1 
                            ? component.items.slice(0, -1)
                            : component.items;
        updateComponent(component.id, {items: updatedItems, style: {...component.style, height:'min-content'}});
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
                Font Color:
                <input 
                    type="color"
                    value={component.style.color}
                    onChange={handleFontColorChange}
                />
            </div>
            <div>
                선택 항목 Color:
                <input 
                    type="color"
                    value={component.style.backgroundColor}
                    onChange={handleBackgroundColorChange}
                />
            </div>
            <button onClick={addItem}>항목 추가</button>
            <div>
            <b>항목 수정</b>
                {component.items.map((item, index) => (
                    <div>
                        <input 
                            type="text" 
                            placeholder={item.content}
                            onChange={(e) => handleItemContentChange(e, index)}
                        />
                    </div>
                ))}
            </div>
            
            <button onClick={removeItem}>항목 제거</button>

        </div>
    )

}

export default VotingOption;