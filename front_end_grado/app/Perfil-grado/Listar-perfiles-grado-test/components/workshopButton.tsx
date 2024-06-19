import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider, Select, SelectItem } from "@nextui-org/react";
import { BookCopy } from "lucide-react";
import { SetStateAction, useState } from "react";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { useGradeProfileLecturerCollection } from "../providers/gradeProfileLecturerCollectionProvider";
import { toast } from "react-toastify";

interface WorkShopButtonProps {
    idGradePro: number
}

const WorkShopButton = ({ idGradePro }: WorkShopButtonProps) => {
    // State for modal
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // Importing data and methods from provider
    const { assignWorkshop } = useGradeProfileLecturerCollection();
    // State for the select component
    const [value, setValue] = useState("");
    const handleSelectionChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValue(e.target.value);
    };

    // List of workshops 
    const workshopList = [
        { label: "Taller grado 1", value: "1" },
        { label: "Taller grado 2", value: "2" },
    ]
    // Method to assign graduation mode
    const assignWorkshopFunc = async () => {
        var flag: boolean = await assignWorkshop(idGradePro, parseInt(value));
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
                <Button className="w-12 h-12" isIconOnly variant="faded"
                    onPress={onOpen}
                > {/* Adjust the width as needed */}
                    <BookCopy />
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
                                    items={workshopList}
                                    variant="bordered"
                                    label="Modalidad de graduación"
                                    className="max-w-sx"
                                    defaultSelectedKeys={["Taller grado 1"]}
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
                                <Button color="success" variant="ghost" startContent={<FaPlusCircle />} onClick={() => { assignWorkshopFunc() }}>
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

export default WorkShopButton;