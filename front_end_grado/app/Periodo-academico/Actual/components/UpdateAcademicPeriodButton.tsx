import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Tooltip, Divider } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/config/globals";
import { toast } from "react-toastify";
import { useAcademicPeriod } from '../../providers/AcademicPeriodProvider';
import { ChangeEvent, useState } from 'react';

interface UpdateAcademicPeriodButtonProps {
    idAcad: number;
}

const UpdateAcademicPeriodButton = ({ idAcad }: UpdateAcademicPeriodButtonProps) => {
    // Importing provider
    const { mainAcademicPeriod, fetchAcademicPeriodList } = useAcademicPeriod();
    // State for the modals
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // Date parser
    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);  // Cuts off seconds and timezone for correct input formatting
    };

    // State for date callbacks
    const [initDate, setInitDate] = useState<string>(formatDateForInput(mainAcademicPeriod.initDate));
    const [deadLineDate, setDeadLineDate] = useState<string>(formatDateForInput(mainAcademicPeriod.endDate));
    const [accountUntil, setAccountUntil] = useState<string>(formatDateForInput(mainAcademicPeriod.accountUntil))

    // Callback for the init date
    const handleInitDate = (event: ChangeEvent<HTMLInputElement>): void => {
        setInitDate(event.target.value);
    };

    // Callback for the deadline date
    const handleDeadLine = (event: ChangeEvent<HTMLInputElement>) => {
        setDeadLineDate(event.target.value);
    }

    // Callback for account until
    const handleAccountUntil = (event: ChangeEvent<HTMLInputElement>) => {
        setAccountUntil(event.target.value);
    }


    const callTheShit = () => {
        console.log(initDate);
        console.log(deadLineDate);
        console.log(accountUntil);
    }



    return (
        <div>
            <Tooltip color="primary" content="Modificar periodo">
                <Button
                    key="blur"
                    color="primary"
                    variant="ghost"
                    onPress={onOpen}
                >
                    <FaEdit />
                </Button>
            </Tooltip>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">¿Modificar semestre {mainAcademicPeriod.semester}?</ModalHeader>
                            <Divider/>
                            <ModalBody>
                                <div className="flex flex-col gap-4">
                                    <label>
                                        <strong>FECHA INICIO:</strong> Inicio de periodo académico<Input
                                            key="success"
                                            type="datetime-local"
                                            color="success"
                                            defaultValue={initDate}
                                            className="max-w-[220px]"
                                            onChange={handleInitDate}
                                        />

                                    </label>
                                    <label>
                                        <strong>FECHA FINAL:</strong> Final de periodo académico<Input
                                            key="danger"
                                            type="datetime-local"
                                            color="danger"
                                            defaultValue={deadLineDate}
                                            className="max-w-[220px]"
                                            onChange={handleDeadLine}
                                        />
                                    </label>
                                    <label>
                                        <strong>FECHA CUENTA:</strong> Se pueden crear cuentas hasta<Input
                                            key="primary"
                                            type="datetime-local"
                                            color="primary"
                                            placeholder="Enter your email"
                                            defaultValue={accountUntil}
                                            className="max-w-[220px]"
                                            onChange={handleAccountUntil}
                                        />
                                    </label>
                                </div>
                            </ModalBody>
                            <Divider/>
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                    NO
                                </Button>
                                <Button color="success" variant="ghost" onPress={callTheShit}  startContent={<FaCheck />}>
                                    SI
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default UpdateAcademicPeriodButton;