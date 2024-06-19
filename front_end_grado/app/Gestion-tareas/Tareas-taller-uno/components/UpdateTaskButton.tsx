import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardHeader, CardBody, CardFooter, Divider, Input, Textarea } from "@nextui-org/react";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import { TaskItem, useTask } from "../../providers/TaskProvider";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
interface UpdateTaskButtonProps {
    idTask: number,
}

const UpateTaskButton = ({ idTask }: UpdateTaskButtonProps) => {

    // Importing data and method from provider
    const { getTaskById, updateTaskListById } = useTask();
    // Modal state
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const taskItem: TaskItem | undefined = getTaskById(idTask);

    // State for the title_task field
    const [newTaskTitle, setTaskTitle] = useState(taskItem!.titleTask)
    // Callback for the title
    const handleTaskTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTaskTitle(e.target.value)
    }
    // State for the new task Field
    const [newTask, setTask] = useState(taskItem!.task);
    // Callback for the task field
    const handleTask = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTask(e.target.value)
    }


    // Update request method
    const updateResource = async (): Promise<void> => {
        // Endpoint URL
        const url: string = `${BASE_URL}task/`;

        const data = {
            idTask: idTask,
            titleTask: newTaskTitle,
            task: newTask,
        };
        try {
            if (newTaskTitle != taskItem!.titleTask || newTask != taskItem!.task ) {
                const response = await axios.put(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                taskItem!.titleTask = newTaskTitle;
                taskItem!.task = newTask;
                if (response.status >= 200 && response.status < 300) {
                    updateTaskListById(idTask, taskItem!); // Updating provider
                    toast.success("Tarea modificada")
                } else {
                    toast.error("Error al modificar información")
                }
            }
            onClose();
        } catch (error: any) {
            // Handle errors (Axios errors have a 'response' property)
            toast.error("Error al modificar información")
            onClose();
        }
    }

    const mutation = useMutation({
        mutationFn: updateResource,
        onMutate: (variables) => {
            // console.log(variables)
        },
        onError: (error, variables, context) => {
            // console.log(error)
            // console.log(variables)
            // console.log(context)

        },
        onSuccess: (data, variables, context) => {
            // console.log(data)
            // console.log(variables)
            // console.log(context)
        },
        onSettled: (data, error, variables, context) => {
            // console.log(data)
            // console.log(error)
            // console.log(variables)
            // console.log(context)
        }
    })


    return (
        <>
            <div className="flex gap-4 items-center">
                <Button
                    key="blur"
                    onPress={onOpen}
                    color="primary"
                    variant="ghost"
                // startContent={<FaEdit />}
                >
                    <FaEdit />
                </Button>
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">¿Modificar esta tarea?</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    isRequired
                                    label="Título de tarea"
                                    placeholder="Ingresa un título"
                                    variant="bordered"
                                    onChange={handleTaskTitle}
                                    defaultValue={newTaskTitle}
                                />
                                <Textarea
                                    isRequired
                                    label="Descripción"
                                    variant="bordered"
                                    placeholder="Ingresa descripción de la tarea"
                                    defaultValue={newTask}
                                    onChange={handleTask}
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                    NO
                                </Button>
                                <Button color="success" variant="ghost" onClick={() => { mutation.mutate() }} startContent={<FaCheck />}>
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
export default UpateTaskButton;