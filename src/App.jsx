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
        />
      </div>
    </div>
  );
}

export default App;
