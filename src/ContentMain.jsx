import React, { useRef, useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PageEditMenu from './PageEditMenu';
import ComponentOption from './ComponentOption';
import DraggablePage from './DraggablePage';
import ComponentWrapper from './components/ComponentWrapper';
import './ContentMain.css';


function ContentMain({ 
  sessions, 
  selectedSession, 
  selectedPage,
  selectedComponent,
  setSessions,
  setSelectedPage, 
  setSelectedComponent,
 }) {
  const [isPagePopupOpen, setIsPagePopupOpen] = useState(false);
  const [pageName, setPageName] = useState('');
  const [pageMenuOpen, setPageMenuOpen] = useState(null);
  const contentPageRef = useRef(null);
  const session = sessions.find((session) => session.id === selectedSession);
  const pages = session ? session.pages : [];
  const page = pages.find(page => page.id === selectedPage);
  const components = page ? page.components : [];
  const component = selectedComponent ? components.find(component => component.id === selectedComponent.id) : null;
  const backgroundImage = page?.backgroundImage || '';

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


  const addPage = (pageName) => {
    const session = sessions.find((session) => session.id === selectedSession);
    const newPage = {
      id: Date.now(),
      name: pageName,
      order: session.pages.length,
      components: [],
      backgroundImage: ''
    };

    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: [...session.pages, newPage],
        } : session
      )
    );

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

  const changePageBackgroundImage = (imageUrl) => {
    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
            page.id === selectedPage ?
            {
              ...page,
              backgroundImage: imageUrl,
            } : page
          ),
        } : session
      )
    );
  };

  const addTextComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'text',
      content: 'Edit me',
      style: {
        fontSize: '16px',
        fontWeight: 'normal',
        color: '#000000',
        textAlign: 'left',
        top: 100,
        left: 100,
        width: '200px',
        height: '50px',
      },
    };

    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
            page.id === selectedPage ?
            {
              ...page,
              components: [...page.components, newComponent],
            } : page
          ),
        } : session
      )
    );
    setSelectedComponent(newComponent);
  };

  const addImageComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'image',
      src: 'none',
      style: {
        top: 100,
        left: 100,
        width: '200px',
        height: '50px',
      }
    };

    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
            page.id === selectedPage ?
            {
              ...page,
              components: [...page.components, newComponent],
            } : page
          ),
        } : session
      )
    );
    setSelectedComponent(newComponent);
  };

  const addAudioComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'audio',
      src: 'none',
      style: {
        top: 100,
        left: 100,
        width: '300px',
        height: '50px'
      }
    };

    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
            page.id === selectedPage
            ? {
              ...page,
              components: [...page.components, newComponent],
            } : page
          ),
        } : session
      )
    );
    setSelectedComponent(newComponent)
  }

  const addVideoComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'video',
      src: 'none',
      style: {
        top: 100,
        left: 100,
        width: '400px',
        height: '200px'
      }
    };

    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
            page.id === selectedPage ?
            {
              ...page,
              components: [...page.components, newComponent],
            } : page
          ),
        } : session
      )
    );
    setSelectedComponent(newComponent);
  }

  const addFileComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: "file",
      src: "",
      style: {
        top: 100,
        left: 100,
        width: '200px',
        height: '50px'
      }
    };

    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
            page.id === selectedPage ?
            {
              ...page,
              components: [...page.components, newComponent],
            } : page
          ),
        } : session
      )
    );
    setSelectedComponent(newComponent);
  }

  const addQnaComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'qna',
      questions: ['질문을 입력하세요'],
      style: {
        fontSize: '16px',
        color: '#000000',
        backgroundColor: 'transparent',
        top: 100,
        left: 100,
        width: '400px',
        height: '200px',
      },
    };

    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
            page.id === selectedPage ?
            {
              ...page,
              components: [...page.components, newComponent],
            } : page
          ),
        } : session
      )
    );
    setSelectedComponent(newComponent);
  };

  const addVotingComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'voting',
      items: [{content: '내용을 입력해주세요.', isSelected: false}],
      style: {
        fontSize: '16px',
        color: '#000000',
        top: 100,
        left: 100,
        width: '400px',
        height: 'min-content',
      },
    };

    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
            page.id === selectedPage ?
            {
              ...page,
              components: [...page.components, newComponent],
            } : page
          ),
        } : session
      )
    );
    setSelectedComponent(newComponent);
  }

  const updateComponent = (componentId, newProperties) => {
    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
            page.id === selectedPage ?
            {
              ...page,
              components: page.components.map(component =>
                component.id === componentId ?
                { ...component, ...newProperties } : component
              ),
            } : page
          ),
        } : session
      )
    );
  };

  const deleteComponent = (componentId) => {
    setSessions(prevSessions =>
      prevSessions.map(session => 
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
            page.id === selectedPage ?
            {
              ...page,
              components: page.components.filter((component) => component.id !== componentId)
            } : page
          ),
        } : session
      )
    );
    setSelectedComponent(null);
  }

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
        {selectedPage !== null && page && (
          <div 
            className="content-page" 
            ref={contentPageRef}
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            {page.components.map((component) => (
              <ComponentWrapper
                key={component.id}
                component={component}
                updateComponent={updateComponent}
                setSelectedComponent={setSelectedComponent}
                contentPageRef={contentPageRef}
              />
            ))}
          </div>
          
        )}
        {page && !selectedComponent && (
          <PageEditMenu
            addTextComponent={addTextComponent}
            addImageComponent={addImageComponent}
            addAudioComponent={addAudioComponent}
            addVideoComponent={addVideoComponent}
            addFileComponent={addFileComponent}
            addQnaComponent={addQnaComponent}
            addVotingComponent={addVotingComponent}
            changePageBackgroundImage={changePageBackgroundImage}
          />
        )}
        {selectedComponent && (
          <ComponentOption
            component={component}
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
