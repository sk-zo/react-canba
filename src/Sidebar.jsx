import React, { useState, useEffect, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableSession from './DraggableSession';
import './Sidebar.css';
import { AppContext } from './AppContext';
import editIcon from './assets/icons/edit-icon.png';


function Sidebar() {
  const { 
    content,
    setContent,
    setSelectedSession,
    setSelectedPage,
    isLoading
  } = useContext(AppContext);
  const [isContentNamePopupOpen, setIsContentNamePopupOpen] = useState(false);
  const [isSessionPopupOpen, setIsSessionPopupOpen] = useState(false);
  const [addSessionName, setAddSessionName] = useState('');
  const [sessionMenuOpen, setSessionMenuOpen] = useState(null);
  const [updateContentName, setUpdateContentName] = useState('');


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
  });


  const addSession = (sessionName) => {
    if (sessionName.trim()) {
      const formData = new FormData();
      formData.append("contentId", content.id);
      formData.append("sessionName", sessionName.trim());

      fetch('http://localhost:8080/api/add-content-session', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('response not ok: add content session');
        }
        return response.json();
      })
      .then(data => {
        setContent(data);
        setSelectedSession(data.sessions[data.sessions.length-1].id);
        setSelectedPage(null);
      })
      .catch(error => {
        console.error('error add content session:', error);
      })
    }
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

  const handleThumbnailUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('contentId', content.id);
      formData.append('file', file);

      fetch('http://localhost:8080/api/content/thumbnail-upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("response not ok: upload content thumbnail");
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setContent(data);
      })
      .catch(error => {
        console.error('error upload content thumbanil', error);
      })
    }
  }

  const handleUpdateContentName = () => {
    setIsContentNamePopupOpen(true);
  }

  const handleContentNamePopupConfirm = () => {
    if (updateContentName.trim() && updateContentName !== content.name) {
      const formData = new FormData();
      formData.append('contentId', content.id);
      formData.append('updateContentName', updateContentName.trim());

      fetch('http://localhost:8080/api/update-content-name', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('response not ok:update content name');
        }
        return response.json();
      })
      .then(data => {
        setContent(data);
      })
      .catch(error => {
        console.error('Error chagne content name:', error);
      })
    }
    setUpdateContentName('');
    setIsContentNamePopupOpen(false);
  }

  const handleContentNamePopupCancel = () => {
    setUpdateContentName('');
    setIsContentNamePopupOpen(false);
  }

  if (isLoading || !content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sidebar">
      <input
          id='thumbnail-input' 
          type="file" 
          accept='image/*'
          onChange={handleThumbnailUpload}
          style={{display: 'none'}}
        />
      <div className='thumbnail-box'>
        <label htmlFor='thumbnail-input' onClick={handleThumbnailUpload}>
          <img className='thumbnail-img' src={`http://localhost:8080/${content.thumbnail}`} alt="" />
        </label>
      </div>
      <div className='content-name-box'>
        <span>{content.name}</span>
        <img src={editIcon} alt="" onClick={handleUpdateContentName}/>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className='session-box'>
        {content.sessions.length === 0 ? ( 
          <p>세션을 등록해주세요</p>
          ) : (
            <ul className='session-box-ul'>
              
              {content.sessions.map((session, index) => (
                <DraggableSession
                  key={session.id}
                  session={session}
                  index={index}
                  isSessionMenuOpen={sessionMenuOpen === session.id}
                  setSessionMenuOpen={setSessionMenuOpen}
                />
              ))}
            </ul>
          )}
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
      </DndProvider>
      {isContentNamePopupOpen && (
          <div className='session-popup'>
            <div className='session-popup-content'>
              <div className='session-popup-head'>
                <h3>콘텐츠 이름 변경</h3>
              </div>
              <div className='session-popup-body'>
                <input 
                  type="text" 
                  value={updateContentName}
                  onChange={(e) => setUpdateContentName(e.target.value)}
                  placeholder={content.name}
                />
              </div>
              <div className='session-popup-tail'>
                <button onClick={handleContentNamePopupConfirm}>변경</button>
                <button onClick={handleContentNamePopupCancel}>취소</button>
              </div>
            </div>
          </div>
        )}
    </div>

  );
}

export default Sidebar;
