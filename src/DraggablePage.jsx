import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

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

export default DraggablePage;
