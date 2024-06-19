import { useTask } from "@/app/Gestion-tareas/providers/TaskProvider";
import {
    Checkbox,
    cn,
    Chip,
    Button,
    Divider,
} from "@nextui-org/react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import EmptyModal from "./EmptyModal";

interface EmptyTaskListProps {
    addStateCallback: (newState:number) => void;
    selectedTaskIds: number[];
    handleCheckboxChange: (idTask: number) => (isSelected: boolean) => void;
    clearSelectedTaskList: () => void;
    setInitialOrder: () => void;
}

const EmptyTaskList = ({ addStateCallback , selectedTaskIds, handleCheckboxChange,clearSelectedTaskList, setInitialOrder } : EmptyTaskListProps ) => {
    // Importing data and method from provider
    const { taskList } = useTask();
    // Router instance
    const router = useRouter();
  
    // Check next form
    const doIGoToNextForm = () => {
        if (selectedTaskIds.length == 0) {
            toast.warning("Debe seleccionar al menos una tarea")
            return;
        }
        setInitialOrder();
        addStateCallback(1)
    }
   
    // Success state
    if (taskList.length > 0) {
        return (
            <>
            <EmptyModal />
                <div>
                    <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                        Elija tareas</h1>
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
                        onClick={() => doIGoToNextForm()}
                    >
                        Siguiente
                    </Button>
                </div>
            </>
        );
    }
    else {
        return <div>
            <h1>No existen tareas para TALLER DE GRADO 2</h1>
            <Button 
                variant="ghost" 
                color="primary"
                onClick={() => { router.push("/Gestion-tareas/Tareas-taller-dos");}}    
            >
                Crear Tareas
            </Button>
        </div>;
    }
}

export default EmptyTaskList;