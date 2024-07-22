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

  
  const addPage = (pageName) => {
    const session = sessions.find((session) => session.id === selectedSession);
    console.log(session);
    const newPage = {
      id: Date.now(),
      name: pageName,
      order: session.pages.length,
      components: [],
      backgroundImage: ''
    };
    const updatedSessions = sessions.map((session) =>
      session.id === selectedSession
        ? { ...session, pages: [...session.pages, newPage]}
        : session
    );
    setSessions(updatedSessions);
    setSelectedPage(newPage.id);
  }

  const renamePage = (sessionId, pageId, pageName) => {
    const updatedSessions = sessions.map(session =>
      session.id === sessionId
      ? {
        ...session,
        pages: session.pages.map(page =>
          page.id === pageId ? { ...page, name: pageName } : page
        ),
      }
      : session
    );
    setSessions(updatedSessions);
  };

  const copyPage = (sessionId, pageId) => {
    const sessionToUpdate = sessions.find(session => session.id === sessionId);
    if (!sessionToUpdate) return ;

    const pageToCopy = sessionToUpdate.pages.find(page => page.id === pageId);

    const copiedPage = {
      ...pageToCopy,
      id: Date.now() + Math.random(),
      name: `${pageToCopy.name} (Copy)`,
      order: sessionToUpdate.pages.length,
      components: pageToCopy.components.map(component => ({
        ...component,
        id: Date.now() + Math.random(),
      })),
    };

    const updatedSessions = sessions.map(session =>
      session.id === sessionId
      ? { ...session, pages: [...session.pages, copiedPage]}
      :session
    );

    setSessions(updatedSessions);
  }

  const deletePage = (sessionId, pageId) => {
    const updatedSessions = sessions.map(session =>
      session.id === sessionId
      ? {
        ...session,
        pages: session.pages.filter(page => page.id !== pageId)
        .map((page, index) => ({ ...page, order: index })),
      }
      : session
    );
    setSessions(updatedSessions);
    console.log("deletePage selectedPage:", selectedPage);
    console.log("deletePage pageId:", pageId);
    setSelectedPage(pageId => {
      if (selectedPage === pageId) {
        return null;
      }
      return selectedPage;
      });
      setSelectedComponent(null);
    
    console.log("after deletePage selectedPage:", selectedPage);
  };
  
  const movePage = (fromIndex, toIndex) => {
    const updatedSessions = sessions.map((session) => {
      if (session.id === selectedSession) {
        const updatedPages = [...session.pages];
        const movedPage = updatedPages.splice(fromIndex, 1)[0];
        updatedPages.splice(toIndex, 0, movedPage);

        updatedPages.forEach((page, index) => {
          page.order = index;
        });

        return {
          ...session,
          pages: updatedPages,
        };
      }
      return session;
    });

    setSessions(updatedSessions);
  };


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
          addPage={addPage}
          renamePage={renamePage}
          copyPage={copyPage}
          deletePage={deletePage}
          setSelectedPage={setSelectedPage}
          selectedPage={selectedPage}
          movePage={movePage}
          addTextComponent={addTextComponent}
          selectedComponent={selectedComponent}
          updateComponent={updateComponent}
          deleteComponent={deleteComponent}
          setSelectedComponent={setSelectedComponent}
        />
      </div>
    </div>
  );
}

export default App;
