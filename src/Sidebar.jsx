import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Sidebar.css';

const ItemType = {
  SESSION: 'session',
};

function DraggableSession({ 
  session, 
  index, 
  moveSession,
  renameSession,
  copySession,
  deleteSession,
  selectedSession, 
  handleSetSelectedSession,
  isSessionMenuOpen,
  setSessionMenuOpen
}) {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: ItemType.SESSION,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveSession(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.SESSION,
    item: { type: ItemType.SESSION, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const [isRenameSessionMenuOpen, setIsRenameSessionMenuOpen] = useState(false);
  const [renameSessionName, setRenameSessionName] = useState('');
  const [isCopySessionMenuOpen, setIsCopySessionMenuOpen] = useState(false);
  const [isDeleteSessionMenuOpen, setIsDeleteSessionMenuOpen] = useState(false);

  // session toggle menu
  const handleToggleSessionMenu = () => {
    setSessionMenuOpen(isSessionMenuOpen ? null : session.id);
  };

  const handleCloseSessionMenu = () => {
    setSessionMenuOpen(null);
  };


  // session rename
  const handleRenameSessionMenu = () => {
    setIsRenameSessionMenuOpen(true);
  };

  const handleRenameSessionConfirm = () => {
    if (renameSessionName.trim()) {
      renameSession(session.id, renameSessionName);
      setIsRenameSessionMenuOpen(false);
      setSessionMenuOpen(null);
    }
  };

  const handleRenameSessionCancel = () => {
    setIsRenameSessionMenuOpen(false);
  };


  // session copy
  const handleCopySessionMenu = () => {
    setIsCopySessionMenuOpen(true);
  };

  const handleCopySessionConfirm = () => {
    copySession(session.id);
    setIsCopySessionMenuOpen(false);
    setSessionMenuOpen(null);
  };

  const handleCopySessionCancel = () => {
    setIsCopySessionMenuOpen(false);
  };
  

  // session delete
  const handleDeleteSessionMenu = () => {
    setIsDeleteSessionMenuOpen(true);
  };

  const handleDeleteSessionConfirm = (e) => {
    deleteSession(session.id);
    setIsDeleteSessionMenuOpen(false);
    setSessionMenuOpen(null);
  };

  const handleDeleteSessionCancel = () => {
    setIsDeleteSessionMenuOpen(false);
  };
  

  return (
    <li
      ref={ref}
      className={`session-box-li ${selectedSession === session.id ? 'selected' : ''}`}
      onClick={() => handleSetSelectedSession(session.id)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {session.name}
      <i className='session-menu-icon' onClick={handleToggleSessionMenu}>...</i>
      {isSessionMenuOpen && (
        <div className='session-menu'>
          <div className='session-menu-item' onClick={handleRenameSessionMenu}>
            세션 이름 변경
          </div>
          <div className='session-menu-item' onClick={handleCopySessionMenu}>
            세션 복사
          </div>
          <div className='session-menu-item' onClick={handleDeleteSessionMenu}>
            세션 삭제
          </div>
          <div className='session-menu-item' onClick={handleCloseSessionMenu}>
            닫기
          </div>
        </div>
      )}
      {isRenameSessionMenuOpen && (
        <div className='session-popup'>
          <div className='session-popup-content'>
            <h3>세션 이름을 변경하시겠습니까?</h3>
            <div className='session-popup-body'>
                <input 
                  type="text" 
                  value={renameSessionName}
                  onChange={(e) => setRenameSessionName(e.target.value)}
                  placeholder={session.name}
                />
              </div>
            <div className='session-popup-tail'>
              <button onClick={handleRenameSessionConfirm}>확인</button>
              <button onClick={handleRenameSessionCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
      {isCopySessionMenuOpen && (
        <div className='session-popup'>
          <div className='session-popup-content'>
            <h3>세션을 복사하시겠습니까?</h3>
            <div className='session-popup-tail'>
              <button onClick={handleCopySessionConfirm}>확인</button>
              <button onClick={handleCopySessionCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
      {isDeleteSessionMenuOpen && (
        <div className='session-popup'>
          <div className='session-popup-content'>
            <h3>세션을 삭제하시겠습니까?</h3>
            <div className='session-popup-tail'>
              <button onClick={handleDeleteSessionConfirm}>확인</button>
              <button onClick={handleDeleteSessionCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}



function Sidebar({ 
  addTextComponent, 
  sessions, 
  selectedSession, 
  addSession,
  renameSession,
  copySession,
  deleteSession,
  handleSetSelectedSession, 
  moveSession 
}) {
  const [isSessionPopupOpen, setIsSessionPopupOpen] = useState(false);
  const [addSessionName, setAddSessionName] = useState('');
  const [sessionMenuOpen, setSessionmenuOpen] = useState(null);

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
                moveSession={moveSession}
                renameSession={renameSession}
                copySession={copySession}
                deleteSession={deleteSession}
                selectedSession={selectedSession}
                handleSetSelectedSession={handleSetSelectedSession}
                isSessionMenuOpen={sessionMenuOpen === session.id}
                setSessionMenuOpen={setSessionmenuOpen}
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
        <button onClick={addTextComponent}>Add Text</button>
      </div>
    </DndProvider>
  );
}

export default Sidebar;
