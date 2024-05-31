import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider, Select, SelectItem } from "@nextui-org/react";
import { EarthLock } from "lucide-react";
import { SetStateAction, useState } from "react";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { useGradeProfileLecturerCollection } from "../providers/gradeProfileLecturerCollectionProvider";
import { toast } from "react-toastify";

interface GraduationButtonProps {
    isDisabled: boolean
    idGradePro: number
}

const GraduationButton = ({ isDisabled, idGradePro }: GraduationButtonProps) => {
    // State for modal
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // Importing data and methods from provider
    const { assignGraduationMode } = useGradeProfileLecturerCollection();

    // State for the select component
    const [value, setValue] = useState("");
    const handleSelectionChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValue(e.target.value);
    };



    // List of graduation mode 
    const graduationModeList = [
        { label: "Proyecto de grado", value: "1" },
        { label: "Trabajo dirigido", value: "2" },
        { label: "Tesis de grado", value: "3" },
        { label: "Excelencia", value: "4" }
    ]

    // Method to assign graduation mode
    const assignGraduation = async () => {
        var flag: boolean = await assignGraduationMode(idGradePro, parseInt(value));
        if (!flag) {
            toast.error("Error con la conexión")
            onClose();
            return;
        }
        toast.success("Título asignado correctamente")
        onClose();
    }

    return (
        <>
            <div className="col-span-1">
                <Button className="w-12 h-12" isIconOnly variant="faded" isDisabled={isDisabled}
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
                                <Select
                                    items={graduationModeList}
                                    variant="bordered"
                                    label="Modalidad de graduación"
                                    className="max-w-sx"
                                    defaultSelectedKeys={["1"]}
                                    selectedKeys={[value]}
                                    onChange={handleSelectionChange}
                                >
                                    {(gradList) => <SelectItem key={gradList.value}>{gradList.label}</SelectItem>}
                                </Select>

                            </ModalBody>
                            <Divider />
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                    Cancelar
                                </Button>
                                <Button color="success" variant="ghost" startContent={<FaPlusCircle />} onClick={() => { assignGraduation() }}>
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