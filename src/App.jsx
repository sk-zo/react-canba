import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ContentMain from './ContentMain';
import { AppContext } from './AppContext';
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
        <AppContext.Provider value={{
          sessions, setSessions,
          selectedSession, setSelectedSession,
          selectedPage, setSelectedPage,
          selectedComponent, setSelectedComponent,
        }}>
          <Sidebar/>
          <ContentMain/>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
