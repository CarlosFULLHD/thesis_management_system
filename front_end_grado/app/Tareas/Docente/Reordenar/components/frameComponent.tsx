import BackButton from "./backButton";
import ReorderCollection from "./reorderCollection";
import TitleComponent from "./titleComponent";


interface FrameComponentProps {
    idGradePro: number
}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
    return (
        <>
            <TitleComponent />
            <BackButton idGradePro={idGradePro}/>
            <ReorderCollection idGradePro={idGradePro}/>
        </>
    )
}

export default FrameComponent;