import InitialButtons from "../../Seleccion/components/initialButtons";
import BackButton from "./backButton";
import HistoryComponent from "./historyComponent";
import TitleComponent from "./titleComponent";

interface FrameComponentProps {
  idGradePro: number;
}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
  return (
    <>
      <TitleComponent />
      <BackButton idGradePro={idGradePro} />
      <InitialButtons idGradePro={idGradePro} />
      <HistoryComponent idGradePro={idGradePro} />
      
    </>
  );
};

export default FrameComponent;
