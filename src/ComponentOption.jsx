import React, { useContext, useState } from 'react';
import OptionWrapper from './options/OptionWrapper';
import './ComponentOption.css';
import { AppContext } from './AppContext';

function ComponentOption({ 
  component, 
  updateComponent,
}) {
  console.log("ComponentOption's component:", component);
  const { content, setContent, selectedSession, selectedPage, setSelectedComponent } = useContext(AppContext);
  const [isDeleteExistComponentPopupOpen, setIsDeleteExistComponentPopupOpen] = useState(false);

  const handleDeleteExistComponent = () => {
    setIsDeleteExistComponentPopupOpen(true);
  }

  const handleDeleteExistComponentConfirm = () => {
    deleteExistComponent(content.id, component.id);
    setIsDeleteExistComponentPopupOpen(false);
  }

  const deleteExistComponent = (contentId, componentId) => {
    fetch(`http://localhost:8080/api/delete-component/${contentId}/${componentId}`, {
      method: 'GET'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('reponse not ok: delete exist component');
      }
      return response.json();
    })
    .then(data => {
      console.log("success delete exist component");
      setContent(data);
      setSelectedComponent(null);
    })
    .catch(error => {
      console.error('error delete exist component', error);
    })
  }

  const handleDeleteExistComponentCancel = () => {
    setIsDeleteExistComponentPopupOpen(false);
  }

  const handleDeleteComponent = (e) => {
    deleteComponent(component.id);
  }

  const deleteComponent = (componentId) => {
    fetch(`http://localhost:8080/api/exist-component/${componentId}`, {
      method: 'GET'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('response not ok: check exist component');
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        console.log('Component exists');
        handleDeleteExistComponent();
      } else {
        console.log('Component does not exist');
        setContent(prevContent => ({
          ...prevContent,
          sessions: prevContent.sessions.map(session => 
              session.id === selectedSession ?
              {
                ...session,
                pages: session.pages.map(page =>
                  page.id === selectedPage ?
                  {
                    ...page,
                    components: page.components.filter((component) => component.id !== componentId)
                  } : page
                ), 
              } : session
            )
          })
        );
        setSelectedComponent(null);
      }
    })
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
      {isDeleteExistComponentPopupOpen && (
        <div className='component-popup'>
          <div className='component-popup-content'>
            <h3>컴포넌트를 삭제하시겠습니까?</h3>
            <div className='page-popup-tail'>
              <button onClick={handleDeleteExistComponentConfirm}>삭제</button>
              <button onClick={handleDeleteExistComponentCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentOption;
