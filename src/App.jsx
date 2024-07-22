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

  const addSesssion = (sessionName) => {
    const newSession = {
      id: Date.now(),
      name: sessionName,
      order: sessions.length,
      pages: []
    };
    setSessions([...sessions, newSession]);
    setSelectedSession(newSession.id);
    setSelectedPage(null);
  };

  
  const renameSession = (sessionId, sessionName) => {
    const updatedSessions = sessions.map(session =>
      session.id === sessionId
      ? { ...session, name: sessionName}
      : session
    );
    setSessions(updatedSessions);
  }

  const copySession = (sessionId) => {
    const sessionToCopy = sessions.find(session => session.id === sessionId);
    if (!sessionToCopy) return;

    const copiedPages = sessionToCopy.pages.map(page => ({
      ...page,
      id: Date.now() + Math.random(),
      components: page.components.map(component => ({
        ...component,
        id: Date.now() + Math.random(),
      }))
    }));

    const copiedSession = {
      ...sessionToCopy,
      id: Date.now(),
      name: `${sessionToCopy.name} (Copy)`,
      order: sessions.length,
      pages: copiedPages
    };

    setSessions([...sessions, copiedSession]);
  };

  const deleteSession = (sessionId) => {
    const updatedSessions = sessions.filter(session => session.id !== sessionId)
      .map((session, index) => ({
        ...session,
        order: index,
      }));
    

    setSessions(updatedSessions);

    if (selectedSession === sessionId) {
      setSelectedSession(null);
      setSelectedPage(null);
      setSelectedComponent(null);
      console.log(selectedPage);
    }

  }

  const handleSetSelectedSession = (sessionId) => {
    setSelectedSession(sessionId);
    const session = sessions.find((session) => session.id === sessionId);
    if (session && session.pages.length > 0) {
      setSelectedPage(session.pages[0].id);
    } else {
      setSelectedPage(null);
    }
    setSelectedComponent(null);
  };

  const moveSession = (fromIndex, toIndex) => {
    const updatedSessions = [...sessions];
    const movedSession = updatedSessions.splice(fromIndex, 1)[0];
    updatedSessions.splice(toIndex, 0, movedSession);

    updatedSessions.forEach((session, index) => {
      session.order = index;
    });

    setSessions(updatedSessions);
  };


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
          addSession={addSesssion}
          renameSession={renameSession}
          copySession={copySession}
          deleteSession={deleteSession}
          selectedSession={selectedSession}
          handleSetSelectedSession={handleSetSelectedSession}
          moveSession={moveSession}
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
