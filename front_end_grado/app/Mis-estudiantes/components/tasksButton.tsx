import { Button } from "@nextui-org/button";

interface TaskButtonProps {
    idGradePro: number
}

const TaskButton = ( {idGradePro} : TaskButtonProps) => {
    const saySomething = () => {
        alert(idGradePro)
    }

    return(
        <Button color="success" variant="ghost" onPress={saySomething}>Ver tareas</Button>
    );
}

export default TaskButton;