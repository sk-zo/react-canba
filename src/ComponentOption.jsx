import React from 'react';
import OptionWrapper from './options/OptionWrapper';
import './ComponentOption.css';

function ComponentOption({ 
  component, 
  updateComponent,
  deleteComponent
}) {
  console.log("ComponentOption's component:", component);
  const handleDeleteComponent = (e) => {
    deleteComponent(component.id);
  }

  return (
    <div className="component-option">
      <h3>Component Options</h3>
      <OptionWrapper
        component={component}
        updateComponent={updateComponent}
      />
      
      <div>
        <button onClick={handleDeleteComponent}>Delete</button>
      </div>
    </div>
  );
}

export default ComponentOption;
