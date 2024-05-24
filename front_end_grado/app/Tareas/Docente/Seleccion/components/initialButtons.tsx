import { Button } from "@nextui-org/button";
interface InitialButtonsProps {
    callBack:(newFlag: number) => void,

}


const InitialButtons = ( { callBack} : InitialButtonsProps ) => {
    return(
        <div className="flex flex-row items-start justify-start space-x-4">
            <Button color="primary" variant="ghost" onClick={()=> callBack(1)}>Asignar tarea</Button>
            <Button color="success" variant="ghost" onClick={() => callBack(2)}>Historial</Button>
            <Button color ="warning" variant="ghost" onClick={() => callBack(3)}>Ordenar</Button>
        </div>
    );

}

export default InitialButtons;