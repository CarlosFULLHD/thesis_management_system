import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";

interface TaskButtonProps {
  idGradePro: number;
  userId: number;
}

const TaskButton = ({ idGradePro, userId }: TaskButtonProps) => {
  // Routing instance and params
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  // Function to add params into history url
  const addParamsToUrl = (idGradePro: number) => {
    const params = new URLSearchParams(searchParams);
    if (idGradePro) {
      params.set("idGradePro", idGradePro.toString());
    } else {
      params.delete("idGradePro");
    }
    replace(`/Tareas/Docente/Historial?${params.toString()}`);
  };
  // Route to History Task
  const routeHistoryTask = () => {
    const params = new URLSearchParams(searchParams);
    if (idGradePro) {
      params.set("idGradePro", idGradePro.toString());
    } else {
      params.delete("idGradePro");
    }
    replace(`/Tareas/Docente/Historial?${params.toString()}`);
  };

  return (
    <Button
      color="success"
      variant="ghost"
      onClick={() => addParamsToUrl(idGradePro)}
    >
      Ver tareas
    </Button>
  );
};

export default TaskButton;
