import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useState } from 'react';
import { BASE_URL } from '@/config/globals';
import axios from 'axios';

import { toast } from 'react-toastify';
import { useMutation } from "@tanstack/react-query";
import DateTimePickerHtml from '@/components/DateTimePickerHtml';
import { AcademicPeriodItem, useAcademicPeriod } from '../../providers/AcademicPeriodProvider';


const NewAcademicPeriodButton = () => {
    // Importing data and method from provider
    const { fetchMainAcademicPeriod} = useAcademicPeriod();
    // State for modal
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // State for callbacks
    const [initDate, setInitDate] = useState<string>('');
    const handleInitDate = (dateTime: string) => {
        setInitDate(dateTime);
    }
    const [endDate, setEndDate] = useState<string>('');
    const handleEndDate = (dateTime: string) => {
        setEndDate(dateTime);
    }
    const [accountUntil, setAccountUntil] = useState<string>('');
    const handleAccountUntil = (dateTime: string) => {
        setAccountUntil(dateTime);
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

    // Post function
    const postResource = async (): Promise<void> => {
        // URL of the endpoint
        const url: string = `${BASE_URL}academic-period/`;

        const data = {
            initDate: parseAndFormatDate(initDate),
            endDate: parseAndFormatDate(endDate),
            accountUntil: parseAndFormatDate(accountUntil)
        };
        try {
            if (initDate != "" || endDate != "" || accountUntil != "") {
                const response = await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status == 201) {
                    const currentDate: Date = new Date();
                    const currentYear: number = currentDate.getFullYear();
                    const currentMonth: number = currentDate.getMonth() + 1;
                    const currentSemester : string = `${currentMonth > 6 ? "II" : "I"} - ${currentYear}`
                    const AcademicPeriodResponse: AcademicPeriodItem = response.data["result"];
                    if (currentSemester == AcademicPeriodResponse.semester){
                        fetchMainAcademicPeriod(AcademicPeriodResponse)
                    }
                    console.log(AcademicPeriodResponse.semester)
                    toast.success("Periodo académico añadido")
                }
            }
            onClose();
        } catch (error: any) {
            // Handle errors (Axios errors have a 'response' property)
            toast.error("Error al añadir periodo académico")
            onClose();
        }
    }
    const mutation = useMutation({
        mutationFn: postResource,
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

        <div className="flex justify-end">
            <Button
                color="primary"
                radius="full"
                variant="shadow"
                endContent={<FaPlusCircle />}
                onPress={onOpen}
            >
                Nueva periodo
            </Button>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-5">Nueva información pública</ModalHeader>
                            <ModalBody>
                                <DateTimePickerHtml title="Fecha de inicio" onChange={handleInitDate} dateValue="" />
                                <DateTimePickerHtml title="Fecha final" onChange={handleEndDate} dateValue="" />
                                <DateTimePickerHtml title="Fecha de inscripción" onChange={handleAccountUntil} dateValue="" />

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

export default NewAcademicPeriodButton;