import React, { useRef, useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PageEditMenu from './PageEditMenu';
import ComponentOption from './ComponentOption';
import DraggablePage from './DraggablePage';
import ComponentWrapper from './components/ComponentWrapper';
import './ContentMain.css';
import { AppContext } from './AppContext';


function ContentMain() {
  const { content, setContent, 
    selectedSession, selectedPage, setSelectedPage,
    selectedComponent, setSelectedComponent, isLoading} = useContext(AppContext);
  const [isPagePopupOpen, setIsPagePopupOpen] = useState(false);
  const [pageName, setPageName] = useState('');
  const [pageMenuOpen, setPageMenuOpen] = useState(null);
  const contentPageRef = useRef(null);
  const session = content ? content.sessions.find((session) => session.id === selectedSession) : null;
  const pages = session ? session.pages : null;
  const page = pages ? pages.find(page => page.id === selectedPage) : null;
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
    if (pageName.trim()) {
      const formData = new FormData();
      formData.append("sessionId", selectedSession);
      formData.append("pageName", pageName);

      fetch('http://localhost:8080/api/add-content-page', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("response not ok: add content page");
        }
        return response.json();
      })
      .then(data => {
        console.log("updated content after addPage: ", data);
        setContent(data);
        const tmpPages = data.sessions.find(session => session.id === selectedSession).pages;
        setSelectedPage(tmpPages[tmpPages.length-1].id);
      })
      .catch(error => {
        console.error('error add content page', error);
      })
    };

    const session = content ? content.sessions.find((session) => session.id === selectedSession) : null;
    if (session === null) {
      return;
    }
    const newPage = {
      id: Date.now(),
      name: pageName,
      order: session.pages.length,
      components: [],
      backgroundImage: ''
    };

    setContent(prevContent => ({
      ...prevContent,
      sessions: prevContent.sessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: [...session.pages, newPage],
        } : session
      )
    }));

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

  

  const updateComponent = (componentId, newProperties) => {
    setContent(prevContent => ({
      ...prevContent,
      sessions: prevContent.sessions.map(session => 
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
    }));
  };

  

  if (isLoading || !content) {
    return <div>Loading...</div>;
  }

  return (
    <div className='content-box'>
      {session != null && (
      <DndProvider backend={HTML5Backend}>
        <div className='content-header'>
          <div className='page-box'>
            <ul className='page-box-ul'>
              {pages != null && pages.length > 0 ? (
                  pages.map((page, index) => (
                    <DraggablePage
                      key={page.id}
                      session={session}
                      page={page}
                      index={index}
                      isPageMenuOpen={pageMenuOpen === page.id}
                      setPageMenuOpen={setPageMenuOpen}
                      
                    />
                    
                    
                  ))
                  
              ) : 
              (
                <li></li>
              )}
              <li className='page-add-box' onClick={handleAddPage}>페이지 추가 + </li>
            </ul>
            
          </div>
        </div>
      </DndProvider>
      )}

      <div className='content-main'>
        {selectedPage !== null && page && (
          <motion.div 
            className="content-page"
            key={selectedPage} 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration: 0.8}}
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
            
          </motion.div>
          
        )}
        {page && !selectedComponent && (
          <PageEditMenu content={content}/>
        )}
        {selectedComponent && (
          <ComponentOption
            component={component}
            updateComponent={updateComponent}
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
              class="inputField"
              type="text"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder='페이지명 입력'
            />
          </div>
          <div className='page-popup-tail'>
            <button className='Button' onClick={handlePagePopupConfirm}>생성</button>
            <button className='Button' onClick={handlePagePopupCancel}>취소</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default ContentMain;
