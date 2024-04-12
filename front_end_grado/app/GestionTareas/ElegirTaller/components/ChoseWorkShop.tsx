import { Button } from "@nextui-org/button";
import ChoseWorkShopTitle from "./ChoseWorkShopTitle";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ChoseWorkShop = () => {
    const router = useRouter();

    const redirectToNewPage = (route: string) => {
        return () => {  
            router.push(`/GestionTareas/${route}`);
        };
    };
    
    return (
       

        <div className="flex flex-col items-center justify-center ">
            <ChoseWorkShopTitle/>
            <h1 className="text-4xl font-bold mb-4">Elige taller</h1>
            <div className="space-x-4">
           
                <Button color="primary" variant="ghost" onClick={redirectToNewPage("Tareas-taller-uno")}>
                    <p className="font-bold py-2 px-4 rounded">
                        Ir a tareas Taller 1
                    </p>
                </Button>
                
                <Button color="success" variant="ghost" onClick={redirectToNewPage("Tareas-taller-dos")} >
                    <p className=" font-bold py-2 px-4 rounded" >
                        Ir a tareas Taller 2
                    </p>
                </Button>
            </div>
        </div>
    );
}

export default ChoseWorkShop;