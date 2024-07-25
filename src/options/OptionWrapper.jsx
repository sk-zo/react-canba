import TextOption from "./TextOption";
import ImageOption from "./ImageOption";
import AudioOption from "./AudioOption";
import VideoOption from "./VideoOption";
import FileOption from "./FileOption";
import QnaOption from "./QnaOption";
import VotingOption from "./VotingOption";

const optionMap = {
    text: TextOption,
    image: ImageOption,
    audio: AudioOption,
    video: VideoOption,
    file: FileOption,
    qna: QnaOption,
    voting: VotingOption
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

export default OptionWrapper;