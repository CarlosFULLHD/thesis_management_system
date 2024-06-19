import { Button } from "@nextui-org/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  idGradePro: number;
}
const BackButton = ({ idGradePro }: BackButtonProps) => {
  // Routing instance and params
  const { replace } = useRouter();

  // Route to "Mis-estudiantes"
  const routeToMisEstudiantes = () => {
    replace(`http://localhost:3000/Mis-estudiantes`);
  };

  return (
    <Button isIconOnly color="primary" onClick={() => routeToMisEstudiantes()}>
      <ArrowLeft />
    </Button>
  );
};

export default BackButton;
