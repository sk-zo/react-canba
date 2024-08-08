import React, { useContext, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AppContext } from './AppContext';

const ItemType = {
    SESSION: 'session',
  };
  
function DraggableSession({ 
    session, 
    index, 
    isSessionMenuOpen,
    setSessionMenuOpen
    }) {
    const { content, setContent, selectedSession, setSelectedSession, 
        setSelectedPage, setSelectedComponent} = useContext(AppContext);
    const ref = React.useRef(null);

    const handleSetSelectedSession = (sessionId) => {
        setSelectedSession(sessionId);
        const session = content.sessions.find((session) => session.id === sessionId);
        if (session && session.pages.length > 0) {
          setSelectedPage(session.pages[0].id);
        } else {
          setSelectedPage(null);
        }
        setSelectedComponent(null);
    };

    const renameSession = (sessionId, updateSessionName) => {
        if (updateSessionName.trim()) {
            const formData = new FormData();
            formData.append("sessionId", sessionId);
            formData.append("updateSessionName", updateSessionName);

            fetch('http://localhost:8080/api/rename-content-session', {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('response not ok: rename session name');
                }
                return response.json();
            })
            .then(data => {
                setContent(data);
            })
            .catch(error => {
                console.error('error rename session name:', error);
            })
        }
    };
    
    const copySession = (sessionId) => {
        const formData = new FormData();
        formData.append("sessionId", sessionId);

        fetch('http://localhost:8080/api/copy-content-session', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("response not ok: copy content session");
            }
            return response.json();
        })
        .then(data => {
            setContent(data);
        })
    };

    const deleteSession = (sessionId) => {
        const formData = new FormData();
        formData.append("sessionId", sessionId);

        fetch('http://localhost:8080/api/delete-content-session', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('response not ok: delte content session');
            }
            return response.json();
        })
        .then(data => {
            setContent(data);
            if (selectedSession === sessionId) {
                setSelectedSession(null);
                setSelectedPage(null);
                setSelectedComponent(null);
            }
        })
        .catch(error => {
            console.error('error delete content session:', error);
        })
    };

    const moveSession = (fromIndex, toIndex) => {
        const updatedSessions = [...content.sessions];
        const movedSession = updatedSessions.splice(fromIndex, 1)[0];
        updatedSessions.splice(toIndex, 0, movedSession);

        updatedSessions.forEach((session, index) => {
            session.order = index;
        });

        setContent(prevContent => ({
            ...prevContent,
            sessions: updatedSessions
        }));
    };

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

export default DraggableSession;