import React, { useContext, useState } from 'react';
import './PageEditMenu.css'
import { AppContext } from './AppContext';
import Swal from 'sweetalert2';

function PageEditMenu({content}) {
  const { setContent, selectedSession, selectedPage, setSelectedComponent } = useContext(AppContext);
  const [isBackgroundUploadPopupOpen, setBackgroundUploadPoupOpen] = useState(false);
  const [pageBackgroundImage, setPageBackgroundImage] = useState(null);

  const savePageComponents = () => {
    const components = content.sessions
        .find(session => session.id === selectedSession)
        .pages
        .find(page => page.id === selectedPage)
        .components;

    const formData = new FormData();

    const componentsWithoutFile = components.map(component => {
      const componentCopy = { ...component};
      delete componentCopy.file;
      delete componentCopy.grade;
      return componentCopy;
    });

    formData.append('components', new Blob([JSON.stringify(componentsWithoutFile)], { type: 'application/json'}));

    components.forEach((component) => {
      if (component.file) {
        formData.append(`${component.id}`, component.file);
      }
    });

    if (pageBackgroundImage) {
      formData.append('backgroundImage', pageBackgroundImage);
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    fetch(`http://localhost:8080/api/save-content-component/${content.id}/${selectedPage}`, {
      method: 'POST',
      body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("response not ok: save content component");
        }
        return response.json();
    })
    .then(data => {
        setContent(data);
        Swal.fire({
          icon: 'success',
          title: '저장 완료',
          text: '페이지가 저장되었습니다.',
        });
    })
    .catch(error => {
        Swal.fire({
          icon: 'error',
          title: '저장 실패',
          text: '페이지 저장 중 오류가 발생했습니다.',
        })
        console.error('error save content component', error);
    });
  }

  const handleSavePageComponents = () => {
    Swal.fire({
      icon: 'info',
      title: '페이지 저장',
      text: '현재 페이지를 저장하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '저장',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        savePageComponents();
      }
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
          setPageBackgroundImage(file);
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
      file: null,
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
      file: null,
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
      file: null,
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
      file: null,
      style: {
        top: 100,
        left: 100,
        width: '200px',
        height: '50px'
      }
    };

    addComponent(newComponent);
  }

  const addGradeComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'grade',
      text: '별점',
      grade: 0,
      style: {
        top: 100,
        left: 100,
        fontSize: '16px',
        width: '200px',
        height: '100px',
        starSize: '24px',
        starColor: 'gold',
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

  const addQuizComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'quiz',
      question: '질문을 입력하세요',
      items: [
        {text: "보기를 입력하세요.", explanation: "정답입니다.", isCorrect: true, isSelected: false},
        {text: "보기를 입력하세요.", explanation: "오답입니다.", isCorrect: false, isSelected: false},
      ],
      style: {
        fontSize: '16px',
        color: '#000000',
        top: 100,
        left: 100,
        width: '400px',
        height: 'min-content',
        correctBackgroundColor: '#00ff00',
        wrongBackgroundColor: '#ff0000'
      },
    };

    addComponent(newComponent);
  }

  const addInfoComponent = () => {
    const newComponent = {
      id: Date.now(),
      type: 'info',
      items: [
        {title: "제목을 입력해주세요.", content: '내용을 입력해주세요', isSelected: false}
      ],
      style: {
        fontSize: '16px',
        color: '#000000',
        top: 100,
        left: 100,
        width: '400px',
        height: 'min-content',
        backgroundColor: 'transparent',
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
        backgroundColor: 'transparent',
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
                    onClick={addGradeComponent}
                >
                    <div><p>별점</p></div>
                </li>
                <li 
                    className='page-edit-body-li'
                    onClick={addQnaComponent}
                >
                    <div><p>질문 답변</p></div>
                </li>
                <li 
                    className='page-edit-body-li'
                    onClick={addQuizComponent}
                >
                    <div><p>퀴즈</p></div>
                </li>
                <li 
                    className='page-edit-body-li'
                    onClick={addInfoComponent}
                >
                    <div><p>설명</p></div>
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