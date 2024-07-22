import TextOption from "./TextOption";
import ImageOption from "./ImageOption";

const optionMap = {
    text: TextOption,
    image: ImageOption,
};

function OptionWrapper({
    component,
    updateComponent,
}) {
    const Option = optionMap[component.type];

    if (!Option) {
        return null;
    }

    const commonProps = {
        component: component,
        updateComponent: updateComponent,
    };


    return <Option {...commonProps} />
}

export default OptionWrapper