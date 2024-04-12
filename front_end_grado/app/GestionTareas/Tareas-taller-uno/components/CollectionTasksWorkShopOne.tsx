import { BASE_URL } from "@/config/globals";
import { TaskItem, useTask } from "../../providers/TaskProvider";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
    Card, CardBody, CardFooter, CardHeader, CircularProgress, Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Tooltip,
} from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { useState } from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import UpateTaskButton from "./UpdateTaskButton";
import WorkShopTitle from "./WorkShopTitle";

const CollectionTasksWorkShopOne = () => {
    // Importing data and method from provider
    const { taskList, fetchTaskList } = useTask();

    const [dragList, setDragList] = useState<TaskItem[]>([]);


    // Fetch data function
    const fetchData = async () => fetch(`${BASE_URL}task/work-shop?isGradeoneortwo=1`).then((res) => res.json());

    // Loading state
    const loadTaskList = (responseData: any) => {
        // const taskMapItems: Map<number, TaskItem> = (new Map());
        var taskListItems: TaskItem[] = [];
        if (responseData.status == 200) {
            taskListItems = responseData["result"].map((task: TaskItem) => ({
                idTask: task.idTask,
                titleTask: task.titleTask,
                task: task.task,
                isGradeoneortwo: task.isGradeoneortwo,
                status: task.status,
                createdAt: task.createdAt // Convert string to Date object
            }));

        }
        setDragList(taskListItems)
        fetchTaskList(taskListItems); // Changing provider state
    }

    //Query that fetches the end point, being called as soon the component builds it self
    const { isLoading, isError } = useQuery({
        queryKey: ["taskTable"],
        queryFn: async () => {
            const data = await fetchData();
            loadTaskList(data)
            return data
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
            <div>
                <WorkShopTitle/>
                <Reorder.Group values={taskList} onReorder={fetchTaskList}>
                    {taskList.map((item, index) => (
                        <Reorder.Item value={item} key={item.idTask}>
                            <Card className="m-8">
                                <CardHeader>
                                    <div className="flex flex-col">
                                        <p className="text-md">Orden: {index + 1} <br /><b>Titulo: </b> {item.titleTask}</p>
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
                                            <TableRow key={item.idTask}>
                                                <TableCell>{item.createdAt}</TableCell>
                                                <TableCell>{item.task}</TableCell>
                                                <TableCell>
                                                    <Chip className="capitalize" color={item.status == 1 ? "success" : "danger"} size="sm" variant="flat">
                                                        {item.status == 1 ? "Activo" : "Pausado"}
                                                    </Chip>
                                                </TableCell>

                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardBody>
                                <CardFooter>
                                    <div className="flex items-center gap-8">
                                        <Tooltip color="primary" content="Editar tarea">
                                            <span className="text-lg text-primary cursor-pointer active:opacity-50">
                                                <UpateTaskButton idTask={item.idTask} />
                                            </span>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Borrar tarea">
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <DeleteTaskButton idTask={item.idTask} />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>


            </div>
        );
    }
    else {
        return <div>
            <h1>No existen tareas para taller de grado 1</h1></div>;
    }
}



export default CollectionTasksWorkShopOne;