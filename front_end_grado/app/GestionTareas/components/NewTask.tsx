import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { BASE_URL } from "@/config/globals";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { useState } from "react";
import DateTimePickerHtml from "../../../components/DateTimePickerHtml";
import { toast } from "react-toastify";
import { TaskItem, useTask } from "../providers/TaskProvider";

type NewTaskProps = {
  onAddTaskOne: (newTask: TaskItem) => void;
  onAddTaskTwo: (newTask: TaskItem) => void;
}

const NewTask = ({onAddTaskOne, onAddTaskTwo} :NewTaskProps ) => {
  // Importing method from provider
  const { addTask } = useTask();
  // State for modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // States for callbacks
  const [newTitle, setTitle] = useState<string>("");
  const [newTask, setTask] = useState<string>("");
  const [newWorkShop, setnewWorkShop] = useState<number | string>('');
  const [publicationDate, setPublicationDate] = useState<string>('');
  const [deadLineDate, setDeadLineDate] = useState<string>('');

  const workShop = [
    { label: "Taller 1", value: 1, description: "Asignación a taller de grado 1" },
    { label: "Taller 2", value: 2, description: "Asignación a taller de grado 2" },
  ];

  // Post function
  const postResource = async (): Promise<void> => {
    // URL of the endpoint
    const url: string = `${BASE_URL}task/`;

    const data = {
      titleTask: newTitle,
      task: newTask,
      isGradeoneortwo: newWorkShop,
      publicationDate: parseAndFormatDate(publicationDate),
      deadline: parseAndFormatDate(deadLineDate),
    }
    try {
      if (newTitle != "" && newTask != "" && newWorkShop != "" && publicationDate != "" && deadLineDate != "") {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status == 201) {
          const taskResponse: TaskItem = response.data["result"];
          // Adding to values to the callbacks
          if (taskResponse.isGradeoneortwo == 1) handleFirstWorkshopMap(taskResponse);
          else if (taskResponse.isGradeoneortwo == 2) handleSecondWorkshopMap(taskResponse);
          addTask(taskResponse);
          toast.success("Nueva tarea creada")
        }
      }
      onClose();
    } catch (error: any) {
      // Handle errors (Axios errors have a 'response' property)
      toast.error("Error al crear información pública")
      onClose();
    }
  }

  const mutation = useMutation({
    mutationFn: postResource,
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

  // Callback for title field
  const handleTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value)
  }

  // Call back for info field
  const handleTask = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTask(e.target.value)
  }

  // Call back for workshop
  const handleWorkshop = (value: number | string) => {
    setnewWorkShop(value);
  };

  // Callback for the publication date
  const handlePublicationDateChange = (dateTime: string) => {
    setPublicationDate(dateTime);
  }

  // Callback for the deadline date
  const handleDeadLineChange = (dateTime: string) => {
    setDeadLineDate(dateTime);
  }

  // Callback for the first workshop map
  const handleFirstWorkshopMap = (task: TaskItem) => {
    onAddTaskOne(task);
  }

  // Callback for the second workshop map
  const handleSecondWorkshopMap = (task: TaskItem) => {
    onAddTaskTwo(task);
  }

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

  return (
    <div className="flex justify-end">
      <Button
        color="primary"
        radius="full"
        variant="shadow"
        endContent={<FaPlusCircle />}
        onPress={onOpen}
      >
        Nueva tarea
      </Button>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-5">Nueva tarea</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isRequired
                  label="Título de tarea"
                  placeholder="Ingresa un título"
                  variant="bordered"
                  onChange={handleTitle}
                />
                <Textarea
                  isRequired
                  label="Descripción"
                  variant="bordered"
                  placeholder="Ingresa descripción de la tarea"
                  onChange={handleTask}
                />
                <Select
                  label="Asignación de tarea"
                  placeholder="Selecciona el taller"
                  onChange={(value) => handleWorkshop(value.target.value)}
                >
                  {workShop.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>

                <DateTimePickerHtml title="Fecha de publicación" onChange={handlePublicationDateChange} dateValue="" />

                <DateTimePickerHtml title="Fecha límite" onChange={handleDeadLineChange} dateValue="" />

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                  Cancelar
                </Button>
                <Button color="success" variant="ghost" startContent={<FaPlusCircle />} onClick={() => { mutation.mutate() }}>
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default NewTask;