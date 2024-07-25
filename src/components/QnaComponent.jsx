import React, { useRef } from "react";
import './QnaComponent.css';

function QnaComponent({
    id,
    questions,
    style,
    updateComponent,
    setSelectedComponent,
    contentPageRef,
}) {
    const qnaRef = useRef(null);
    const type = 'qna';

    const handleChange = (e, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = e.target.value;
        updateComponent(id, { questions: updatedQuestions });
    }

    const handleMouseDown = (e) => {
        const qnaElement = qnaRef.current;
        const rect = qnaElement.getBoundingClientRect();
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
                Math.min(moveEvent.clientX - offsetX, contentPageRect.right - qnaElement.offsetWidth));
            const newTop = Math.max(contentPageRect.top, 
                Math.min(moveEvent.clientY - offsetY, contentPageRect.bottom - qnaElement.offsetHeight));

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
        const qnaElement = qnaRef.current;
        const initialX = e.clientX;
        const initialY = e.clientY;
        const initialWidth = qnaElement.offsetWidth;
        const initialHeight = qnaElement.offsetHeight;
    
        const handleResizeMouseMove = (moveEvent) => {
          let newWidth = initialWidth;
          let newHeight = initialHeight;
    
          if (direction.includes('right')) {
            newWidth = Math.max(50, initialWidth + (moveEvent.clientX - initialX));
          }
          if (direction.includes('bottom')) {
            newHeight = Math.max(50, initialHeight + (moveEvent.clientY - initialY));
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
        setSelectedComponent({ id, type, questions, style });
      };


    return (
        <div
            ref={qnaRef}
            className="qna-component"
            style={{top: style.top, left: style.left, width: style.width, height: style.height}}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
        >   
            {questions.map((question, index) => (
                <div className="qna-sub-component" key={index}>
                    <div>
                        <textarea 
                            value={question}
                            style={{ fontSize: style.fontSize, color: style.color}}
                            onChange={(e) => handleChange(e, index)} // handleChange에 index를 전달하여 특정 질문을 변경할 수 있도록 합니다.
                        />
                    </div>
                    <div>
                        <textarea 
                            placeholder="답변을 입력해주세요."
                        />
                    </div>
                </div>
            ))}
            
            <div className="qna-submit">
                <button>제출하기</button>
            </div>
            <div
                className="resize-handle bottom-right"
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
            />
        </div>
    );
}

export default QnaComponent;