import React from "react";

function InfoOption({component, updateComponent}) {
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

    const handleItemTitleChange = (e, index) => {
        const updatedItems = component.items.map((item, i) =>
            i === index ? { ...item, title: e.target.value } : item
        );
        updateComponent(component.id, { items: updatedItems });
    };

    const handleItemContentChange = (e, index) => {
        const updatedItems = component.items.map((item, i) =>
            i === index ? { ...item, content: e.target.value } : item
        );
        updateComponent(component.id, { items: updatedItems });
    };

    const addItem = () => {
        const updatedItems = [...component.items, {title: '내용을 입력해주세요.', content: '설명을 입력해주세요.', isSelected: false}];
        updateComponent(component.id, {items: updatedItems, style: {...component.style, height:'min-content'}});
    }

    const removeItem = () => {
        const updatedItems = component.items.length > 1 
                            ? component.items.slice(0, -1)
                            : component.items;
        updateComponent(component.id, {items: updatedItems, style: {...component.style, height:'min-content'}});
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
                <input 
                    type="color"
                    value={component.style.color}
                    onChange={handleFontColorChange}
                />
            </div>
            <div className="tpyeA">
            <span className="option-title">선택 항목 색상 : &nbsp;</span>
                <input 
                    type="color"
                    value={component.style.backgroundColor}
                    onChange={handleBackgroundColorChange}
                />
            </div>
            <button onClick={addItem}  className="add-Button">항목 추가</button>
            <button onClick={removeItem} className="remove-Button">항목 제거</button>
            <div className="tpyeA">
            <span className="option-title">항목 &nbsp;</span>
                {component.items.map((item, index) => (
                    <div style={{marginTop: '10px', display : "grid"}}>
                        <input 
                            type="text"
                            className="inputField-info" 
                            placeholder={item.title}
                            onChange={(e) => handleItemTitleChange(e, index)}
                        />
                        <input 
                            type="text" 
                            className="inputField-info"
                            placeholder={item.content}
                            onChange={(e) => handleItemContentChange(e, index)}
                        />
                    </div>
                ))}
            </div>
            
            

        </div>
    )
}

export default InfoOption;