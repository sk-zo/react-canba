import React, { useRef } from 'react';
import TextComponent from './TextComponent';
import './ContentPage.css';

function ContentPage({ components, updateComponent, setSelectedComponent }) {
  const contentPageRef = useRef(null);

  return (
    <div className='main-container'>
      <div className="content-page" ref={contentPageRef}>
        {components.map((component) => (
          component.type === 'text' && (
            <TextComponent
              key={component.id}
              id={component.id}
              content={component.content}
              style={component.style}
              updateComponent={updateComponent}
              setSelectedComponent={setSelectedComponent}
              contentPageRef={contentPageRef}
            />
          )
        ))}
      </div>
    </div>
  );
}

export default ContentPage;
