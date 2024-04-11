import { TaskItem } from "../providers/TaskProvider"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react"; // Next js table
import TaskTableSubtitle from "./TaskTableSubTitle";
import DeleteTaskButton from "./DeleteTaskButton";
import UpdateTaskButton from "./UpdateTaskButton";

type TaskTableComponentProps = {
    taskMap: Map<number, TaskItem>,
    title: string,
    workshop: string,
    deleteCallBack: (taskId: number) => void;
    updateCallBack : (taskId: number, newTaskEntry: TaskItem) => void;
}

const TaskTableComponent = ({ taskMap, title, workshop, deleteCallBack, updateCallBack}: TaskTableComponentProps) => {
    if (taskMap.size > 0){
        return (
            <div>
                <TaskTableSubtitle text={title} />
                <Table aria-label="Example dynamic collection table">
                    <TableHeader>
                        <TableColumn>Fecha creación</TableColumn>
                        <TableColumn>Título</TableColumn>
                        <TableColumn>Tarea</TableColumn>
                        <TableColumn>Asignado a</TableColumn>
                        <TableColumn>Fecha publicación</TableColumn>
                        <TableColumn>Fecha límite</TableColumn>
                        <TableColumn>Modificar</TableColumn>
                        <TableColumn>Eliminar</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {Array.from(taskMap.values()).map((task: TaskItem) => (
                            <TableRow key={task.idTask}>
                                <TableCell>{formatDate(task.createdAt)}</TableCell>
                                <TableCell>{task.titleTask}</TableCell>
                                <TableCell>{task.task}</TableCell>
                                <TableCell>{task.isGradeoneortwo == 1 ? "Taller 1" : task.isGradeoneortwo == 2 ? "Taller 2" : "Sin asignar"}</TableCell>
                                <TableCell>{formatDate(task.publicationDate)}</TableCell>
                                <TableCell>{formatDate(task.deadline)}</TableCell>                             
                                <TableCell><UpdateTaskButton idTask={task.idTask} updateCallBack= {updateCallBack} deleteCallBack={deleteCallBack}/></TableCell>
                                <TableCell><DeleteTaskButton idTask={task.idTask} deleteCallBack = {deleteCallBack} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    } else {
        return <div>No existen tareas asignadas para {workshop}</div>;
    }
    
};

function formatDate(dateInput: Date) {
    // Parse the dateInput to a Date object if it's not already one
    const date = new Date(dateInput);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading 0 if needed
    const day = date.getDate().toString().padStart(2, '0'); // Add leading 0 if needed
    const hours = date.getHours().toString().padStart(2, '0'); // Add leading 0 if needed
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading 0 if needed
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Add leading 0 if needed

    // Construct the formatted string
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default TaskTableComponent;

