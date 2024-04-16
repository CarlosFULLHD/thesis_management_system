import { FaRegListAlt, FaTimes } from 'react-icons/fa';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Divider, Input } from "@nextui-org/react";
import { useAcademicPeriod } from '../../providers/AcademicPeriodProvider';


const DetailsAcademicPeriodButton = () => {
    // Importing data and method from provider
    const { mainAcademicPeriod } = useAcademicPeriod();
    // State for modal
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const formatDateForInput = (dateString:string) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);  // Cuts off seconds and timezone for correct input formatting
    };
    return (
        <div>
            <Tooltip color="secondary" content="Ver detalles">
                <Button
                    key="blur"
                    color="secondary"
                    variant="ghost"
                    onPress={onOpen}
                >
                    <FaRegListAlt />
                </Button>
            </Tooltip>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-5">SEMESTRE {mainAcademicPeriod.semester}</ModalHeader>
                            <Divider />
                            <ModalBody>
                                <div className="flex flex-col gap-4">
                                    <label>
                                        <strong>FECHA INICIO:</strong> Inicio de periodo académico<Input
                                            isReadOnly
                                            key="success"
                                            type="datetime-local"
                                            color="success"
                                            defaultValue={formatDateForInput(mainAcademicPeriod.initDate)}
                                            className="max-w-[220px]"
                                        />

                                    </label>
                                    <label>
                                        <strong>FECHA FINAL:</strong> Final de periodo académico<Input
                                            isReadOnly
                                            key="danger"
                                            type="datetime-local"
                                            color="danger"
                                            defaultValue={formatDateForInput(mainAcademicPeriod.endDate)}
                                            className="max-w-[220px]"
                                        />
                                    </label>
                                    <label>
                                        <strong>FECHA CUENTA:</strong> Se pueden crear cuentas hasta<Input
                                            isReadOnly
                                            key="primary"
                                            type="datetime-local"
                                            color="primary"
                                            placeholder="Enter your email"
                                            defaultValue={formatDateForInput(mainAcademicPeriod.endDate)}
                                            className="max-w-[220px]"
                                        />
                                    </label>
                                </div>


                            </ModalBody>
                            <Divider />
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                    Cerrar
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DetailsAcademicPeriodButton;