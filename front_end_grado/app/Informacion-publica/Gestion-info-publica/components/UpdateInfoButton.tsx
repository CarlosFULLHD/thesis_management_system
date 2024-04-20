import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import { usePublicInfo } from "../providers/PublicInfoProvider";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/config/globals";
import axios from "axios";

import { toast } from "react-toastify";
import DateTimePickerHtml from "@/components/DateTimePickerHtml";

// Define an interface for the component's props
interface UpdateInfoButtonProps {
  idPublicInfo: number;
}

const UpdateInfoButton = ({ idPublicInfo }: UpdateInfoButtonProps) => {

  const { publicInfoMap, updatePublicInfo } = usePublicInfo();

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


  // State for the modals
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // Fetching props
  const publicInfoEntry = publicInfoMap.get(idPublicInfo)!;
  // State for the title field
  const [newTitle, setTitle] = useState(publicInfoEntry.title)
  // Callback for the title
  const handleTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value)
  }
  // State for the new information Field
  const [newInformation, setInfo] = useState(publicInfoEntry.information);
  // Callback for the information field
  const handleInfo = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInfo(e.target.value)
  }
  // State for date callbacks
  const [publicationDate, setPublicationDate] = useState<string>(parseAndFormatDate(publicInfoEntry.publicationDate.toString()));
  const [deadLineDate, setDeadLineDate] = useState<string>(parseAndFormatDate(publicInfoEntry.deadline.toString()));

  // Update request method
  const updateResource = async (): Promise<void> => {
    // URL of the endpoint
    const url: string = `${BASE_URL}publicInformation/`;

    const data = {
      idPublicInfo: idPublicInfo,
      usersIdUsers: {
        idUsers: 1 // Need to be change it for the current user loged in
      },
      title: newTitle,
      information: newInformation,
      publicationDate: parseAndFormatDate(publicationDate),
      deadline: parseAndFormatDate(deadLineDate)
    };
    try {
      if (newTitle != publicInfoEntry.title || newInformation != publicInfoEntry.information || publicationDate != publicInfoEntry.publicationDate.toString() || deadLineDate != publicInfoEntry.deadline.toString()) {
        const response = await axios.patch(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        publicInfoEntry.title = newTitle;
        publicInfoEntry.information = newInformation;
        publicInfoEntry.createdAt = new Date
        publicInfoEntry.publicationDate = new Date(parseAndFormatDate(publicationDate))
        publicInfoEntry.deadline = new Date(parseAndFormatDate(deadLineDate))
        if (response.status >= 200 && response.status < 300) {
          updatePublicInfo(idPublicInfo, publicInfoEntry);
          toast.success("Información modificada")
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

  // Callback for the publication date
  const handlePublicationDateChange = (dateTime: string) => {
    setPublicationDate(dateTime);
  }

  // Callback for the deadline date
  const handleDeadLineChange = (dateTime: string) => {
    setDeadLineDate(dateTime);
  }



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
              <ModalHeader className="flex flex-col gap-1">¿Modificar esta información?</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isRequired
                  label="Título"
                  placeholder="Ingresa un título"
                  variant="bordered"
                  defaultValue={newTitle}
                  onChange={handleTitle}
                />
                <Textarea
                  isRequired
                  label="Contenido"
                  variant="bordered"
                  placeholder="Ingresa el contenido de la información"
                  defaultValue={newInformation}
                  onChange={handleInfo}
                />
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
};

export default UpdateInfoButton;
