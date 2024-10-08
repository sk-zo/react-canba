import TextOption from "./TextOption";
import ImageOption from "./ImageOption";
import AudioOption from "./AudioOption";
import VideoOption from "./VideoOption";
import FileOption from "./FileOption";
import QnaOption from "./QnaOption";
import VotingOption from "./VotingOption";
import InfoOption from "./InfoOption";
import QuizOption from "./QuizOption";
import GradeOption from "./GradeOption";

const optionMap = {
    text: TextOption,
    image: ImageOption,
    audio: AudioOption,
    video: VideoOption,
    file: FileOption,
    grade: GradeOption,
    qna: QnaOption,
    quiz: QuizOption,
    info: InfoOption,
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