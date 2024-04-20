import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { TaskItem, useTask } from "../../providers/TaskProvider";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const AddTaskButton = () => {
  // State for modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // Importing method from provider
  const { addTaskList } = useTask();
  // States for callbacks
  const [newTitle, setTitle] = useState<string>("");
  const [newTask, setTask] = useState<string>("");
  // Callback for title field
  const handleTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value)
  }
  // Call back for info field
  const handleTask = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTask(e.target.value)
  }

   // Post function
   const postResource = async (): Promise<void> => {
    // URL of the endpoint
    const url: string = `${BASE_URL}task/`;

    const data = {
      titleTask: newTitle,
      task: newTask,
      isGradeoneortwo: 2
    }
    try {
      if (newTitle != "" && newTask != "") {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status == 201) {
          const taskResponse: TaskItem = response.data["result"];
          // Updating provider
          addTaskList(taskResponse);
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

export default AddTaskButton;