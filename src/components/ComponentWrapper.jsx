import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';
import AudioComponent from './AudioComponent';
import VideoComponent from './VideoComponent';
import QnaComponent from './QnaComponent';
import './common.css';

const componentMap = {
  text: TextComponent,
  image: ImageComponent,
  audio: AudioComponent,
  video: VideoComponent,
  qna: QnaComponent,
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
    image: { src: component.src, style: component.style },
    audio: { src: component.src, style: component.style },
    video: { src: component.src, style: component.style },
    qna: { content: component.content, style: component.style },
  }

  return <Component {...commonProps} {...specificProps[component.type]} />
}

export default ComponentWrapper;