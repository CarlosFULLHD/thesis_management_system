import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { PublicInfoItem, usePublicInfo } from "../providers/PublicInfoProvider";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import { useState } from "react";
import DateTimePickerHtml from "./DateTimePickerHtml";
import { toast } from "react-toastify";



const NewPublicInfo = () => {

  const { addPublicInfo } = usePublicInfo();

  // State for modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // States for callbacks
  const [newTitle, setTitle] = useState("")
  const [publicationDate, setPublicationDate] = useState<string>('');
  const [deadLineDate, setDeadLineDate] = useState<string>('');
  const [newInformation, setInfo] = useState("");

  

  // Post function
  const postResource = async (): Promise<void> => {
    // URL of the endpoint
    const url: string = `${BASE_URL}publicInformation/new`;

    const data = {
      usersIdUsers: {
        idUsers: 1 // Need to be change it for the current user loged in
      },
      title: newTitle,
      information: newInformation,
      publicationDate: parseAndFormatDate(publicationDate),
      deadline: parseAndFormatDate(deadLineDate),
    };
    try {
      if (newTitle != "" || newInformation != "") {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const publicInfoResponse: PublicInfoItem = response.data["result"];
        addPublicInfo(publicInfoResponse);
        toast.success("Información pública creada")
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
  const handleInfo = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInfo(e.target.value)
  }

  // Callback for the publication date
  const handlePublicationDateChange = (dateTime: string) => {
    setPublicationDate(dateTime);
  }

  // Callback for the deadline date
  const handleDeadLineChange = (dateTime: string) => {
    setDeadLineDate(dateTime);
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
        Nueva noticia
      </Button>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-5">Nueva información pública</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isRequired
                  label="Título"
                  placeholder="Ingresa un título"
                  variant="bordered"
                  onChange={handleTitle}
                />
                <Textarea
                  isRequired
                  label="Contenido"
                  variant="bordered"
                  placeholder="Ingresa el contenido de la información"
                  onChange={handleInfo}
                />
    
                <DateTimePickerHtml title="Fecha de publicación" onChange={handlePublicationDateChange} dateValue=""/>

                <DateTimePickerHtml title="Fecha límite" onChange={handleDeadLineChange} dateValue = ""/>

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

export default NewPublicInfo;