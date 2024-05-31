import { Button } from "@nextui-org/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface BackButtonProps {
  idGradePro: number;
}

const BackButton = ({ idGradePro }: BackButtonProps) => {
  // Routing instance and params
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  // Route to history component
  const routeToHistory = () => {
    const params = new URLSearchParams(searchParams);
    if (idGradePro) {
      params.set("idGradePro", idGradePro.toString());
    } else {
      params.delete("idGradePro");
    }
    replace(`/Tareas/Docente/Historial?${params.toString()}`);
  };

  return (
    <Button isIconOnly color="primary" onClick={() => routeToHistory()}>
      <ArrowLeft />
    </Button>
  );
};

export default BackButton;
