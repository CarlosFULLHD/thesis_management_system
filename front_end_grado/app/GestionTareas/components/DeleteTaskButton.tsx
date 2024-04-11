import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { toast } from "react-toastify";
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { TaskItem, useTask } from "../providers/TaskProvider";
import { BASE_URL } from "@/config/globals";
import axios from "axios";

interface DeleteTaskButtonProps {
    idTask: number,
    deleteCallBack: (taskId: number) => void;
}

const DeleteTaskButton = ({ idTask, deleteCallBack }: DeleteTaskButtonProps) => {

    // Importing data and method from provider
    const { taskMap, removeTask } = useTask();

    // Modal state
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    // Callback to delete map key:value
    const handleSecondWorkshopMap = (idTaskDelete: number) => {
        deleteCallBack(idTaskDelete);
    }

    // Obtaining task to be deleted from the map
    const taskEntry: TaskItem = taskMap.get(idTask)!;

    // Delete request
    const deleteResource = async (id: number): Promise<void> => {
        // Endpoint URL
        const url: string = `${BASE_URL}task?idTask=${id}`;
        try {
            // Delete method with axios
            const response = await axios.delete(url);
            if (response.status >= 200 && response.status < 300) {
                removeTask(id)
                handleSecondWorkshopMap(id);
                toast.success(`Tarea ${taskEntry.titleTask} eliminada`);
            } else {
                toast.error("Error al borrar tarea");
            }
            onClose();
        } catch (error: any) {
            toast.error("Error al borrar tarea");
            onClose();
        }
    }

    return (
        <>
            <div>
                <Button
                    key="blur"
                    onPress={onOpen}
                    color="danger"
                    variant="ghost"
                    startContent={<FaTrash />}
                >
                    Borrar
                </Button>
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">¿Seguro que desea borrar esta información?</ModalHeader>
                            <ModalBody>
                                <Card className="max-w-[400px]">
                                    <CardHeader className="flex gap-3">
                                        <div className="flex flex-col">
                                            <p className="text-md"><b>Tarea: </b>{taskEntry.titleTask}</p>
                                            <p className="text-small text-default-500"><b>Fecha Creado: </b>  {taskEntry.createdAt.toString()}</p>
                                            <p className="text-small text-default-500"><b>Fecha publicación: </b> {taskEntry.publicationDate.toString()}</p>
                                            <p className="text-small text-default-500"><b>Fecha límite: </b> {taskEntry.deadline.toString()}</p>

                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        <p className="text-md"><b>Contenido </b></p>
                                        <p>{taskEntry.task}</p>
                                    </CardBody>
                                    <Divider />
                                    <CardFooter>
                                        <p className="text-small text-default-500"><b>Pertenece: </b> {taskEntry.isGradeoneortwo == 1 ? "Taller 1" : taskEntry.isGradeoneortwo == 2 ? "Taller 2" : "Sin asignar"}</p>
                                    </CardFooter>
                                </Card>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                    NO
                                </Button>
                                <Button color="success" variant="ghost" onPress={() => deleteResource(idTask)} startContent={<FaCheck />}>

                                    SI
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    );
}

export default DeleteTaskButton;