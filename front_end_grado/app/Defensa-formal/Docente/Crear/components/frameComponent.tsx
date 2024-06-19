
import BackButton from "./backButton";
import CreateFormalDefenseForm from "./createFormalDefenseForm";
import TitleComponent from "./titleComponent";



interface FrameComponentProps {
    idGradePro: number
}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
    return (
        <>
            <TitleComponent />
            <BackButton idGradePro={idGradePro}/>
            <CreateFormalDefenseForm idGradePro={idGradePro}/>
        </>
    )
}

export default FrameComponent;