import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';

const componentMap = {
  text: TextComponent,
  image: ImageComponent,
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
  }

  return <Component {...commonProps} {...specificProps[component.type]} />
}

export default ComponentWrapper;