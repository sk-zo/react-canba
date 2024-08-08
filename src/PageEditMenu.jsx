import React, { useContext, useState } from 'react';
import './PageEditMenu.css'
import { AppContext } from './AppContext';

function PageEditMenu({content}) {
  const { setContent, selectedSession, selectedPage, setSelectedComponent } = useContext(AppContext);
  const [isBackgroundUploadPopupOpen, setBackgroundUploadPoupOpen] = useState(false);

  const handleSavePageComponents = () => {
    const components = content.sessions
        .find(session => session.id === selectedSession)
        .pages
        .find(page => page.id === selectedPage)
        .components;

    console.log(components);
    fetch(`http://localhost:8080/api/save-content-component/${content.id}/${selectedPage}`, {
      method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(components) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("response not ok: save content component");
        }
        return response.json();
    })
    .then(data => {
        console.log("updated content after save component: ", data);
    })
    .catch(error => {
        console.error('error save content component', error);
    });
  };

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

  const changePageBackgroundImage = (imageUrl) => {
    setContent(prevContent => ({
      ...prevContent,
      sessions: prevContent.sessions.map(session =>
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
            page.id === selectedPage ?
            {
              ...page,
              backgroundImage: imageUrl,
            } : page
          ),
        } : session
      )
    }));
  };


  const addComponent = (newComponent) => {
    setContent(prevContent => ({
      ...prevContent,
      sessions: prevContent.sessions.map(session => 
        session.id === selectedSession ?
        {
          ...session,
          pages: session.pages.map(page =>
              page.id === selectedPage ?
              {
                  ...page,
                  components: [...page.components, newComponent],
              } : page
          ),
        } : session
      )
    }));

    setSelectedComponent(newComponent)
  }

  const addTextComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'text',
      content: 'Edit me',
      style: {
        fontSize: '16px',
        fontWeight: 'normal',
        color: '#000000',
        textAlign: 'left',
        top: 100,
        left: 100,
        width: '200px',
        height: '50px',
      },
    };
    addComponent(newComponent);
  };

  const addImageComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'image',
      src: 'none',
      style: {
        top: 100,
        left: 100,
        width: '200px',
        height: '50px',
      }
    };

    addComponent(newComponent);
  };

  const addAudioComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'audio',
      src: 'none',
      style: {
        top: 100,
        left: 100,
        width: '300px',
        height: '50px'
      }
    };

    addComponent(newComponent);
  }

  const addVideoComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'video',
      src: 'none',
      style: {
        top: 100,
        left: 100,
        width: '400px',
        height: '200px'
      }
    };

    addComponent(newComponent);
  }

  const addFileComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: "file",
      src: "",
      style: {
        top: 100,
        left: 100,
        width: '200px',
        height: '50px'
      }
    };

    addComponent(newComponent);
  }

  const addQnaComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'qna',
      questions: ['질문을 입력하세요'],
      style: {
        fontSize: '16px',
        color: '#000000',
        backgroundColor: 'transparent',
        top: 100,
        left: 100,
        width: '400px',
        height: 'min-content',
      },
    };

    addComponent(newComponent);
  };

  const addVotingComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'voting',
      items: [{content: '내용을 입력해주세요.', isSelected: false}],
      style: {
        fontSize: '16px',
        color: '#000000',
        top: 100,
        left: 100,
        width: '400px',
        height: 'min-content',
      },
    };

    addComponent(newComponent);
  }


return (
    <div className='page-edit-menu'>
        <div className='page-edit-head'>
            <ul className='page-edit-head-ul'>
                <li className='page-edit-head-li'>
                    <div onClick={handleBackgroundUploaPopup}><p>배경</p></div>
                </li>
                <li className='page-edit-head-li'>
                    <div><p onClick={handleSavePageComponents}>저장</p></div>
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
                    onClick={addFileComponent}
                >
                    <div><p>파일</p></div>
                </li>
                <li 
                    className='page-edit-body-li'
                    onClick={addQnaComponent}
                >
                    <div><p>질문 답변</p></div>
                </li>
                <li 
                    className='page-edit-body-li'
                    onClick={addVotingComponent}
                >
                    <div><p>투표</p></div>
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