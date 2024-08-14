import React, { useRef } from "react";
import "./QuizComponent.css";

function QuizComponent({
    id,
    question,
    items,
    style,
    updateComponent,
    setSelectedComponent,
    contentPageRef
}) {
    const quizRef = useRef(null);
    const type = "quiz";

    const handleQuizQuestionChange = (e) => {
        updateComponent(id, { question: e.target.value });
    }

    const handleSelectItem = (index) => {
        const updateditems = items.map((item, i) =>
            i === index ? { ...item, isSelected: true } : { ...item, isSelected: false}
        );
        updateComponent(id, { items: updateditems });
    }

    const handleMouseDown = (e) => {
        e.stopPropagation();
        const quizElement = quizRef.current;
        const rect = quizElement.getBoundingClientRect();
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
                Math.min(moveEvent.clientX - offsetX, contentPageRect.right - quizElement.offsetWidth));
            const newTop = Math.max(contentPageRect.top, 
                Math.min(moveEvent.clientY - offsetY, contentPageRect.bottom - quizElement.offsetHeight));

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
        const quizElement = quizRef.current;
        const rect = quizElement.getBoundingClientRect();
        const contentPage = contentPageRef.current;
        const contentPageRect = contentPage.getBoundingClientRect();
        const initialX = e.clientX;
        const initialY = e.clientY;
        const initialWidth = quizElement.offsetWidth;
        const initialHeight = quizElement.offsetHeight;
    
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
        setSelectedComponent({id, type, question, items, style});
      }

      return (
        <div
            ref={quizRef}
            className="quiz-component"
            style={{top: style.top, left: style.left, width: style.width, height: style.height}}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
        >
            <textarea
                placeholder={question}
                onChange={handleQuizQuestionChange}
                style={{fontSize: style.fontSize, color: style.color}}
            />
            {items.map((item, index) => (
                <div
                    key={index}
                    className="quiz-sub-component"
                    style={{
                        backgroundColor: item.isSelected ? item.isCorrect ? style.correctBackgroundColor : style.wrongBackgroundColor : 'transparent'
                    }}
                    onClick={() => handleSelectItem(index)}
                >
                    <span style={{fontSize: style.fontSize, color: style.color}}>{item.text}</span>
                    {item.isSelected && (
                    <div>
                        <span style={{fontSize: style.fontSize, color: style.color}}>{item.explanation}</span>
                    </div>
                    )}
                </div>
            ))}
            <div
                className="resize-handle bottom-right"
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
            />
        </div>
      )
}

export default QuizComponent;