import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import DateTimePickerHtml from "../../../components/DateTimePickerHtml";
import { toast } from "react-toastify";
import { TaskItem, useTask } from "../providers/TaskProvider";

interface UpdateTaskButtonProps {
    idTask: number;
    updateCallBack: (taskId: number, newTaskEntry: TaskItem) => void;
    deleteCallBack: (taskId: number) => void;
}

const UpdateTaskButton = ({ idTask, updateCallBack, deleteCallBack }: UpdateTaskButtonProps) => {
    // Importing data and method from provider
    const { taskMap, updateTaskInfo } = useTask();
    // State for the modals
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    // Fetching props
    const taskEntry = taskMap.get(idTask)!;

    // Getting is_gradeoneortwo original value
    const isGrade : number = taskEntry.isGradeoneortwo;

    // State for the title_task field
    const [newTaskTitle, setTaskTitle] = useState(taskEntry.titleTask)
    // Callback for the title
    const handleTaskTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTaskTitle(e.target.value)
    }
    // State for the new task Field
    const [newTask, setTask] = useState(taskEntry.task);
    // Callback for the task field
    const handleTask = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTask(e.target.value)
    }

    const workShop = [
        { label: "Taller 1", value: 1, description: "Asignación a taller de grado 1" },
        { label: "Taller 2", value: 2, description: "Asignación a taller de grado 2" },
    ];
    // State for the new is grade one or two
    const [newWorkShop, setnewWorkShop] = useState<number | string>(taskEntry.isGradeoneortwo);

    // Call back for workshop
    const handleWorkshop = (value: number | string) => {
        setnewWorkShop(Number(value));
    };

    // Date parser for the backEnd
    const parseAndFormatDate = (inputDate: string): string => {
        const dateObject = new Date(inputDate);

        // Extract date components
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // January is 0
        const day = dateObject.getDate().toString().padStart(2, '0');
        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        const seconds = dateObject.getSeconds().toString().padStart(2, '0');

        // Format the date string
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return formattedDate;
    };

    // State for date callbacks
    const [publicationDate, setPublicationDate] = useState<string>(parseAndFormatDate(taskEntry.publicationDate.toString()));
    const [deadLineDate, setDeadLineDate] = useState<string>(parseAndFormatDate(taskEntry.deadline.toString()));

    // Callback for the publication date
    const handlePublicationDateChange = (dateTime: string) => {
        setPublicationDate(dateTime);
    }

    // Callback for the deadline date
    const handleDeadLineChange = (dateTime: string) => {
        setDeadLineDate(dateTime);
    }

    // Update request method
    const updateResource = async (): Promise<void> => {
        // Endpoint URL
        const url: string = `${BASE_URL}task/`;

        const data = {
            idTask: idTask,
            titleTask: newTaskTitle,
            task: newTask,
            isGradeoneortwo: newWorkShop,
            publicationDate: parseAndFormatDate(publicationDate),
            deadline: parseAndFormatDate(deadLineDate)
        };
        try {
            if (newTaskTitle != taskEntry.titleTask || newTask != taskEntry.task || newWorkShop != taskEntry.isGradeoneortwo || publicationDate != taskEntry.publicationDate.toString() || deadLineDate != taskEntry.deadline.toString()) {
                const response = await axios.put(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                taskEntry.titleTask = newTaskTitle;
                taskEntry.task = newTask;
                taskEntry.isGradeoneortwo = Number(newWorkShop);
                taskEntry.publicationDate = new Date(parseAndFormatDate(publicationDate))
                taskEntry.deadline = new Date(parseAndFormatDate(deadLineDate))
                if (response.status >= 200 && response.status < 300) {
                    if (isGrade != Number(newWorkShop)){
                        deleteCallBack(idTask);
                    }
                    updateCallBack(idTask, taskEntry)   // Updating callback
                    updateTaskInfo(idTask, taskEntry); // Updating provider
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
        <div>
            <Button
                key="blur"
                //as={Link}
                color="primary"
                variant="ghost"
                startContent={<FaEdit />}
                onPress={onOpen}
            >
                Modificar
            </Button>
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
                                <Select
                                    label="Asignación de tarea"
                                    placeholder="Selecciona el taller"
                                    value={newWorkShop}
                                    onChange={(value) => handleWorkshop(value.target.value)}
                                >
                                    {workShop.map((animal) => (
                                        <SelectItem key={animal.value} value={animal.value}>
                                            {animal.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <DateTimePickerHtml title="Fecha de publicación" onChange={handlePublicationDateChange} dateValue={publicationDate} />
                                <DateTimePickerHtml title="Fecha límite" onChange={handleDeadLineChange} dateValue={deadLineDate} />
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
        </div>
    );


}

export default UpdateTaskButton;

