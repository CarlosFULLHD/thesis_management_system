import { Button } from "@nextui-org/button";
interface InitialButtonsProps {
    callBack:(newFlag: number, userId: number) => void,
    userId: number,
}


const InitialButtons = ( { callBack, userId} : InitialButtonsProps ) => {
    return(
        <div className="flex flex-col items-center h-screen space-y-4">
        <Button color="primary" variant="ghost" onClick={()=> callBack(1, userId)}>Asignar tarea</Button>
        <Button color="success" variant="ghost" onClick={() => callBack(2, userId)}>Historial</Button>
        <Button color ="warning" variant="ghost" onClick={() => callBack(3, userId)}>Modificar</Button>
    </div>
    );

}

export default InitialButtons;