import React, { useRef } from 'react';
import './TextComponent.css';

function TextComponent({ 
  id, 
  content, 
  style, 
  updateComponent, 
  setSelectedComponent, 
  contentPageRef 
}) {
  const textRef = useRef(null);
  const type = 'text';


  const handleChange = (e) => {
    updateComponent(id, { content: e.target.value });
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    const textElement = textRef.current;
    const rect = textElement.getBoundingClientRect();
    const isBorderClick =
      e.clientX < rect.left + 5 ||
      e.clientX > rect.right - 5 ||
      e.clientY < rect.top + 5 ||
      e.clientY > rect.bottom - 5;

    if (!isBorderClick) return;

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (moveEvent) => {
      const contentPage = contentPageRef.current;
      const contentPageRect = contentPage.getBoundingClientRect();
      const newLeft = Math.max(contentPageRect.left, Math.min(moveEvent.clientX - offsetX, contentPageRect.right - textElement.offsetWidth));
      const newTop = Math.max(contentPageRect.top, Math.min(moveEvent.clientY - offsetY, contentPageRect.bottom - textElement.offsetHeight));

      updateComponent(id, {
        style: {
          ...style,
          top: newTop - contentPageRect.top,
          left: newLeft - contentPageRect.left,
        },
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeMouseDown = (e, direction) => {
    e.stopPropagation();
    const textElement = textRef.current;
    const rect = textElement.getBoundingClientRect();
    const contentPage = contentPageRef.current;
    const contentPageRect = contentPage.getBoundingClientRect();
    const initialX = e.clientX;
    const initialY = e.clientY;
    const initialWidth = textElement.offsetWidth;
    const initialHeight = textElement.offsetHeight;

    const handleResizeMouseMove = (moveEvent) => {
      let newWidth = initialWidth;
      let newHeight = initialHeight;

      if (direction.includes('right')) {
        newWidth = Math.min(contentPageRect.right - rect.left, Math.max(50, initialWidth + (moveEvent.clientX - initialX)));
      }
      if (direction.includes('bottom')) {
        newHeight = Math.min(contentPageRect.bottom - rect.top, Math.max(50, initialHeight + (moveEvent.clientY - initialY)));
      }

      updateComponent(id, {
        style: {
          ...style,
          width: `${newWidth}px`,
          height: `${newHeight}px`
        }
      });
    };

    const handleResizeMouseUp = () => {
      document.removeEventListener('mousemove', handleResizeMouseMove);
      document.removeEventListener('mouseup', handleResizeMouseUp);
    };

    document.addEventListener('mousemove', handleResizeMouseMove);
    document.addEventListener('mouseup', handleResizeMouseUp);
  };

  const handleClick = () => {
    setSelectedComponent({ id, type, content, style });
  };

  return (
    <div
      ref={textRef}
      className="text-component"
      style={{ ...style }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <textarea
        placeholder={content}
        onChange={handleChange}
        style={{ fontSize: style.fontSize, color: style.color, textAlign: style.textAlign, fontWeight: style.fontWeight }}
      />
      <div
        className="resize-handle bottom-right"
        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
      />
    </div>
  );
}

export default TextComponent;