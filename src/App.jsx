import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ContentMain from './ContentMain';
import ComponentOption from './ComponentOption';
import './App.css';

function App() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const addSesssion = (sessionName) => {
    const newSession = {
      id: sessions.length,
      name: sessionName,
      pages: []
    };
    setSessions([...sessions, newSession]);
    setSelectedSession(newSession.id);
    setSelectedPage(null);
  };

  const addPage = (pageName) => {
    const newPage = {
      id: sessions[selectedSession].pages.length,
      name: pageName,
      components: []
    };
    const updatedSessions = sessions.map((session) =>
      session.id === selectedSession
        ? { ...session, pages: [...session.pages, newPage]}
        : session
    );
    setSessions(updatedSessions);
    setSelectedPage(newPage.id);
  }


  const addTextComponent = () => {
    const newComponent = {
      id: sessions[selectedSession].pages[selectedPage].components.length,
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

  const handleSetSelectedSession = (sessionId) => {
    setSelectedSession(sessionId);
    const session = sessions.find((session) => session.id === sessionId);
    if (session && session.pages.length > 0) {
      setSelectedPage(session.pages[0].id);
    } else {
      setSelectedPage(null);
    }
  };

  return (
    <div className="app">
      <Header/>
      <div className='main-container'>
        <Sidebar 
          sessions={sessions}
          addSession={addSesssion}
          selectedSession={selectedSession}
          handleSetSelectedSession={handleSetSelectedSession}
          addTextComponent={addTextComponent}
        />
        <ContentMain
          sessions={sessions}
          selectedSession={selectedSession}
          addPage={addPage}
          setSelectedPage={setSelectedPage}
          selectedPage={selectedPage}
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
    </div>
  );
}

export default App;
