import { TaskHasDateInterface } from "@/app/Periodo-academico/providers/TaskHasDateProvider";
import DateTimePickerHtml from "@/components/DateTimePickerHtml";
import { Button, Card, CardBody,  Chip, Divider, Checkbox } from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { FaCheckCircle, FaLock, FaLockOpen } from "react-icons/fa";
import { toast } from "react-toastify";

interface OrderFillFormProps {
    addStateCallback: (newState: number) => void;
    taskWithDatesList: TaskHasDateInterface[];
    updateIsUrl: (idTask: number, newIsUrl: number) => void;
    updateIsMetting: (idTask: number, newIsMeeting: number) => void;
    handleReorder: (newList: TaskHasDateInterface[]) => void;
    handlePublicationDateUpdate: (idTask: number, newPublicationDate: string) => void;
    handleDeadline: (idTask: number, newDeadline: string) => void

}

const OrderFillForm = ({ addStateCallback, taskWithDatesList, updateIsUrl, updateIsMetting , handleReorder, handlePublicationDateUpdate, handleDeadline}: OrderFillFormProps) => {

    // Use effect trigger event
    // useEffect(() => {
    //     const newFilteredTasks = taskList.filter(task => taskWithDatesList.includes(task.idTask));
    //     setFilteredTasks(newFilteredTasks);
    // }, [taskList, taskWithDatesList]); // Dependencies ensure this runs when taskList or selectedTaskIds change
    // State to handle the lock for the list
    const [isReorderEnabled, setIsReorderEnabled] = useState(true);
    // Lock or unlock reorder
    const toggleReorder = () => {
        setIsReorderEnabled(!isReorderEnabled);
    };

    const checkDatesFilled = (): boolean => {
        // Check if every task has non-empty publicationDate and deadline
        return taskWithDatesList.every(task => task.publicationDate.trim() !== "" && task.deadline.trim() !== "");
    };

    const saveForm=()=>{
        if (!checkDatesFilled()){
            toast.warning("Complete todas las fechas")
        }
        
    }


    if (taskWithDatesList.length > 0) {
        return (
            <>
                <div>
                    <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                        Ordene y complete tareas seleccionadas</h1>
                </div>
                <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-gray-200 p-4 rounded-lg shadow-md">
                    <Button onClick={toggleReorder} variant="bordered" color={isReorderEnabled ? "success" : "warning"} startContent={isReorderEnabled ? <div><FaLockOpen /></div> : <div><FaLock /></div>}>
                    </Button>
                    <Reorder.Group
                        values={taskWithDatesList}
                        onReorder={handleReorder} // Handles reordering logic
                    >
                        {taskWithDatesList.map((item, index) => (
                            <Reorder.Item
                                value={item}
                                key={item.taskIdTask.idTask}
                                dragListener={isReorderEnabled}
                            >
                                <Card className="m-8">
                                    <CardBody>
                                        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                            <div className="relative col-span-6 md:col-span-4 flex flex-col items-center justify-center space-y-2">
                                                <p className="text-md mt-2"><b>Tarea #{index + 1}</b></p>
                                                <Divider />
                                                <div className="flex flex-col items-start w-full">
                                                    <Chip color="success" className="mb-4">
                                                        <Checkbox
                                                            isSelected={item.isMeeting == 1} 
                                                            color="warning"
                                                            onChange={(e) => updateIsMetting(item.taskIdTask.idTask, (e.target as HTMLInputElement).checked ? 1 : 0)}
                                                            >
                                                            Necesita reunión</Checkbox>
                                                    </Chip>
                                                    <Chip color="warning">
                                                        <Checkbox 
                                                            isSelected={item.isUrl == 1}
                                                            color="success"
                                                            onChange={(e) => updateIsUrl(item.taskIdTask.idTask, (e.target as HTMLInputElement).checked ? 1 : 0)}
                                                            >Necesita espacio en la nube
                                                        </Checkbox>
                                                    </Chip>
                                                </div>
                                                <Divider />
                                            </div>
                                            <div className="flex flex-col col-span-6 md:col-span-8">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex flex-col gap-0">
                                                        <h3 className="font-semibold text-foreground/90">Título: {item.taskIdTask.titleTask}</h3>
                                                        <p className="text-small text-foreground/80"><b>Descripción:</b> {item.taskIdTask.task}</p>
                                                    </div>
                                                </div>
                                                <Divider />
                                                <div className="relative col-span-6 md:col-span-4 flex flex-col items-center justify-center space-y-2">
                                                    <p className="text-md mt-2"><b>Fechas </b></p>

                                                    <div className="w-full">
                                                        <div className="flex justify-center items-center mb-2">
                                                            <span className="mr-2">Inicio:</span>
                                                                <DateTimePickerHtml onChange={(e) => handlePublicationDateUpdate(item.taskIdTask.idTask,e)} dateValue={item.publicationDate} bgColorClass='bg-custom-green' fontColorClass='text-custom-green-font'/>
                                                        </div>
                                                        <div className="flex justify-center items-center">
                                                            <span className="mr-2">Límite:</span>
                                                            <DateTimePickerHtml onChange={(e) => handleDeadline(item.taskIdTask.idTask,e)} dateValue={item.deadline} bgColorClass='bg-custom-red' fontColorClass='text-custom-red-font'/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                    <Divider />
                                </Card>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>

                </div>
                <div className=" items-center">
                    <Button
                        color="primary"
                        variant="ghost"
                        startContent={<FaCheckCircle />}
                        className="mr-4" // Add margin-right to the first button
                        onClick={() => (addStateCallback(0))}
                    >
                        Atras
                    </Button>
                    <Button
                        color="success"

                        startContent={<FaCheckCircle />}
                        onClick={() => saveForm()}
                    >
                        Guardar
                    </Button>
                </div>
            </>
        );
    } else {
        return (
            <div className=" items-center">
                No existen tareas para asignar
                <Button
                    color="primary"
                    variant="ghost"
                    startContent={<FaCheckCircle />}
                    onClick={() => addStateCallback(0)}
                >
                    Atras
                </Button>
            </div>
        );
    }
}

export default OrderFillForm;
