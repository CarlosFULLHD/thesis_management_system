import DateTimePickerHtml from "@/components/DateTimePickerHtml";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/react";
import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { FormalDefenseInterface, useFormalDefense } from "../../providers/formalDefenseProvider";
import { useRouter, useSearchParams } from "next/navigation";

interface CreateFormalDefenseFormProps {
    idGradePro: number
}

const CreateFormalDefenseForm = ({ idGradePro }: CreateFormalDefenseFormProps) => {

    // Provider and methods
    const { postFormalDefenseItem } = useFormalDefense();

    // Modal state
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // State dates callbacks
    const [defenseDate, setDefenseDate] = useState<string>('');
    const handleDefenseDate = (dateTime: string) => {
        setDefenseDate(dateTime);
    }
    // Routing instance and params
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    // States for form inputs
    const [plpInvolved, setPlpInvolved] = useState<string[]>([""])
    const [meetingPlace, setMeetingPlace] = useState<string>("")
    const [feedback, setFeedback] = useState<string>("")


    // Method to add elements to plpInvolved list 
    const addNewPlpInvolved = () => {
        const updatedList = [...plpInvolved, ""];
        setPlpInvolved(updatedList);
    }
    // Method to modify the element of the array based on it's index
    const updateElementAtIndex = (index: number, newValue: string) => {
        const newArray = [...plpInvolved];
        newArray[index] = newValue;
        setPlpInvolved(newArray);
    };
    // Method to delete an element based on its index
    const deleteElementAtIndex = (index: number) => {
        if (plpInvolved.length > 1) {
            const newArray = [...plpInvolved];
            newArray.splice(index, 1);
            setPlpInvolved(newArray);
        }
    };
    // Route to add Task
    const routeAddTask = () => {
        const params = new URLSearchParams(searchParams);
        if (idGradePro) {
            params.set('idGradePro', idGradePro.toString());
        } else {
            params.delete('idGradePro')
        }
        replace(`/Defensa-formal/Docente/Seleccion?${params.toString()}`)
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
    // Method to check if the form is filled or not
    const checkModalOpen = () => {
        if (defenseDate == "" || feedback == "" || meetingPlace == "" || plpInvolved[0] == "") {
            toast.warning("Debe completar el formulario")
            return
        }
        onOpen();
    }

    // Method to create a new formal defense
    const saveFormalDefense = async () => {
        const newFormalDefense: FormalDefenseInterface = {
            academicHasGradeProfileIdAcadGrade: {
                gradeProfileIdGradePro: {
                    idGradePro: idGradePro
                },
            },
            plpInvolved: plpInvolved.join(";"),
            defenseDate: parseAndFormatDate(defenseDate),
            place: meetingPlace
        }
        let flag: boolean = await postFormalDefenseItem(newFormalDefense)
        if (flag){
            toast.success("Defensa formal programada exitosamente")
            routeAddTask();
        }
        else
            toast.error("Error al programar defensa formal")
    }

    // Method to clean form
    const cleanForm = () => {
        setDefenseDate("")
        setFeedback("")
        setMeetingPlace("")
        setPlpInvolved([])
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <form className="px-10 max-w-lg w-full rounded-xl border border-gray-200 shadow-md dark:bg-black-50  dark:border-gray-700">
                    <div className="space-y-4">
                        <DateTimePickerHtml title="Fecha de defensa formal:    " onChange={handleDefenseDate} dateValue="" bgColorClass='bg-custom-green' fontColorClass='text-custom-green-font' />

                        <Divider />
                    </div>
                    <Input
                        className="p-4"
                        fullWidth
                        type="text"
                        variant="bordered"
                        label="Lugar de la defensa"
                        placeholder="Ingrese aula donde será la defensa"
                        labelPlacement="outside"
                        value={meetingPlace}
                        onChange={(event) => setMeetingPlace(event.target.value)}
                        onClear={() => setMeetingPlace("")}
                        isClearable
                        required
                    />

                    <Textarea
                        className="p-4"
                        fullWidth
                        type="text"
                        variant="bordered"
                        label="Comentarios"
                        placeholder="Ingrese comentarios para la pre defensa"
                        labelPlacement="outside"
                        value={feedback}
                        onChange={(event) => setFeedback(event.target.value)}
                        onClear={() => setFeedback("")}
                        required
                    />
                    <Divider />
                    <p><b>Penel evaluador</b></p>
                    <Button
                        color="primary"
                        variant="ghost"
                        onClick={addNewPlpInvolved}>Añadir</Button>
                    <div className="space-y-2">

                        {plpInvolved.map((item, index) => (
                            <div key={index} className="flex items-center border rounded px-2 py-1">
                                <Input
                                    type="url"
                                    variant="bordered"
                                    label={`Persona N°${index + 1}`}
                                    placeholder="Nombre"
                                    value={item}
                                    onChange={(event) => updateElementAtIndex(index, event.target.value)}
                                    required
                                />
                                <Button
                                    color="danger"
                                    onClick={() => deleteElementAtIndex(index)}
                                    className="ml-2"
                                >
                                    <FaTimes />
                                </Button>
                            </div>
                        ))}
                        <Divider />
                    </div>

                </form>
            </div>
            <div className="flex justify-center items-center gap-4 my-4">
                <Button color="default" variant="ghost" onClick={() => {cleanForm() }}>
                    Limpiar
                </Button>

                <Button color="primary" type="submit" onClick={() => checkModalOpen()}>
                    Programar defensa
                </Button>
            </div>

            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">¿Seguro que desea programar la defensa formal?</ModalHeader>
                            <ModalBody>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                    Cancelar
                                </Button>
                                <Button color="success" variant="ghost" onPress={() => { saveFormalDefense() }} startContent={<FaCheck />}>
                                    Programar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateFormalDefenseForm;