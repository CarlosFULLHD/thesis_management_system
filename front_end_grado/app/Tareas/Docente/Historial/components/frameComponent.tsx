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
      <HistoryComponent idGradePro={idGradePro} />
    </>
  );
};

export default FrameComponent;
