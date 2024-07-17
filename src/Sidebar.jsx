import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ 
  addTextComponent, 
  sessions, 
  selectedSession,
  addSession, 
  handleSetSelectedSession 
}) {
  const [isSessionPopupOpen, setIsSessionPopupOpen] = useState(false);
  const [sessionName, setSessionName] = useState('');

  const handleAddSession = () => {
    setIsSessionPopupOpen(true);
  };

  const handleSessionPopupConfirm = () => {
    if (sessionName.trim()) {
      addSession(sessionName.trim());
      setSessionName('');
      setIsSessionPopupOpen(false);
    }
  };

  const handleSessionPopupCancel = () => {
    setSessionName('');
    setIsSessionPopupOpen(false);
  };

  return (
    <div className="sidebar">
      <div className='session-box'>
        <ul className='session-box-ul'>
          {sessions.map((session) => (
            <li 
            className={`session-box-li ${selectedSession === session.id ? 'selected' : ''}`}
            key={session.id} 
              onClick={() => handleSetSelectedSession(session.id)}
            >
              {session.name}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleAddSession}>Add Session</button>
      {isSessionPopupOpen && (
        <div className='popup'>
          <div className='popup-content'>
            <h3>세션 생성</h3>
            <input 
              type="text" 
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder='세션명 입력'
            />
            <button onClick={handleSessionPopupConfirm}>생성</button>
            <button onClick={handleSessionPopupCancel}>취소</button>
          </div>
        </div>
      )}
      <button onClick={addTextComponent}>Add Text</button>
    </div>
  );
}

export default Sidebar;
