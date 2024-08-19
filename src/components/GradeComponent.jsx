import React, { useRef } from "react";
import "./GradeComponent.css";

function GradeComponent({
    id,
    text,
    grade,
    style,
    updateComponent,
    setSelectedComponent,
    contentPageRef
}) {
    const gradeRef = useRef(null);
    const type = "grade";

    const handleTextChange = (e) => {
        updateComponent(id, { text: e.target.value });
    }

    const handleGradeChange = (i) => {
        updateComponent(id, { grade: i + 1 });
    }

    const handleMouseDown = (e) => {
        e.stopPropagation();
        const gradeElement = gradeRef.current;
        const rect = gradeElement.getBoundingClientRect();
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
                Math.min(moveEvent.clientX - offsetX, contentPageRect.right - gradeElement.offsetWidth));
            const newTop = Math.max(contentPageRect.top, 
                Math.min(moveEvent.clientY - offsetY, contentPageRect.bottom - gradeElement.offsetHeight));

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
        const gradeElement = gradeRef.current;
        const rect = gradeElement.getBoundingClientRect();
        const contentPage = contentPageRef.current;
        const contentPageRect = contentPage.getBoundingClientRect();
        const initialX = e.clientX;
        const initialY = e.clientY;
        const initialWidth = gradeElement.offsetWidth;
        const initialHeight = gradeElement.offsetHeight;
    
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
        setSelectedComponent({id, type, text, grade, style});
      }


    return (
      <div
        ref={gradeRef}
        className="grade-component"
        style={{top: style.top, left: style.left, width: style.width, height: style.height}}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        <textarea
            value={text}
            onChange={handleTextChange}
            style={{fontSize: style.fontSize, color: style.color}}
        />
        <div className="grade-component-box">
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    onClick={() => handleGradeChange(index)}
                    style={{
                        fontSize: style.starSize || "24px",
                        color: index < grade ? style.starColor : "lightgray",
                        cursor: "pointer"
                    }}
                >
                    ★
                </span>
            ))}
        </div>
        <div
            className="resize-handle bottom-right"
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
        />
      </div>
    )
}

export default GradeComponent;