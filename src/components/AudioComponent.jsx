import React, { useRef } from 'react';
import './AudioComponent.css';

function AudioComponent({id, src, style, updateComponent,
    setSelectedComponent, contentPageRef}) {
    const audioRef = useRef(null);
    const type = 'audio';

    const handleMouseDown = (e) => {
        e.stopPropagation();
        const audioElement = audioRef.current;
        const rect = audioElement.getBoundingClientRect();
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
                Math.min(moveEvent.clientX - offsetX, contentPageRect.right - audioElement.offsetWidth));
            const newTop = Math.max(contentPageRect.top,
                Math.min(moveEvent.clientY - offsetY, contentPageRect.bottom - audioElement.offsetHeight));
            
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
        const audioElement = audioRef.current;
        const rect = audioElement.getBoundingClientRect();
        const contentPage = contentPageRef.current;
        const contentPageRect = contentPage.getBoundingClientRect();
        const initialX = e.clientX;
        const initialY = e.clientY;
        const initialWidth = audioElement.offsetWidth;
        const initialHeight = audioElement.offsetHeight;

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
        setSelectedComponent({ id, type, src, style });
    };

    return (
        <div
            ref={audioRef}
            className='audio-component'
            style={{ ...style }}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
        >
            <audio 
                src={src} 
                controls
            />                
            <div
                className='resize-handle bottom-right'
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
            />
        </div>
    );
}

export default AudioComponent;