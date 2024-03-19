import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import { usePublicInfo } from "../providers/PublicInfoProvider";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/config/globals";
import axios from "axios";

// Define an interface for the component's props
interface UpdateInfoButtonProps {
  idPublicInfo: number;
}

const UpdateInfoButton = ({ idPublicInfo }: UpdateInfoButtonProps) => {

  const { publicInfoMap, updatePublicInfo } = usePublicInfo();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const publicInfoEntry = publicInfoMap.get(idPublicInfo)!;

  const [newTitle, setTitle] = useState(publicInfoEntry.title)

  const handleTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value)
  }

  const [newInformation, setInfo] = useState(publicInfoEntry.information);

  const handleInfo = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInfo(e.target.value)
  }

  const updateResource = async (): Promise<void> => {
    // URL of the endpoint
    const url: string = `${BASE_URL}publicInformation/`;

    const data = {
      idPublicInfo: idPublicInfo,
      roleHasPersonIdRolePer: {
        idRolePer: publicInfoEntry.roleHasPersonIdRolePer.idRolePer // Need to be change it for the current user loged in
      },
      title: newTitle,
      information: newInformation,
    };
    try {
      if (newTitle != publicInfoEntry.title || newInformation != publicInfoEntry.information) {
        const response = await axios.patch(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        publicInfoEntry.title = newTitle;
        publicInfoEntry.information = newInformation;
        publicInfoEntry.createdAt = new Date
        updatePublicInfo(idPublicInfo, publicInfoEntry);
        
      }
      onClose();
    } catch (error: any) {
      // Handle errors (Axios errors have a 'response' property)
      console.error('Error durante la eliminación:', error.response?.data || error.message);
      onClose();
    }
  }


  const mutation = useMutation({
    mutationFn: updateResource,
    onMutate: (variables) => {
      console.log(variables)
    },
    onError: (error, variables, context) => {
      console.log(error)
      console.log(variables)
      console.log(context)

    },
    onSuccess: (data, variables, context) => {
      console.log(data)
      console.log(variables)
      console.log(context)
    },
    onSettled: (data, error, variables, context) => {
      console.log(data)
      console.log(error)
      console.log(variables)
      console.log(context)
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
