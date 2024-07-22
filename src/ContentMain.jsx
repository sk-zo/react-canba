import React, { useRef, useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PageEditMenu from './PageEditMenu';
import ComponentOption from './ComponentOption';
import DraggablePage from './DraggablePage';
import TextComponent from './TextComponent';
import './ContentMain.css';


function ContentMain({ 
  sessions, 
  selectedSession, 
  selectedPage,
  selectedComponent,
  setSessions,
  setSelectedPage, 
  addTextComponent,
  updateComponent,
  deleteComponent, 
  setSelectedComponent,
 }) {
  const [isPagePopupOpen, setIsPagePopupOpen] = useState(false);
  const [pageName, setPageName] = useState('');
  const [pageMenuOpen, setPageMenuOpen] = useState(null);
  const contentPageRef = useRef(null);
  const session = sessions.find((session) => session.id === selectedSession);
  const pages = session ? session.pages : [];

  useEffect(() => {
    const handleClickNonePageMenu = (event) => {
      if (!event.target.closest('.page-menu')) {
        setPageMenuOpen(null);
      }
    };


    document.addEventListener('mousedown', handleClickNonePageMenu);
      return () => {
        document.removeEventListener('mousedown', handleClickNonePageMenu);
      }
  }, []);


  useEffect(() => {
    console.log("ContentMain selectedPage:", selectedPage);
  }, [selectedPage]);

  const addPage = (pageName) => {
    const session = sessions.find((session) => session.id === selectedSession);
    console.log(session);
    const newPage = {
      id: Date.now(),
      name: pageName,
      order: session.pages.length,
      components: [],
      backgroundImage: ''
    };
    const updatedSessions = sessions.map((session) =>
      session.id === selectedSession
        ? { ...session, pages: [...session.pages, newPage]}
        : session
    );
    setSessions(updatedSessions);
    setSelectedPage(newPage.id);
  }

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
                      sessions={sessions}
                      session={session}
                      page={page}
                      index={index}
                      setSessions={setSessions}
                      selectedSession={selectedSession}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                      setSelectedComponent={setSelectedComponent}
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

      <div className='content-main'>
        {selectedPage !== null && pages.find(page => page.id === selectedPage) && (
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
        {selectedPage !== null && selectedComponent === null && (
          <PageEditMenu
            addTextComponent={addTextComponent}
          />
        )}
        {selectedComponent && (
          <ComponentOption
            component={selectedComponent}
            updateComponent={updateComponent}
            deleteComponent={deleteComponent}
          />
        )}
      </div>

      
      
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
