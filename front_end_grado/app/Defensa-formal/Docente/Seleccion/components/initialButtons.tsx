import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";

interface InitialButtonsProps {
    idGradePro: number
}
const InitialButtons = ( { idGradePro }: InitialButtonsProps  ) => {
    // Routing instance and params
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    // Route to add formal defense
    const routeAddTask = () => {
        const params = new URLSearchParams(searchParams);
        if (idGradePro) {
            params.set('idGradePro', idGradePro.toString());
        } else {
            params.delete('idGradePro')
        }
        replace(`/Defensa-formal/Docente/Crear?${params.toString()}`)
    }

    return(
        <div className="flex flex-row items-start justify-start space-x-4">
            <Button color="primary" variant="ghost" onClick={()=> routeAddTask()}>Programar defensa formal</Button>
        </div>
    );

}

export default InitialButtons;