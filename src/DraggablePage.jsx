import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = {
    PAGE: 'page',
  };
  
function DraggablePage({ 
    sessions,
    session,
    page, 
    index, 
    setSessions,
    selectedSession,
    selectedPage, 
    setSelectedPage,
    setSelectedComponent,
    isPageMenuOpen,
    setPageMenuOpen
  }) {

    
    const ref = React.useRef(null);
    const [, drop] = useDrop({
      accept: ItemType.PAGE,
      hover(item) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        movePage(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    });
  
    const [{ isDragging }, drag] = useDrag({
      type: ItemType.PAGE,
      item: { type: ItemType.PAGE, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    drag(drop(ref));
  
    const [isRenamePageMenuOpen, setIsRenamePageMenuOpen] = useState(false);
    const [renamePageName, setRenamePageName] = useState('');
    const [isCopyPageMenuOpen, setIsCopyPageMenuOpen] = useState(false);
    const [isDeletePageMenuOpen, setIsDeletePageMenuOpen] = useState(false);
    
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


    // page toggle menu
    const handleTogglePageMenu = () => {
      setPageMenuOpen(isPageMenuOpen ? null : page.id);
    };
  
    const handleClosePageMenu = () => {
      setPageMenuOpen(null);
    };
  
  
    // page rename
    const handleRenamePageMenu = () => {
      setIsRenamePageMenuOpen(true);
    };
  
    const handleRenamePageConfirm = () => {
      if (renamePageName.trim()) {
        renamePage(session.id, page.id, renamePageName.trim());
        setIsRenamePageMenuOpen(false);
        setPageMenuOpen(null);
      }
    }
  
    const handleRenamePageCancel = () => {
      setIsRenamePageMenuOpen(false);
    }
  
    
    // page copy
    const handleCopyPageMenu = () => {
      setIsCopyPageMenuOpen(true);
    }
  
    const handleCopyPageConfirm = () => {
      copyPage(session.id, page.id);
      setIsCopyPageMenuOpen(false);
      setPageMenuOpen(null);
    }
  
    const handleCopyPageCancel = () => {
      setIsCopyPageMenuOpen(false);
    }
  
  
    // page delete
    const handleDeletePageMenu = () => {
      setIsDeletePageMenuOpen(true);
    }
  
    const handleDeletePageConfirm = () => {
      deletePage(session.id, page.id);
      setIsDeletePageMenuOpen(false);
      setPageMenuOpen(null);
    }
  
    const handleDeletePageCancel = () => {
      setIsDeletePageMenuOpen(false);
    }
  
    return (
      <li
        ref={ref}
        className={`page-box-li ${selectedPage === page.id ? 'selected' : ''}`}
        onClick={() => setSelectedPage(page.id)}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {page.name}
        <i className='page-menu-icon' onClick={handleTogglePageMenu}>...</i>
        {isPageMenuOpen && (
          <div className='page-menu'>
            <div className='page-menu-item' onClick={handleRenamePageMenu}>
              페이지 이름 변경
            </div>
            <div className='page-menu-item' onClick={handleCopyPageMenu}>
              페이지 복사
            </div>
            <div className='page-menu-item' onClick={handleDeletePageMenu}>
              페이지 삭제
            </div>
            <div className='page-menu-item' onClick={handleClosePageMenu}>
              닫기
            </div>
          </div>
        )}
        {isRenamePageMenuOpen && (
          <div className='page-popup'>
            <div className='page-popup-content'>
              <h3>페이지 이름을 변경하시겠습니까?</h3>
              <div className='page-popup-body'>
                  <input 
                    type="text" 
                    value={renamePageName}
                    onChange={(e) => setRenamePageName(e.target.value)}
                    placeholder={page.name}
                  />
                </div>
              <div className='page-popup-tail'>
                <button onClick={handleRenamePageConfirm}>확인</button>
                <button onClick={handleRenamePageCancel}>취소</button>
              </div>
            </div>
          </div>
        )}
        {isCopyPageMenuOpen && (
          <div className='page-popup'>
            <div className='page-popup-content'>
              <h3>페이지를 복사하시겠습니까?</h3>
              <div className='page-popup-tail'>
                <button onClick={handleCopyPageConfirm}>확인</button>
                <button onClick={handleCopyPageCancel}>취소</button>
              </div>
            </div>
          </div>
        )}
        {isDeletePageMenuOpen && (
          <div className='page-popup'>
            <div className='page-popup-content'>
              <h3>페이지를 삭제하시겠습니까?</h3>
              <div className='page-popup-tail'>
                <button onClick={handleDeletePageConfirm}>확인</button>
                <button onClick={handleDeletePageCancel}>취소</button>
              </div>
            </div>
          </div>
        )}
      </li>
    );
  }

export default DraggablePage;
