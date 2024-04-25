import { useQuery } from "@tanstack/react-query";
import {
    Card, CardBody, CardHeader, CircularProgress, Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
} from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { TaskHasDateInterface, useTaskHasDate } from "@/app/Periodo-academico/providers/TaskHasDateProvider";
import { useAcademicPeriod } from "@/app/Periodo-academico/providers/AcademicPeriodProvider";
import { useSearchParams } from "next/navigation";
import EmptyModal from "./EmptyModal";
import EmptyTaskList from "./EmptyTaskList";
import { TaskItem, useTask } from "@/app/Gestion-tareas/providers/TaskProvider";
import OrderFillForm from "./OrderFillForm";


const CollectionOne = () => {
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
    const handlePublicationDateUpdate = (idTask: number, newPublicationDate: string) : void => {
        setTaskWithDateList((currentTasks: TaskHasDateInterface[]) => {
            const updatedTasks = currentTasks.map((task: TaskHasDateInterface) =>
                task.taskIdTask.idTask === idTask ? { ...task, publicationDate: newPublicationDate } : task
            );
            return updatedTasks;
        });
    }

    // Callback to handle deadline update
    const handleDeadline = (idTask: number, newDeadline: string) : void => {
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

    


    const { isLoading, isError } = useQuery({
        queryKey: ["taskTable"],
        queryFn: async () => {
            await loadTaskHasDateFromDB(parseInt(idAcad!));
            await loadAcademicPeriodByItsIdFromDB(parseInt(idAcad!));
            await loadActiveTasksFromDB(1);
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
            <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-gray-200 p-4 rounded-lg shadow-md">
                <button onClick={toggleReorder} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {isReorderEnabled ? "Lock Reorder" : "Unlock Reorder"}
                </button>

                <Reorder.Group
                    values={taskHasDateList}

                    onReorder={isReorderEnabled ? loadTaskHasDateList : () => { }}
                >
                    {taskHasDateList.map((item, index) => (
                        <Reorder.Item
                            value={item}
                            key={item.idTaskDate}
                            dragListener={isReorderEnabled}
                        >
                            <Card className="m-8">
                                <CardHeader>
                                    <div className="flex flex-col">
                                        <p className="text-md">Orden: {index + 1} <br /><b>Titulo: </b> {item.taskIdTask.titleTask}</p>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Table aria-label="Example dynamic collection table">
                                        <TableHeader>
                                            <TableColumn>Fecha creación</TableColumn>
                                            <TableColumn>Descripción</TableColumn>
                                            <TableColumn>Estado</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow key={item.taskIdTask.idTask}>
                                                <TableCell>{item.createdAt}</TableCell>
                                                <TableCell>{item.taskIdTask.task}</TableCell>
                                                <TableCell>
                                                    <Chip className="capitalize" color={item.status == 1 ? "success" : "danger"} size="sm" variant="flat">
                                                        {item.status == 1 ? "Activo" : "Pausado"}
                                                    </Chip>
                                                </TableCell>

                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        );
    }
    else {
        return (<div>
            <EmptyModal />
            <h1 className="ttext-2xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                TALLER DE GRADO 1 Semestre {mainAcademicPeriod.semester}
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



export default CollectionOne;