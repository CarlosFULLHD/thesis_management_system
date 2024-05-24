import AddTaskComponent from "./addTaskComponent";
import BackButton from "./backButton";
import TitleComponent from "./titleComponent";


interface FrameComponentProps {
    idGradePro: number
}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
    return (
        <>
            <TitleComponent />
            <BackButton idGradePro={idGradePro}/>
            <AddTaskComponent idGradePro={idGradePro}/>
        </>
    )
}

export default FrameComponent;