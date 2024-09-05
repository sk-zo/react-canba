import React, { useState } from 'react';
import './input.css';
import styled from 'styled-components';

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

    const handleTextAlignChange = (value) => {
        updateComponent(component.id, {
            style: {
                ...component.style,
                textAlign: value,
            },
        });
    };

    const handleFontWeightChange = (weight) => {
        updateComponent(component.id, {
            style: {
                ...component.style,
                fontWeight: weight,
            }
        });
    };

    const font_position = [
        { text: 'left', value: 'left', img: '/font-position/left.svg' },
        { text: 'center', value: 'center', img: '/font-position/center.svg' },
        { text: 'right', value: 'right', img: '/font-position/right.svg' },
    ];

    const font_weight = [
        { text: 'bold', value: 'bold', img: '/font-weight/bold.svg' },
    ];

    const [selectedFont_position, setSelectedFont_position] = useState(component.style.textAlign || 'left');
    const [selectedFontWeight, setSelectedFontWeight] = useState(component.style.fontWeight || 'normal');

    const onChangeRadio = (value) => {
        setSelectedFont_position(value);
        handleTextAlignChange(value);
    };

    const toggleFontWeight = () => {
        const newWeight = selectedFontWeight === 'bold' ? 'normal' : 'bold';
        setSelectedFontWeight(newWeight);
        handleFontWeightChange(newWeight);
    };

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
                <span className="option-title">글자 색 : &nbsp;</span>
                <input type="color" value={component.style.color} onChange={handleColorChange} />
            </div>
            <RadioWrap>
                <span className="option-title">글자 위치 : &nbsp;</span>
                {
                    font_position.map((position, idx) => (
                        <label key={idx}>
                            <input
                                type='radio'
                                name='font_position'
                                value={position.value}
                                onChange={() => onChangeRadio(position.value)}
                                checked={selectedFont_position === position.value}
                            />
                            <span className='font_position'
                                style={{
                                    border: selectedFont_position === position.value ? '2px solid pink' : '2px solid transparent',
                                    backgroundColor: selectedFont_position === position.value ? 'pink' : 'transparent'
                                }}
                            >
                                <img src={position.img} alt={position.text} style={{ width: '20px', height: '20px' }} />
                            </span>
                        </label>
                    ))
                }
            </RadioWrap>

            <RadioWrap>
                <span className="option-title">글자 굵기 : &nbsp;</span>
                {
                    font_weight.map((weight, idx) => (
                        <label key={idx} onClick={toggleFontWeight}>
                            <span className='font_weight'
                                style={{
                                    border: selectedFontWeight === weight.value ? '2px solid pink' : '2px solid transparent',
                                    backgroundColor: selectedFontWeight === weight.value ? 'pink' : 'transparent',
                                    cursor: 'pointer'
                                }}
                            >
                                <img src={weight.img} alt={weight.text} style={{ width: '20px', height: '20px' }} />
                            </span>
                        </label>
                    ))
                }
            </RadioWrap>
        </div>
    );
}

export default TextOption;

const RadioWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  line-height: 50px;
  height: 50px;

  input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .font_position, .font_weight {
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    background-color: #f8f8f8;
    margin: 4px;
    text-align: center;
    padding: 4px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
