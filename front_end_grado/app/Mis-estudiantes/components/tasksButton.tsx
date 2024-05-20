import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";

interface TaskButtonProps {
    idGradePro: number;
    userId: number;
}

const TaskButton = ( {idGradePro, userId} : TaskButtonProps) => {

    // Routing instance and params
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    // Function to add params into selection tasks url
    const addParamsToUrl = (idGradePro: number, userId: number) => {
        const params = new URLSearchParams(searchParams);
        if (idGradePro){
            params.set('idGradePro', idGradePro.toString());
        } else {
            params.delete('idGradePro')
        }
        if (userId) {
            params.set('userId', userId.toString());
        } else {
            params.delete('userId');
        }
        replace(`/Tareas/Docente/Seleccion?${params.toString()}`)
    }

    return(
        <Button color="success" variant="ghost" onClick={() => addParamsToUrl(idGradePro, userId)}>Ver tareas</Button>
    );
}

export default TaskButton;