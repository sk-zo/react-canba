import React, { useState, useEffect, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableSession from './DraggableSession';
import './Sidebar.css';
import { AppContext } from './AppContext';


function Sidebar() {
  const { 
    sessions, 
    setSessions,
    setSelectedSession,
    setSelectedPage,
  } = useContext(AppContext);
  const [isSessionPopupOpen, setIsSessionPopupOpen] = useState(false);
  const [addSessionName, setAddSessionName] = useState('');
  const [sessionMenuOpen, setSessionMenuOpen] = useState(null);


  useEffect(() => {
    const handleClickNoneSessionMenu = (event) => {
      if (!event.target.closest('.session-menu')) {
        setSessionMenuOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickNoneSessionMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickNoneSessionMenu);
    }
  })

  const addSession = (sessionName) => {
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

  const handleAddSession = () => {
    setIsSessionPopupOpen(true);
  };

  const handleSessionPopupConfirm = () => {
    if (addSessionName.trim()) {
      addSession(addSessionName.trim());
      setAddSessionName('');
      setIsSessionPopupOpen(false);
    }
  };

  const handleSessionPopupCancel = () => {
    setAddSessionName('');
    setIsSessionPopupOpen(false);
  };

  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="sidebar">
        <div className='session-box'>
          <ul className='session-box-ul'>
            {sessions.map((session, index) => (
              <DraggableSession
                key={session.id}
                session={session}
                index={index}
                isSessionMenuOpen={sessionMenuOpen === session.id}
                setSessionMenuOpen={setSessionMenuOpen}
              />
            ))}
          </ul>
        </div>
        <button onClick={handleAddSession}>Add Session</button>
        {isSessionPopupOpen && (
          <div className='session-popup'>
            <div className='session-popup-content'>
              <div className='session-popup-head'>
                <h3>세션 생성</h3>
              </div>
              <div className='session-popup-body'>
                <input 
                  type="text" 
                  value={addSessionName}
                  onChange={(e) => setAddSessionName(e.target.value)}
                  placeholder='세션명 입력'
                />
              </div>
              <div className='session-popup-tail'>
                <button onClick={handleSessionPopupConfirm}>생성</button>
                <button onClick={handleSessionPopupCancel}>취소</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default Sidebar;
