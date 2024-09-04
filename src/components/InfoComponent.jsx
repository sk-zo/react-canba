import React, { useRef } from "react";
import "./InfoComponent.css";

function InfoComponent({
    id,
    items,
    style,
    updateComponent,
    setSelectedComponent,
    contentPageRef
}) {
    const infoRef = useRef(null);
    const type = "info";

    const handleSelectItem = (index) => {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, isSelected: !item.isSelected } : item
        );
        updateComponent(id, { items: updatedItems });
    };

    const handleMouseDown = (e) => {
        e.stopPropagation();
        const infoElement = infoRef.current;
        const rect = infoElement.getBoundingClientRect();
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
            const newLeft = Math.max(contentPageRect.left,
                Math.min(moveEvent.clientX - offsetX, contentPageRect.right - infoElement.offsetWidth));
            const newTop = Math.max(contentPageRect.top,
                Math.min(moveEvent.clientY - offsetY, contentPageRect.bottom - infoElement.offsetHeight));
            
            updateComponent(id, {
                style: {
                    ...style,
                    top: newTop - contentPageRect.top,
                    left: newLeft - contentPageRect.left,
                }
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
        const infoElement = infoRef.current;
        const rect = infoElement.getBoundingClientRect();
        const contentPage = contentPageRef.current;
        const contentPageRect = contentPage.getBoundingClientRect();
        const initialX = e.clientX;
        const initialY = e.clientY;
        const initialWidth = infoElement.offsetWidth;
        const initialHeight = infoElement.offsetHeight;
    
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
        setSelectedComponent({id, type, items, style});
    };

    return (
        <div
            ref={infoRef}
            className="info-component"
            style={{top: style.top, left: style.left, width: style.width, height: style.height }}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
        >
            {items.map((item, index) => (
                <div
                    key={index}
                    className="info-sub-component"
                    style={{
                        backgroundColor: item.isSelected ? style.backgroundColor : 'transparent'
                    }}
                    onClick={() => handleSelectItem(index)}
                >
                    <span style={{fontSize: style.fontSize, color: style.color}}>{item.title}</span>
                    {item.isSelected && (
                    <div>
                        <span style={{fontSize: style.fontSize, color: style.color}}>{item.content}</span>
                    </div>
                    )}    
                </div>
            ))}

            <div
                className="resize-handle bottom-right"
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
            />
        </div>
    );
}

export default InfoComponent;
