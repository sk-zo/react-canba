import React, { useRef, useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TextComponent from './TextComponent';
import './ContentMain.css';

const ItemType = {
  PAGE: 'page',
};

function DraggablePage({ 
  page, 
  index, 
  session,
  movePage, 
  renamePage,
  copyPage,
  deletePage,
  selectedPage, 
  setSelectedPage,
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

function ContentMain({ 
  sessions, 
  selectedSession, 
  addPage,
  renamePage,
  copyPage,
  deletePage, 
  setSelectedPage, 
  selectedPage,
  updateComponent, 
  setSelectedComponent,
  movePage
 }) {
  const [isPagePopupOpen, setIsPagePopupOpen] = useState(false);
  const [pageName, setPageName] = useState('');
  const [pageMenuOpen, setPageMenuOpen] = useState(null);
  const contentPageRef = useRef(null);
  const session = sessions.find((session) => session.id === selectedSession);
  const pages = session ? session.pages : [];
  

  const handleAddPage = () => {
    setIsPagePopupOpen(true);
  }

  const handlePagePopupConfirm = () => {
    if (pageName.trim()) {
      addPage(pageName.trim());
      setPageName('');
      setIsPagePopupOpen(false);
    }
  };

  const handlePagePopupCancel = () => {
    setPageName('');
    setIsPagePopupOpen(false);
  };

  return (
    <div className='content-box'>
      {session != null && (
      <DndProvider backend={HTML5Backend}>
        <div className='content-header'>
          <div className='page-box'>
            <ul className='page-box-ul'>
              {session != null && pages.length > 0 ? (
                  pages.map((page, index) => (
                    <DraggablePage
                      key={page.id}
                      page={page}
                      index={index}
                      session={session}
                      movePage={movePage}
                      renamePage={renamePage}
                      copyPage={copyPage}
                      deletePage={deletePage}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                      isPageMenuOpen={pageMenuOpen === page.id}
                      setPageMenuOpen={setPageMenuOpen}
                    />
                  )) 
              ) : 
              (
                <li className='page-box-li'>페이지가 등록되지 않았습니다</li>
              )}
            </ul>
            <span 
              className='add-page-button'
              onClick={handleAddPage}
            >
                Add Page
            </span>
          </div>
        </div>
      </DndProvider>
      )}

      {selectedPage != null && pages.find(page => page.id === selectedPage) && (
        <div className="content-page" ref={contentPageRef}>
          {pages.find(page => page.id === selectedPage).components.map((component) => (
            component !== null && (
              <TextComponent
                key={component.id}
                id={component.id}
                content={component.content}
                style={component.style}
                updateComponent={updateComponent}
                setSelectedComponent={setSelectedComponent}
                contentPageRef={contentPageRef}
              />
            )
          ))}
        </div>
      )}
      
      {isPagePopupOpen && (
      <div className='page-popup'>
        <div className='page-popup-content'>
          <div className='page-popup-head'>
            <h3>페이지 생성</h3>
          </div>
          <div className='page-popup-body'>
            <input 
              type="text"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder='페이지명 입력'
            />
          </div>
          <div className='page-popup-tail'>
            <button onClick={handlePagePopupConfirm}>생성</button>
            <button onClick={handlePagePopupCancel}>취소</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default ContentMain;
