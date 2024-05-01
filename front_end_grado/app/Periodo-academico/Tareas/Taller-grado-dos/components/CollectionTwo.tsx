import { useQuery } from "@tanstack/react-query";
import {
    Card, CardBody, CircularProgress,
    Chip,
    Divider,
    Checkbox,
    Input,
} from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { TaskHasDateInterface, useTaskHasDate } from "@/app/Periodo-academico/providers/TaskHasDateProvider";
import { useAcademicPeriod } from "@/app/Periodo-academico/providers/AcademicPeriodProvider";
import { useSearchParams } from "next/navigation";
import EmptyTaskList from "./EmptyTaskList";
import { TaskItem, useTask } from "@/app/Gestion-tareas/providers/TaskProvider";
import OrderFillForm from "./OrderFillForm";
import DateTimePickerHtml from "@/components/DateTimePickerHtml";


const CollectionTwo = () => {
    // Importing state from taskHasDateProvider
    const { taskHasDateList, loadTaskHasDateFromDB, loadTaskHasDateList } = useTaskHasDate();
    // Importing state from academicperiod provider
    const { mainAcademicPeriod, loadAcademicPeriodByItsIdFromDB } = useAcademicPeriod();
    // Importing data and method from provider
    const { loadActiveTasksFromDB, getTaskById } = useTask();

    // Router params 
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const idAcad = params.get("idAcad")

    // Add tasks academic period  callback state
    const [addState, setAddState] = useState<number>(0);

    // Callback to change the add tasks state
    const handleSetAddState = (newState: number) => {
        setAddState(newState)
    }

    // List of task that will be added
    const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
    // Add or remove tasks
    const handleCheckboxChange = (idTask: number) => (isSelected: boolean) => {
        if (isSelected) {
            // Add the task ID to the selectedTaskIds array if it's not already there
            setSelectedTaskIds(prevIds => [...prevIds, idTask]);
            addTaskAsDate(idTask)

        } else {
            // Remove the task ID from the selectedTaskIds array
            setSelectedTaskIds(prevIds => prevIds.filter(id => id !== idTask));
            removeTaskAsDate(idTask)

        }
    };

    // List of potential taskHasDate to add
    const [taskWithDateList, setTaskWithDateList] = useState<TaskHasDateInterface[]>([])
    // Add new task as TaskHasDate to the list
    const addTaskAsDate = (idTask: number) => {
        const newTaskEntry: TaskItem | undefined = getTaskById(idTask);
        const newTaskDateEnty: TaskHasDateInterface = {
            idTaskDate: -1,
            taskIdTask: newTaskEntry!,
            academicPeriodIdAcad: mainAcademicPeriod,
            publicationDate: "",
            deadline: "",
            orderIs: -1,
            isUrl: 0,
            isMeeting: 0,
            status: 1,
            createdAt: ""
        }
        setTaskWithDateList(prevList => [...prevList, newTaskDateEnty])
    }
    // Remove new task as TaskHasDate to the list
    const removeTaskAsDate = (idTask: number) => {
        setTaskWithDateList(prevIds => prevIds.filter(prevIds => prevIds.taskIdTask.idTask !== idTask));
    }

    // Change orderIs according to is position in the array 
    const setInitialOrder = () => {
        // Create a mapping of ID to current order position based on selectedTaskIds
        const idToOrder = new Map(selectedTaskIds.map((id, index) => [id, index + 1]));

        // Map over taskWithDateList to update orderIs based on the index derived from selectedTaskIds
        const updatedList = taskWithDateList.map(task => ({
            ...task,
            orderIs: idToOrder.get(task.taskIdTask.idTask) || task.orderIs // Use new order if available, else keep existing
        }));

        setTaskWithDateList(updatedList); // Update the state with the newly ordered list
    };

    // Clear selected taskList
    const clearSelectedTaskList = () => {
        setSelectedTaskIds([])
        setTaskWithDateList([])
    }

    // State for lock the reorder list 
    const [isReorderEnabled, setIsReorderEnabled] = useState(true);
    // Callback for reorder list lock
    const toggleReorder = () => {
        setIsReorderEnabled(!isReorderEnabled);
    };

    // Callback to handle update is url
    const updateTaskIsUrl = (idTask: number, newIsUrl: number): void => {
        setTaskWithDateList((currentTasks: TaskHasDateInterface[]) => {
            const updatedTasks = currentTasks.map((task: TaskHasDateInterface) =>
                task.taskIdTask.idTask === idTask ? { ...task, isUrl: newIsUrl } : task
            );
            return updatedTasks;
        });
    };
    // Callback to handle update is meeting
    const updateTaskIsMeeting = (idTask: number, newIsMeeting: number): void => {
        setTaskWithDateList((currentTasks: TaskHasDateInterface[]) => {
            const updatedTasks = currentTasks.map((task: TaskHasDateInterface) =>
                task.taskIdTask.idTask === idTask ? { ...task, isMeeting: newIsMeeting } : task
            );
            return updatedTasks;
        });
    }
    // Callback to handle publicationDate update
    const handlePublicationDateUpdate = (idTask: number, newPublicationDate: string): void => {
        setTaskWithDateList((currentTasks: TaskHasDateInterface[]) => {
            const updatedTasks = currentTasks.map((task: TaskHasDateInterface) =>
                task.taskIdTask.idTask === idTask ? { ...task, publicationDate: newPublicationDate } : task
            );
            return updatedTasks;
        });
    }

    // Callback to handle deadline update
    const handleDeadline = (idTask: number, newDeadline: string): void => {
        setTaskWithDateList((currentTasks: TaskHasDateInterface[]) => {
            const updatedTasks = currentTasks.map((task: TaskHasDateInterface) =>
                task.taskIdTask.idTask === idTask ? { ...task, deadline: newDeadline } : task
            );
            return updatedTasks;
        });
    }

    // Callback to handle reorder
    const handleReorder = (newList: TaskHasDateInterface[]) => {
        const updatedList = newList.map((task, index) => ({
            ...task,
            orderIs: index + 1// Update order based on new index
        }));
        setTaskWithDateList(updatedList);
    };

    // Date parser
    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);  // Cuts off seconds and timezone for correct input formatting
    };




    const { isLoading, isError } = useQuery({
        queryKey: ["taskTable"],
        queryFn: async () => {
            await loadTaskHasDateFromDB(parseInt(idAcad!),2); // Loading tasks with dates to be rendered at first if it's exists
            await loadAcademicPeriodByItsIdFromDB(parseInt(idAcad!)); // Load academic period
            await loadActiveTasksFromDB(2); // Load tasks to be render if the task has dates lists is empty
            return taskHasDateList
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
    if (taskHasDateList.length > 0) {
        return (
            <>
                <div>
                    <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                        Programación tareas Semestre {mainAcademicPeriod.semester}</h1>
                    <h3 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                        Taller de grado 2</h3>
                </div>
                <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-gray-200 p-4 rounded-lg shadow-md">

                    {taskHasDateList.map((item, index) => (

                        <Card className="m-8">
                            <CardBody>
                                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                    <div className="relative col-span-6 md:col-span-4 flex flex-col items-center justify-center space-y-2">
                                        <p className="text-md mt-2"><b>Tarea #{item.orderIs}</b></p>
                                        <Divider />
                                        <div className="flex flex-col items-start w-full">
                                            <Chip color="success" className="mb-4">
                                                <Checkbox
                                                    isSelected={item.isMeeting == 1}
                                                    color="warning"
                                                >
                                                    Necesita reunión</Checkbox>
                                            </Chip>
                                            <Chip color="warning">
                                                <Checkbox
                                                    isSelected={item.isUrl == 1}
                                                    color="success"
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
                                                    <Input
                                                        isReadOnly
                                                        key="danger"
                                                        type="datetime-local"
                                                        color="success"
                                                        defaultValue={formatDateForInput(item.publicationDate)}
                                                        className="max-w-[220px]"
                                                    />
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <span className="mr-2">Límite:</span>
                                                    <Input
                                                        isReadOnly
                                                        key="danger"
                                                        type="datetime-local"
                                                        color="danger"
                                                        defaultValue={formatDateForInput(item.deadline)}
                                                        className="max-w-[220px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                            <Divider />
                        </Card>
                    ))}
                </div>
            </>
        );
    }
    else {
        return (<div>


            <h1 className="ttext-2xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                TALLER DE GRADO 2 Semestre {mainAcademicPeriod.semester}
            </h1>
            {addState == 0
                ? <EmptyTaskList
                    addStateCallback={handleSetAddState}
                    selectedTaskIds={selectedTaskIds}
                    handleCheckboxChange={handleCheckboxChange}
                    clearSelectedTaskList={clearSelectedTaskList}
                    setInitialOrder={setInitialOrder}
                />
                : addState == 1
                    ? <OrderFillForm
                        addStateCallback={handleSetAddState}
                        taskWithDatesList={taskWithDateList}
                        updateIsUrl={updateTaskIsUrl}
                        updateIsMetting={updateTaskIsMeeting}
                        handleReorder={handleReorder}
                        handlePublicationDateUpdate={handlePublicationDateUpdate}
                        handleDeadline={handleDeadline}
                    />
                    : "error"}
        </div>);
    }
}



export default CollectionTwo;