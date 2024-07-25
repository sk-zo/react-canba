import React, { useEffect, useRef, useState } from "react";
import "./FileComponent.css";

function FileComponent({id, src, style, updateComponent, setSelectedComponent, contentPageRef}) {
    const fileRef = useRef(null);
    const type = "file";
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        if (src) {
            const url = URL.createObjectURL(src);
            setFileUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [src]);

    const handleMouseDown = (e) => {
        const fileElement = fileRef.current;
        const rect = fileElement.getBoundingClientRect();
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
                Math.min(moveEvent.clientX - offsetX, contentPageRect.right - fileElement.offsetWidth));
            const newTop = Math.max(contentPageRect.top,
                Math.min(moveEvent.clientY - offsetY, contentPageRect.bottom - fileElement.offsetHeight));
            
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
        const fileElement = fileRef.current;
        const initialX = e.clientX;
        const initialY = e.clientY;
        const initialWidth = fileElement.offsetWidth;
        const initialHeight = fileElement.offsetHeight;

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
        setSelectedComponent({ id, type, src, style });
    };



    return (
        <div 
            ref={fileRef}
            className="file-component"
            style={{ ...style }}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
        >
            {src ? (
                <a href={fileUrl} download={src.name} className="file-download-link">
                   {src.name} 다운로드
                </a>
            ) : (
                <span className="no-file">파일을 업로드해주세요</span>
            )}
            <div
                className='resize-handle bottom-right'
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
            />
        </div>
    );
}

export default FileComponent;