import { BASE_URL } from "@/config/globals";

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
} from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { useTaskHasDate } from "@/app/Periodo-academico/providers/TaskHasDateProvider";
import { useAcademicPeriod } from "@/app/Periodo-academico/providers/AcademicPeriodProvider";
import { useSearchParams } from "next/navigation";

const CollectionOne = () => {

    // Router params 
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const idAcad = params.get("idAcad")


    // Importing state from taskHasDateProvider
    const { taskHasDateList, loadTaskHasDateFromDB, loadTaskHasDateList } = useTaskHasDate();
    // Importing state from academicperiod provider
    const { mainAcademicPeriod } = useAcademicPeriod();

    // State for lock the reorder list 
    const [isReorderEnabled, setIsReorderEnabled] = useState(true);
    // Callback for reorder list lock
    const toggleReorder = () => {
        setIsReorderEnabled(!isReorderEnabled);
    };

    const { isLoading, isError } = useQuery({
        queryKey: ["taskTable"],
        queryFn: async () => {
            await loadTaskHasDateFromDB(parseInt(idAcad!));
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
                                <CardFooter>
                                    <div className="flex items-center gap-8">
                                        {/* <Tooltip color="primary" content="Editar tarea">
                                                    <span className="text-lg text-primary cursor-pointer active:opacity-50">
                                                        <UpateTaskButton idTask={item.idTask} />
                                                    </span>
                                                </Tooltip>
                                                <Tooltip color="danger" content="Borrar tarea">
                                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                        <DeleteTaskButton idTask={item.idTask} />
                                                    </span>
                                                </Tooltip> */}
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
            <h1>No existen tareas Asignadas para este periodo académico</h1></div>;
    }
}



export default CollectionOne;