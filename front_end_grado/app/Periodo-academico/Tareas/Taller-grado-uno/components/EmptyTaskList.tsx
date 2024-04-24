import { useTask } from "@/app/Gestion-tareas/providers/TaskProvider";
import { useAcademicPeriod } from "@/app/Periodo-academico/providers/AcademicPeriodProvider";
import {
    CircularProgress,
    Checkbox,
    cn,
    Chip,
    Button,
    Divider,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const EmptyTaskList = () => {
    // Importing data and method from provider
    const { taskList, loadActiveTasksFromDB, fetchTaskList } = useTask();

    const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
    // Importing state from academicperiod provider
    const { mainAcademicPeriod } = useAcademicPeriod();
    const handleCheckboxChange = (idTask: number) => (isSelected: boolean) => {
        if (isSelected) {
            // Add the task ID to the selectedTaskIds array if it's not already there
            setSelectedTaskIds(prevIds => [...prevIds, idTask]);
        } else {
            // Remove the task ID from the selectedTaskIds array
            setSelectedTaskIds(prevIds => prevIds.filter(id => id !== idTask));
        }
    };

    // Clear selected taskList
    const clearSelectedTaskList = () => {
        setSelectedTaskIds([])
    }
    const { isLoading, isError } = useQuery({
        queryKey: ["taskTable"],
        queryFn: async () => {
            await loadActiveTasksFromDB(1);
            return taskList
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
    if (taskList.length > 0) {
        return (
            <>
                <div>
                    <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                        Elija tareas TALLER DE GRADO I SEMESTRE {mainAcademicPeriod.semester}</h1>
                </div>
                <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-gray-200 p-4 rounded-lg shadow-md">

                    {taskList.map((item, index) => (

                        <Checkbox
                            key={item.idTask}
                            classNames={{
                                base: cn(
                                    "inline-flex w-full max-w-md bg-content1 m-1",
                                    "hover:bg-content2 items-center justify-start",
                                    "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                    "data-[selected=true]:border-primary",
                                ),
                                label: "w-full",
                            }}
                            isSelected={selectedTaskIds.includes(item.idTask)}
                            onValueChange={handleCheckboxChange(item.idTask)}
                        >
                            <p className="text-left"><b>Tarea: </b> {item.titleTask}</p> 
                            <Divider/>
                            <p className="text-left"><b>Descripción: </b> {item.task}</p> 
                            <div className="flex flex-col items-end gap-1">
                                <Chip color={selectedTaskIds.includes(item.idTask) ? "success" : "danger"} size="sm" variant="flat">
                                    {selectedTaskIds.includes(item.idTask) ? "Asignado" : "Sin asignar"}
                                </Chip>
                            </div>
                        </Checkbox>

                    ))}
                </div>
                <div className=" items-center">
                    <Button
                        color="primary"
                        variant="ghost"
                        startContent={<FaCheckCircle />}
                        className="mr-4" // Add margin-right to the first button
                        onClick={(clearSelectedTaskList)}
                    >
                        Reiniciar
                    </Button>
                    <Button
                        color="success"
                        variant="ghost"
                        startContent={<FaCheckCircle />}
                    >
                        Siguiente
                    </Button>
                </div>
            </>
        );
    }
    else {
        return <div>
            <h1>No existen tareas para taller de grado 1 creadas</h1>
        </div>;
    }
}

export default EmptyTaskList;