import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { toast } from "react-toastify";
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import { TaskItem, useTask } from "../../providers/TaskProvider";
interface DeleteTaskButtonProps {
    idTask: number,
}

const DeleteTaskButton = ({ idTask }: DeleteTaskButtonProps) => {

    // Importing data and method from provider
    const { getTaskById, removeTaskList } = useTask();
    // Modal state
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const taskItem: TaskItem | undefined = getTaskById(idTask);

    // Delete request
    const deleteResource = async (id: number): Promise<void> => {
        // Endpoint URL
        const url: string = `${BASE_URL}task?idTask=${id}`;
        try {
            // Delete method with axios
            const response = await axios.delete(url);
            if (response.status >= 200 && response.status < 300) {
                removeTaskList(id)
                toast.success(`Tarea ${taskItem!.titleTask} eliminada`);
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
            <div className="flex gap-4 items-center">
                <Button
                    key="blur"
                    onPress={onOpen}
                    color="danger"
                    variant="ghost"
                    startContent={<FaTrash />}
                >
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
                                            <p className="text-md"><b>Tarea: </b>{taskItem!.titleTask}</p>
                                            <p className="text-small text-default-500"><b>Fecha Creado: </b>  {taskItem!.createdAt.toString()}</p>
                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        <p className="text-md"><b>Descripcion </b></p>
                                        <p>{taskItem!.task}</p>
                                    </CardBody>
                                    <Divider />
                                    <CardFooter>
                                        <p className="text-small text-default-500"><b>Pertenece: </b> {"Taller de grado 1"}</p>
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