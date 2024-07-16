import React, { useRef, useState, useEffect } from 'react';
import './TextComponent.css';

function TextComponent({ id, content, style, updateComponent, setSelectedComponent, contentPageRef }) {
  const textRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 200, height: 50 });

  useEffect(() => {
    const textElement = textRef.current;
    const handleResize = () => {
      if (textElement) {
        // textElement.style.height = 'auto'; // Reset height to calculate new height
        textElement.style.height = `${textElement.scrollHeight}px`; // Set to scrollHeight for auto-adjusting height
        setDimensions({
          width: textElement.offsetWidth,
          height: textElement.scrollHeight
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [content]);

  const handleChange = (e) => {
    updateComponent(id, { content: e.target.value });
  };

  const handleMouseDown = (e) => {
    const textElement = textRef.current;
    const offsetX = e.clientX - textElement.getBoundingClientRect().left;
    const offsetY = e.clientY - textElement.getBoundingClientRect().top;

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
    const initialX = e.clientX;
    const initialY = e.clientY;
    const initialWidth = textElement.offsetWidth;
    const initialHeight = textElement.offsetHeight;

    const handleResizeMouseMove = (moveEvent) => {
      let newWidth = initialWidth;
      let newHeight = initialHeight;

      if (direction.includes('right')) {
        newWidth = Math.max(50, initialWidth + (moveEvent.clientX - initialX));
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(50, initialHeight + (moveEvent.clientY - initialY));
      }

      setDimensions({ width: newWidth, height: newHeight });
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
    setSelectedComponent({ id, content, style });
  };

  return (
    <div
      ref={textRef}
      className="text-component"
      style={{ ...style, ...dimensions }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <textarea
        value={content}
        onChange={handleChange}
        style={{ fontSize: style.fontSize, color: style.color }}
      />
      <div
        className="resize-handle bottom-right"
        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
      />
    </div>
  );
}

export default TextComponent;
