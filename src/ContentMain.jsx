import React, { useRef, useState } from 'react';
import TextComponent from './TextComponent';
import './ContentMain.css';

function ContentMain({ 
  sessions, 
  selectedSession, 
  addPage, 
  setSelectedPage, 
  selectedPage,
  updateComponent, 
  setSelectedComponent
 }) {
  const [isPagePoupOpen, setIsPagePopupOpen] = useState(false);
  const [pageName, setPageName] = useState('');
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
        <div className='content-header'>
          <div className='page-box'>
            <ul className='page-box-ul'>
              {session != null && pages.length > 0 ? (
                  pages.map((page) => (
                    <li 
                      className={`page-box-li ${selectedPage === page.id ? 'selected' : ''}`}
                      key={page.id} 
                      onClick={() => setSelectedPage(page.id)}
                    >
                      {page.name}
                    </li>
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
      )}

      {selectedPage != null && (
        <div className="content-page" ref={contentPageRef}>
          {pages[selectedPage].components.map((component) => (
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
      
      {isPagePoupOpen && (
      <div className='popup'>
        <div className='popup-content'>
          <h3>페이지 생성</h3>
          <input 
            type="text"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            placeholder='페이지명 입력'
          />
          <button onClick={handlePagePopupConfirm}>생성</button>
          <button onClick={handlePagePopupCancel}>취소</button>
        </div>
      </div>
      )}
    </div>
  );
}

export default ContentMain;
