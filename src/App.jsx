import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ContentMain from './ContentMain';
import { AppContext } from './AppContext';
import './App.css';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const contentId = params.get('id');
    if (contentId) {
      fetch(`http://localhost:8080/api/content/${contentId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Fetched content:", data);
          setContent(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching content:', error)
          setIsLoading(false);
        });
    }
  }, [location.search]);

  useEffect(() => {
    console.log("content updated:", content);
    
  }, [content]);
  

  useEffect(() => {
    const handleClickNoneContent = (event) => {
      if (!event.target.closest('.component-option')) {
        setSelectedComponent(null);
      }
    };

    document.addEventListener('mousedown', handleClickNoneContent);
    return () => {
      document.removeEventListener('mousedown', handleClickNoneContent);
    }
  }, []);

  useEffect(() => {
    console.log('selectedPage updated:', selectedPage);
  }, [selectedPage]);

  
  return (
    <div className="app">
      <Header/>
      <div className='main-container'>
        <AppContext.Provider value={{
          content, setContent,
          selectedSession, setSelectedSession,
          selectedPage, setSelectedPage,
          selectedComponent, setSelectedComponent,
          isLoading
        }}>
          <Sidebar/>
          <ContentMain/>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
