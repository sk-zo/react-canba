import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ContentPage from './ContentPage';
import ComponentOption from './ComponentOption';
import './App.css';

function App() {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const addTextComponent = () => {
    const newComponent = {
      id: components.length,
      type: 'text',
      content: 'Edit me',
      style: {
        fontSize: '16px',
        color: '#000000',
        top: 100,
        left: 100,
      },
    };
    setComponents([...components, newComponent]);
  };

  const updateComponent = (id, newProperties) => {
    const updatedComponents = components.map((component) =>
      component.id === id ? { ...component, ...newProperties } : component
    );
    setComponents(updatedComponents);
  };

  return (
    <div className="app">
      <Sidebar addTextComponent={addTextComponent} />
      <ContentPage
        components={components}
        updateComponent={updateComponent}
        setSelectedComponent={setSelectedComponent}
      />
      {selectedComponent && (
        <ComponentOption
          component={selectedComponent}
          updateComponent={updateComponent}
        />
      )}
    </div>
  );
}

export default App;
