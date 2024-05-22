import { CircularProgress } from "@nextui-org/react";
import TitleComponent from "./titleComponent";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTasks } from '../../providers/taskGradeProfileProvider'; // Import the hook

interface FrameComponentProps {
    idGradePro: number;
}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
    // Provider and methods
    const { tasks, loadTasks } = useTasks(); // Use the hook
    const [name ,setName] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    // Component flag
    const [componentFlag, setComponentFlag] = useState<number>(0);
    // Callback for component flag
    const componentFlagCallback = ( newFlag : number) => {
        setComponentFlag(newFlag)
    }

    const { isLoading, isError } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            await loadTasks(); // Load the tasks
            return tasks; // Return the tasks
        }
    })
    // Fetching state
    if (isLoading) {
        return <CircularProgress aria-label="Cargando..." />;
    }
    // Error state
    if (isError) {
        return <div>Oops!</div>;
    }
    // Success state
    if (tasks.length > 0) { // Check if there are tasks
        return (
            <>
                <TitleComponent 
                   
                />
                <p>{idGradePro}</p>
                
                
                
            </>
        )
    } else {
        return (
            <>Problemas al conseguir perfil de grado</>
        );
    }
}

export default FrameComponent;