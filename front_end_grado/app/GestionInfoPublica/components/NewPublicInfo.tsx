import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { PublicInfoItem, usePublicInfo } from "../providers/PublicInfoProvider";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import { useState } from "react";

const NewPublicInfo = () => {

    const { addPublicInfo } = usePublicInfo();

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [newTitle, setTitle] = useState("")

    const handleTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setTitle(e.target.value)
    }

    const [newInformation, setInfo] = useState("");

    const handleInfo = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setInfo(e.target.value)
    }

    const postResource = async (): Promise<void> => {
        // URL of the endpoint
        const url: string = `${BASE_URL}publicInformation/new`;
    
        const data = {
          roleHasPersonIdRolePer: {
            idRolePer: 1 // Need to be change it for the current user loged in
          },
          title: newTitle,
          information: newInformation,
        };
        try {
          if (newTitle != "" || newInformation != "") {
            const response = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const publicInfoResponse : PublicInfoItem = response.data["result"];
            addPublicInfo(publicInfoResponse);
          }
          onClose();
        } catch (error: any) {
          // Handle errors (Axios errors have a 'response' property)
          console.error('Error durante la eliminación:', error.response?.data || error.message);
          onClose();
        }
      }

    const mutation = useMutation({
        mutationFn: postResource,
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
                            <ModalHeader className="flex flex-col gap-1">Nueva información pública</ModalHeader>
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