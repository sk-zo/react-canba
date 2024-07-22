import React from 'react';
import './ComponentOption.css';

function ComponentOption({ 
  component, 
  updateComponent,
  deleteComponent
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

  const handleDeleteComponent = (e) => {
    deleteComponent(component.id);
  }

  return (
    <div className="component-option">
      <h3>Component Options</h3>
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
      <div>
        <button onClick={handleDeleteComponent}>Delete</button>
      </div>
    </div>
  );
}

export default ComponentOption;
