import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";

interface InitialButtonsProps {
    idGradePro: number
}
const InitialButtons = ( { idGradePro }: InitialButtonsProps  ) => {
    // Routing instance and params
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    // Route to add Task
    const routeAddTask = () => {
        const params = new URLSearchParams(searchParams);
        if (idGradePro) {
            params.set('idGradePro', idGradePro.toString());
        } else {
            params.delete('idGradePro')
        }
        replace(`/Tareas/Docente/Crear?${params.toString()}`)
    }
    // Route to History Task
    const routeHistoryTask = () => {
        const params = new URLSearchParams(searchParams);
        if (idGradePro) {
            params.set('idGradePro', idGradePro.toString());
        } else {
            params.delete('idGradePro')
        }
        replace(`/Tareas/Docente/Historial?${params.toString()}`)
    }

    // Route to reorder Task
    const routeReorderTask = () => {
        const params = new URLSearchParams(searchParams);
        if (idGradePro) {
            params.set('idGradePro', idGradePro.toString());
        } else {
            params.delete('idGradePro')
        }
        replace(`/Tareas/Docente/Reordenar?${params.toString()}`)
    }

    return(
        <div className="flex flex-row items-start justify-start space-x-4">
            <Button color="primary" variant="ghost" onClick={()=> routeAddTask()}>Asignar tarea</Button>
            <Button color="success" variant="ghost" onClick={() => routeHistoryTask()}>Historial</Button>
            <Button color ="warning" variant="ghost" onClick={() => routeReorderTask()}>Ordenar</Button>
        </div>
    );

}

export default InitialButtons;