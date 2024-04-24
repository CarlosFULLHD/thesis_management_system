import { useAcademicPeriod } from "@/app/Periodo-academico/providers/AcademicPeriodProvider";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/react";
import { FaCheck, FaCheckCircle, FaPlusCircle, FaTimes } from "react-icons/fa";

const EmptyModal = () => {

        // State for modal
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // Importing state from academicperiod provider
    const { mainAcademicPeriod} = useAcademicPeriod();
    return(
        <div>
             <Modal backdrop="blur" onOpenChange={onOpenChange} scrollBehavior="outside" defaultOpen >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="bg-red-500">SEMESTRE {mainAcademicPeriod.semester} no tiene tareas</ModalHeader>
                                <Divider />
                                <ModalBody>
                                <p>SEMESTRE { mainAcademicPeriod.semester } Taller de grado I sin tareas, elija el orden y las tareas de la siguiente lista</p>
                                </ModalBody>
                                <Divider />
                                <ModalFooter >
                                    <Button color="primary" variant="ghost" onPress={onClose} startContent={<FaCheckCircle />}>
                                        Aceptar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
    );
}

export default EmptyModal;