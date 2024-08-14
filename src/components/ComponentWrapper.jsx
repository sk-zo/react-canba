import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';
import AudioComponent from './AudioComponent';
import VideoComponent from './VideoComponent';
import FileComponent from './FileComponent';
import QnaComponent from './QnaComponent';
import InfoComponent from './InfoComponent';
import VotingComponent from './VotingComponent';
import './common.css';
import QuizComponent from './QuizComponent';

const componentMap = {
  text: TextComponent,
  image: ImageComponent,
  audio: AudioComponent,
  video: VideoComponent,
  file: FileComponent,
  qna: QnaComponent,
  quiz: QuizComponent,
  info: InfoComponent,
  voting: VotingComponent
};

function ComponentWrapper({ 
  component, 
  updateComponent,
  setSelectedComponent,
  contentPageRef
}) {
  const Component = componentMap[component.type];

  if (!Component) {
    return null;
  }

  const commonProps = {
    id: component.id,
    updateComponent,
    setSelectedComponent,
    contentPageRef,
  };

  const specificProps = {
    text: { content: component.content, style: component.style },
    image: { src: component.src, file: component.file, style: component.style },
    audio: { src: component.src, file: component.file, style: component.style },
    video: { src: component.src, file: component.file, style: component.style },
    file: { src: component.src, file: component.file, style: component.style },
    qna: { questions: component.questions, style: component.style },
    quiz: { question: component.question, items: component.items, style:component.style },
    info: { items: component.items, style: component.style },
    voting: { items: component.items, style: component.style }
  }

  return <Component {...commonProps} {...specificProps[component.type]} />
}

export default ComponentWrapper;