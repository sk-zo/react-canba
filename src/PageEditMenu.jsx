import React, { useState } from 'react';
import './PageEditMenu.css'

function PageEditMenu({
    addTextComponent,
    addImageComponent,
    addAudioComponent,
    addVideoComponent,
    addQnaComponent,
    changePageBackgroundImage
}) {
    const [isBackgroundUploadPopupOpen, setBackgroundUploadPoupOpen] = useState(false);

    const handleBackgroundUploaPopup = () => {
        setBackgroundUploadPoupOpen(true);
    };

    const handleBackgroundChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            changePageBackgroundImage(imageUrl);
            setBackgroundUploadPoupOpen(false);
        }
    };

    const handleBackgroundUploadPopupCancel = () => {
        setBackgroundUploadPoupOpen(false);
    };


    return (
        <div className='page-edit-menu'>
            <div className='page-edit-head'>
                <ul className='page-edit-head-ul'>
                    <li className='page-edit-head-li'>
                        <div onClick={handleBackgroundUploaPopup}><p>배경</p></div>
                    </li>
                    <li className='page-edit-head-li'>
                        <div><p>저장</p></div>
                    </li>
                </ul>
            </div>
            <div className='page-edit-body'>
                <ul className='page-edit-body-ul'>
                    <li 
                        className='page-edit-body-li'
                        onClick={addTextComponent}
                    >
                        <div><p>텍스트</p></div>
                    </li>
                    <li 
                        className='page-edit-body-li'
                        onClick={addImageComponent}
                    >
                        <div><p>이미지</p></div>
                    </li>
                    <li 
                        className='page-edit-body-li'
                        onClick={addAudioComponent}
                    >
                        <div><p>오디오</p></div>
                    </li>
                    <li 
                        className='page-edit-body-li'
                        onClick={addVideoComponent}
                    >
                        <div><p>비디오</p></div>
                    </li>
                    <li 
                        className='page-edit-body-li'
                        onClick={addQnaComponent}
                    >
                        <div><p>질문 답변</p></div>
                    </li>
                </ul>
            </div>
            {isBackgroundUploadPopupOpen && (
            <div className='page-edit-popup'>
                <div className='page-edit-popup-content'>
                    <div className='page-edit-popup-head'>
                        <span className='page-edit-popup-title'>페이지 배경 업로드</span>
                        <span 
                            className='page-edit-popup-cancel'
                            onClick={handleBackgroundUploadPopupCancel}
                        >
                            X
                        </span>
                    </div>
                    <div className='page-edit-popup-body'>
                        <input 
                            type="file" 
                            accept='image/*'
                            onChange={handleBackgroundChange}
                        />
                    </div>
                    <div className='page-edit-popup-tail'>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default PageEditMenu;