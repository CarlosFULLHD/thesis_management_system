import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";

interface TaskButtonProps {
    userId: number;
}

const TaskButton = ({ userId }: TaskButtonProps) => {
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    const addParamsToUrl = (userId: number) => {
        const params = new URLSearchParams(searchParams);
        if (userId) {
            params.set('userId', userId.toString());
        } else {
            params.delete('userId');
        }
        replace(`/Tareas/Docente/Seleccion?${params.toString()}`);
    }

    return (
        <Button color="success" variant="ghost" onClick={() => addParamsToUrl(userId)}>
            Ver tareas
        </Button>
    );
}

export default TaskButton;
