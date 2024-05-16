import TitleComponent from "./titleComponent";
interface FrameComponentProps {
    idGradePro: number
}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
    return (
        <>
            <TitleComponent />
            {idGradePro}
        </>
    )

}

export default FrameComponent;