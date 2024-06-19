import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
interface FormalDefenseButtonProps {
    idGradePro: number
}

const FormalDefenseButton = ({idGradePro} : FormalDefenseButtonProps)=> {
   // Routing instance and params
   const { replace } = useRouter();
   const searchParams = useSearchParams();
    // Function to add params into selection tasks url
    const addParamsToUrl = (idGradePro: number) => {
        const params = new URLSearchParams(searchParams);
        if (idGradePro){
            params.set('idGradePro', idGradePro.toString());
        } else {
            params.delete('idGradePro')
        }
        replace(`/Defensa-formal/Docente/Seleccion?${params.toString()}`)
    }
    return (  
    <Button color="warning" variant="ghost" onClick={() => addParamsToUrl(idGradePro)}>Defensa formal</Button>
    );

}

export default FormalDefenseButton;