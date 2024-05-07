import { useState } from "react";
import { useMilestoneStudent } from "../providers/MilestoneStudentProvider";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FaTimes, FaEnvelope, FaCheck } from 'react-icons/fa';
import { Textarea } from "@nextui-org/input";
import { Chip, Divider, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Tooltip, useDisclosure } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ReviewStudentForm = () => {
    // Importing data and method from provider
    const { milestoneItem, reviewMilestone} = useMilestoneStudent();
    // State for modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    // States for form inputs
    const [plpInvolved, setPlpInvolved] = useState<string[]>([""])
    const [comments, setComments] = useState<string>("")
    const [state, setState] = useState<string>("");
    // Router instance
    const router = useRouter();

    
    // Map for the radio buttons color and message 
    const colorStateMap: Map<string, [string, string]> = new Map([
        ['4', ["success", "Propuesta aprobada, se creara un perfil de grado para el estudiante"]],
        ['3', ["warning", "Propuesta observada, estudiante debe corregir su propuesta y esperar otra evaluación"]],
        ['2', ["danger", "Propuesta rechazada, la propuesta no cumple con las expectativas"]],
    ]);
    

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

    // Method to clean the form 
    const cleanForm = () => {
        if (plpInvolved.length > 1 || comments != "" || state != "") {
            const newPlpInvolved = [""]
            setPlpInvolved(newPlpInvolved);
            setComments("")
            setState("")
            toast.warning("Formulario reiniciado")
        }
    }
    // Method to send the form
    const sendFormAction = async () => {
        if (plpInvolved[1] != "" && comments != "" || state != "") {
            const people = plpInvolved.join(";")
            await reviewMilestone(milestoneItem.idMilestone,comments,people,parseInt(state,10))
            toast.success("Evaluación enviada")
            router.push("/");
            onClose();
        } else {
            toast.warning("Complete el formulario antes de enviarlo")
            onClose();
        }
    }

    return (
        <>
            <Tooltip color="primary" content="Carta de propuesta de trabajo"><Link href={milestoneItem.url}><FaEnvelope />Carta postulación<FaEnvelope /></Link></Tooltip>
            <Divider />
            <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                Panel evaluador
            </h1>
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
                            isClearable
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
                <div>
                    <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                        Observaciones
                    </h1>
                    <Textarea
                        variant="bordered"
                        placeholder={`Añade observaciones realizadas `}
                        value={comments}
                        onChange={(event) => setComments(event.target.value)}
                        onClear={() => setComments("")}
                        required
                    />
                </div>
                <Divider />
            </div>
            <div>
                <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                    Asignar estado
                </h1>
                <RadioGroup
                    orientation="horizontal"
                    value={state}
                    onValueChange={setState}
                >
                    {
                        state == "4" ? <Chip color="success">
                            <Radio value="4">Aprobado</Radio>
                        </Chip>
                            : <Radio value="4">Aprobado</Radio>
                    }
                    {
                        state == "3" ? <Chip color="warning">
                            <Radio value="3">Observado</Radio>
                        </Chip>
                            : <Radio value="3">Observado</Radio>
                    }
                    {
                        state == "2" ? <Chip color="danger">
                            <Radio value="2">Desaprobado</Radio>
                        </Chip>
                            : <Radio value="2">Desaprobado</Radio>
                    }

                </RadioGroup>
                {state == ""
                    ? <></>
                    : <div className={`w-full h-16 flex items-center justify-center mt-4 mb-4 bg-${colorStateMap.get(state)![0]}`}>
                        <p className="font-bold">{colorStateMap.get(state)![1]}</p>
                    </div>
                }

                <Divider />
                <div className="flex justify-center space-x-4" >
                    <Button
                        color="primary"
                        variant="ghost"
                        onClick={() => {
                            cleanForm()
                        }}
                    >
                        Limpiar
                    </Button>
                    <Button color="success" variant="ghost" type="submit" onPress={onOpen}>
                        Enviar
                    </Button>
                </div>
            </div>
            <div>
                <Modal backdrop="blur" isOpen={isOpen} size="xs">
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-1">¿Enviar calificación?</ModalHeader>
                        <Divider />
                        <ModalBody>
                            <div className="flex flex-col gap-4">
                                <p>No podrás corregir la calificación si envias el formulario</p>
                            </div>
                        </ModalBody>
                        <Divider />
                        <ModalFooter>
                            <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                NO
                            </Button>
                            <Button color="success" variant="ghost" onClick={async () => { await sendFormAction() }} startContent={<FaCheck />}>
                                SI
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}

export default ReviewStudentForm;