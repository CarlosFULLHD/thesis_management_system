import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { UserRoundCheck } from "lucide-react";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { useLecturerCollection } from "../providers/lecturerCollectionProvider";
import { CircularProgress, Select, SelectItem } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useGradeProfileLecturerCollection } from "../providers/gradeProfileLecturerCollectionProvider";

interface TutorButtonProps {
    isDisabled: boolean
    idGradePro: number
    idLecturerApplication: number | null
}

const TutorButton = ({ isDisabled, idGradePro, idLecturerApplication }: TutorButtonProps) => {
    // State for modal
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // Importing data and methods from provider
    const { lecturerList, loadLecturerList } = useLecturerCollection();
    // Importing data and methods from provider
    const { assignTutorOrLecturerToGradeProfile } = useGradeProfileLecturerCollection();
    // State for the select component
    const [value, setValue] = useState("");
    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
        const assignedStudents = getAssignedStudentsById(parseInt(e.target.value));
        if (assignedStudents! > 3) {
            toast.warning(`Docente tiene actualmente ${assignedStudents} estudiantes asignados`)
        }
    };

    // Method to get number of asigned studens of docentes list
    function getAssignedStudentsById(idRolePer: number): number | undefined {
        const lecturer = lecturerList.find(lecturer => lecturer.idRolePer === idRolePer);
        return lecturer ? lecturer.assignedStudents : undefined;
    }

    // Method to assign new tutor
    const assignTutor = async () => {
        var flag : boolean = await assignTutorOrLecturerToGradeProfile(parseInt(value),idGradePro,false,idLecturerApplication);
        if (!flag){
            toast.error("Error con la conexión")
            onClose();
            return;
        }
        toast.success("Tutor asignado correctamente")
        onClose();
    }

    const { isLoading, isError } = useQuery({
        queryKey: ["tutorsGet"],
        queryFn: async () => {
            await loadLecturerList("tutors");
            return lecturerList;
        }
    })
    // Fetching state
    if (isLoading) {
        return <CircularProgress aria-label="Cargando..." />;
    }
    // Error state
    if (isError) {
        return <div>Oops!</div>;
    }
    // Success state
    if (lecturerList.length > 0) {
        return (
            <>
                <div className="col-span-1">
                    <Button  className="w-12 h-12" isIconOnly variant="faded" isDisabled={isDisabled}
                        onPress={onOpen}
                    >
                        <UserRoundCheck />
                    </Button>
                </div>
                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-5">Asignar nuevo tutor</ModalHeader>
                                <Divider />
                                <ModalBody>
                                    <Select
                                        items={lecturerList}
                                        variant="bordered"
                                        label="Tutores"
                                        className="max-w-sx"
                                        defaultSelectedKeys={["1"]}
                                        selectedKeys={[value]}
                                        onChange={handleSelectionChange}
                                    >
                                        {(gradList) => <SelectItem className={gradList.assignedStudents > 3 ? 'bg-danger' : 'bg-success'} key={gradList.idRolePer}>{gradList.name}</SelectItem>}
                                    </Select>
                                </ModalBody>
                                <Divider />
                                <ModalFooter>
                                    <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                        Cancelar
                                    </Button>
                                    <Button color="success" variant="ghost" startContent={<FaPlusCircle />} onClick={() => {assignTutor() }}>
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
}

export default TutorButton;