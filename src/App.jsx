import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ContentMain from './ContentMain';
import './App.css';

function App() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  

  useEffect(() => {
    const handleClickNoneContent = (event) => {
      if (!event.target.closest('.text-component') && !event.target.closest('.component-option')) {
        setSelectedComponent(null);
      }
    };

    document.addEventListener('mousedown', handleClickNoneContent);
    return () => {
      document.removeEventListener('mousedown', handleClickNoneContent);
    }
  })

  useEffect(() => {
    console.log('selectedPage updated:', selectedPage);
  }, [selectedPage]);

  
  

  


  const addTextComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'text',
      content: 'Edit me',
      style: {
        fontSize: '16px',
        color: '#000000',
        top: 100,
        left: 100,
      },
    };

    const updatedSessions = sessions.map((session) => {
      if (session.id === selectedSession) {
        return {
          ...session,
          pages: session.pages.map((page) => 
            page.id === selectedPage 
              ? { ...page, components: [...page.components, newComponent]}
              : page
          ),
        };
      } return session;
    });
    setSessions(updatedSessions);
    setSelectedComponent(newComponent);
  };

  const updateComponent = (componentId, newProperties) => {
    const updatedSessions = sessions.map((session) => {
      if (session.id === selectedSession) {
        return {
          ...session,
          pages: session.pages.map((page) => {
            if (page.id === selectedPage) {
              return {
                ...page,
                components: page.components.map((component) =>
                  component.id === componentId 
                    ? { ...component, ...newProperties } : component
                ),
              };
            } return page;
          })
        }
      } return session;
    })
    setSessions(updatedSessions);
  };

  const deleteComponent = (componentId) => {
    const updatedSessions = sessions.map((session) => {
      if (session.id === selectedSession) {
        return {
          ...session,
          pages: session.pages.map((page) => {
            if (page.id === selectedPage) {
              return {
                ...page,
                components: page.components.filter((component) => component.id !== componentId)
              };
            }
            return page;
          }) 
        }
      }
      return session;
    });
    setSessions(updatedSessions);
    setSelectedComponent(null);
  }

  
  return (
    <div className="app">
      <Header/>
      <div className='main-container'>
        <Sidebar 
          sessions={sessions}
          setSessions={setSessions}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          setSelectedPage={setSelectedPage}
          setSelectedComponent={setSelectedComponent}
        />
        <ContentMain
          sessions={sessions}
          selectedSession={selectedSession}
          selectedPage={selectedPage}
          selectedComponent={selectedComponent}
          setSessions={setSessions}
          setSelectedSession={setSelectedSession}
          setSelectedPage={setSelectedPage}
          setSelectedComponent={setSelectedComponent}
          addTextComponent={addTextComponent}
          updateComponent={updateComponent}
          deleteComponent={deleteComponent}
        />
      </div>
    </div>
  );
}

export default App;
