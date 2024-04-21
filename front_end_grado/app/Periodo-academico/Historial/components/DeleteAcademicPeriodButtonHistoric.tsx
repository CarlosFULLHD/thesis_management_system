import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tooltip, useDisclosure, Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { toast } from "react-toastify";
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import { AcademicPeriodItem, useAcademicPeriod } from "../../providers/AcademicPeriodProvider";

interface DeleteAcademicPeriodButtonProps {
    idAcad: number
}
const DeleteAcademicPeriodButtonHistoric = ({ idAcad }: DeleteAcademicPeriodButtonProps) => {
    // Importing data and method from provider
    const { getAcademicPeriodById, removeAcademicPeriodList } = useAcademicPeriod();

    const academicItem: AcademicPeriodItem | undefined = getAcademicPeriodById(idAcad);

    // Modal state
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // Delete request
    const deleteResource = async (id: number): Promise<void> => {
        console.log(idAcad)
        // Endpoint URL
        const url: string = `${BASE_URL}academic-period?idAcad=${idAcad}`;
        try {
            // Delete method with axios
            const response = await axios.delete(url);
            if (response.status >= 200 && response.status < 300) {
                removeAcademicPeriodList(idAcad)// Updating provider
                toast.success(`Periodo académico Semestre ${academicItem!.semester} eliminado`);
            } else {
                toast.error("Error al periodo académico");
            }
            onClose();
        } catch (error: any) {
            toast.error("Error al periodo académico");
            onClose();
        }
    }
    return (
        <>
            <div className="flex gap-4 items-center">
                <Tooltip color="danger" content="Eliminar periodo">
                    <Button
                        key="blur"
                        color="danger"
                        variant="ghost"
                        onPress={onOpen}
                    >
                        <FaTrash />
                    </Button>
                </Tooltip>
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">¿Seguro que desea borrar el periodo académico {academicItem!.semester}?</ModalHeader>
                            <ModalBody>
                                <Card className="max-w-[400px]">
                                    <CardHeader className="flex gap-3">
                                        <div className="flex flex-col">
                                            <p className="text-md">Si borra este periodo, se eliminaran todas las tareas vinculadas al este</p>
                            
                                        </div>
                                    </CardHeader>
                                    
                                </Card>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                    NO
                                </Button>
                                <Button color="success" variant="ghost" onPress={() => deleteResource(idAcad)} startContent={<FaCheck />}>
                                    SI
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteAcademicPeriodButtonHistoric;