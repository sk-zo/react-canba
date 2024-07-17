import React, { useRef, useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TextComponent from './TextComponent';
import './ContentMain.css';

const ItemType = {
  PAGE: 'page',
};

function DraggablePage({ page, index, movePage, selectedPage, setSelectedPage}) {
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

  return (
    <li
      ref={ref}
      className={`page-box-li ${selectedPage === page.id ? 'selected' : ''}`}
      onClick={() => setSelectedPage(page.id)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {page.name}
    </li>
  );
}

function ContentMain({ 
  sessions, 
  selectedSession, 
  addPage, 
  setSelectedPage, 
  selectedPage,
  updateComponent, 
  setSelectedComponent,
  movePage
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
                      movePage={movePage}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
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

      {selectedPage != null && (
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
      
      {isPagePoupOpen && (
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
