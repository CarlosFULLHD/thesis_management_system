import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/react";
import { EarthLock } from "lucide-react";
import { FaPlusCircle, FaTimes } from "react-icons/fa";

interface GraduationButtonProps {
    isDisabled: boolean
    idGradePro: number
}

const GraduationButton = ({ isDisabled, idGradePro }: GraduationButtonProps) => {
    // State for modal
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <>
            <div className="col-span-1">
                <Button className="w-16" isIconOnly variant="faded" isDisabled={isDisabled}
                    onPress={onOpen}
                > {/* Adjust the width as needed */}
                    <EarthLock />
                </Button>
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-5">Asignar modalidad de graduación</ModalHeader>
                            <Divider />
                            <ModalBody>


                            </ModalBody>
                            <Divider />
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                    Cancelar
                                </Button>
                                <Button color="success" variant="ghost" startContent={<FaPlusCircle />} onClick={() => { }}>
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

export default GraduationButton;