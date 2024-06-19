import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider, Input } from "@nextui-org/react";
import { Captions } from "lucide-react";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { useGradeProfileLecturerCollection } from "../providers/gradeProfileLecturerCollectionProvider";
import { useState } from "react";
import { toast } from "react-toastify";

interface TitleButonProps {
    isDisabled: boolean
    idGradePro: number
    title: string
}

const TitleButton = ({ isDisabled, idGradePro, title }: TitleButonProps) => {
    // State for modal
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // Importing data and methods from provider
    const { assignTitle } = useGradeProfileLecturerCollection();
    // Method to change the title
    const changeTitle= async () => {
        var flag:boolean = await assignTitle(idGradePro,newTitle);
        if (!flag){
            toast.error("Error con la conexión")
            onClose();
            return;
        }
        toast.success("Título asignado correctamente")
        onClose();
    }
    // State for the title
    const [newTitle, setNewTitle] = useState(title)
    return (
        <>
            <div className="col-span-1">
                <Button className="w-12 h-12" isIconOnly variant="faded" isDisabled={isDisabled}
                    onPress={onOpen}
                > {/* Adjust the width as needed */}
                    <Captions />
                </Button>
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-5">Asignar nuevo título</ModalHeader>
                            <Divider />
                            <ModalBody>
                                <Input
                                    fullWidth
                                    variant="bordered"
                                    label="Nuevo título"
                                    placeholder="Ingrese nuevo título"
                                    value={newTitle}
                                    onChange={(event) => setNewTitle(event.target.value)}
                                    onClear={() => setNewTitle("")}
                                    isClearable
                                    required
                                />

                            </ModalBody>
                            <Divider />
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                    Cancelar
                                </Button>
                                <Button color="success" variant="ghost" startContent={<FaPlusCircle />} onClick={() => { changeTitle()}}>
                                    Asignar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default TitleButton;