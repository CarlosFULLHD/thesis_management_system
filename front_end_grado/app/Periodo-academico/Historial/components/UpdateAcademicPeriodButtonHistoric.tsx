import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Tooltip, Divider } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/config/globals";
import { toast } from "react-toastify";
import { AcademicPeriodItem, useAcademicPeriod } from '../../providers/AcademicPeriodProvider';
import { useState } from 'react';
import DateTimePickerHtml from '@/components/DateTimePickerHtml';

interface UpdateAcademicPeriodButtonProps {
    idAcad: number;
}

const UpdateAcademicPeriodButtonHistoric = ({ idAcad }: UpdateAcademicPeriodButtonProps) => {
    // Importing provider
    const { getAcademicPeriodById, updateAcademicPeriodById } = useAcademicPeriod();

    const localAcademicPeriod: AcademicPeriodItem | undefined = getAcademicPeriodById(idAcad);

    // State for the modals
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


    // State for date callbacks
    const [initDate, setInitDate] = useState<string>(localAcademicPeriod!.initDate);
    const [deadLineDate, setDeadLineDate] = useState<string>(localAcademicPeriod!.endDate);
    const [accountUntil, setAccountUntil] = useState<string>(localAcademicPeriod!.accountUntil);

    // Callback for the init date
    const handleInitDate = (newDate: string): void => {
        setInitDate(newDate);
    };

    // Callback for the deadline date
    const handleDeadLine = (newDate: string) => {
        setDeadLineDate(newDate);
    }

    // Callback for account until
    const handleAccountUntil = (newDate: string) => {
        setAccountUntil(newDate);
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

    // Update request method
    const updateResource = async (): Promise<void> => {
        // URL of the endpoint
        const url: string = `${BASE_URL}academic-period/`;

        const data = {
            idAcad: idAcad,
            initDate: parseAndFormatDate(initDate),
            endDate: parseAndFormatDate(deadLineDate),
            accountUntil: parseAndFormatDate(accountUntil),
        };
        try {
            if (initDate != localAcademicPeriod!.initDate || deadLineDate != localAcademicPeriod!.endDate || accountUntil != localAcademicPeriod!.accountUntil) {
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (response.status == 200) {
                    var updatedAcadPeriod: AcademicPeriodItem = {
                        idAcad: idAcad,
                        initDate: responseDateParse(initDate),
                        endDate: responseDateParse(deadLineDate),
                        accountUntil: responseDateParse(accountUntil),
                        semester: localAcademicPeriod!.semester,
                        status: 1,
                        createdAt: localAcademicPeriod!.createdAt
                    }
                    updateAcademicPeriodById(idAcad, updatedAcadPeriod)
                    toast.success("Periodo académico actual modificado")
                } else {
                    toast.error("Error al modificar periodo académico")
                }
            }
            else {
                toast.error("Todos los campos son iguales al original")
            }
            onClose();
        } catch (error: any) {
            toast.error("Error al modificar periodo académico hola si")
            onClose();
        }
    }


    const responseDateParse = (isoString: string): string => {
        // Parse the ISO string to a Date object
        const date = new Date(isoString);

        // Function to pad single digit numbers with a leading zero
        const pad = (num: number) => num.toString().padStart(2, '0');

        // Construct date parts
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // getMonth() is zero-based
        const day = pad(date.getDate());

        // Adjust time by subtracting 4 hours to match the example given
        date.setHours(date.getHours() - 4);

        // Construct time parts
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        // Return the formatted string
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
                            <ModalHeader className="flex flex-col gap-1">¿Modificar semestre {localAcademicPeriod!.semester}?</ModalHeader>
                            <Divider />
                            <ModalBody>
                                <div className="flex flex-col gap-4">
                                    <label>
                                        <strong>FECHA INICIO:</strong> Inicio de periodo académico
                                        <DateTimePickerHtml onChange={handleInitDate} dateValue={initDate} bgColorClass='bg-custom-green' fontColorClass='text-custom-green-font'/>

                                    </label>
                                    <label>
                                        <strong>FECHA FINAL:</strong> Final de periodo académico
                                        <DateTimePickerHtml onChange={handleDeadLine} dateValue={deadLineDate} bgColorClass='bg-custom-red' fontColorClass='text-custom-red-font'/>
                                    </label>
                                    <label>
                                        <strong>FECHA CUENTA:</strong> Se pueden crear cuentas hasta
                                        <DateTimePickerHtml onChange={handleAccountUntil} dateValue={accountUntil} bgColorClass='bg-custom-blue' fontColorClass='text-custom-blue-font' />
                                    </label>
                                </div>
                            </ModalBody>
                            <Divider />
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
    )
}

export default UpdateAcademicPeriodButtonHistoric;