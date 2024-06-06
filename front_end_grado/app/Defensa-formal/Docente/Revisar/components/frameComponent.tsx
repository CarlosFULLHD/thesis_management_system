import { CircularProgress, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { emptyAcademicPeriodHasGradeProfile, useAcademicPeriodHasGradeProfile } from "../../providers/academicPeriodHasGradeProfileProvider";
import TitleComponent from "./titleComponent";
import { FormalDefenseInterface, emptyFormalDefense, useFormalDefense } from "../../providers/formalDefenseProvider";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheck, FaTimes } from "react-icons/fa";
interface FrameComponentProps {
    idGradePro: number;


}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
    // Routing instance and params
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    // Provider and methods
    const { academicPeriodHasGradeProfileItem, loadAcademicPeriodHasGradeprofileItem } = useAcademicPeriodHasGradeProfile();
     // Modal state
     const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const { formalDefenseItem, fetchFormalDefenseItem, reviewFormalDefenseItem } = useFormalDefense();
    const [name, setName] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [grade, setGrade] = useState<string>("");
    const [feedBack, setFeedBack] = useState<string>("");

    let flag: boolean = false;


    const { isLoading, isError } = useQuery({
        queryKey: ["academicPeriodHasGradeProfile"],
        queryFn: async () => {
            flag = await loadAcademicPeriodHasGradeprofileItem(idGradePro);
            flag = await fetchFormalDefenseItem(idGradePro);
            setName(`${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.name} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.motherLastName}`)
            setTitle(academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.title == undefined ? "SIN ASIGNAR" : academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.title);
            return academicPeriodHasGradeProfileItem;
        }
    })
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

    // Method to review the formal defense 
    const reviewFormalDefense = async () => {
        const newFormalDefense: FormalDefenseInterface = {
            academicHasGradeProfileIdAcadGrade: {
                gradeProfileIdGradePro: {
                    idGradePro: idGradePro
                }
            },
            idFormal: formalDefenseItem.idFormal,
            grade: Number(grade),
            formalAct: url,
            feedback: feedBack,
        }
        let flag: boolean = await reviewFormalDefenseItem(newFormalDefense)
        if (flag) {
            toast.success("Defensa formal calificada exitosamente")
            routeAddTask()
        }
    }

     // Method to check if the form is filled or not
     const checkModalOpen = () => {
        if (url == "" || feedBack == "" || grade == "" ) {
            toast.warning("Debe completar el formulario")
            return
        }
        onOpen();
    }


    // Fetching state
    if (isLoading) {
        return <CircularProgress aria-label="Cargando..." />;
    }
    // Error state
    if (isError) {
        return <div>Oops!</div>;
    }
    // Success state
    if (academicPeriodHasGradeProfileItem != emptyAcademicPeriodHasGradeProfile) {

        return (
            <div>
                <TitleComponent
                    studentName={name}
                    gradeTitle={title}
                />
                <div className="p-2">
                    <h2 className="text-lg font-semibold">Revisión</h2>
                </div>
                <form className="flex flex-col gap-4 max-w-md mx-auto">
                    <Input
                        fullWidth
                        type="url"
                        variant="bordered"
                        label="URL del acta firmada y aprobada"
                        placeholder="Ingrese la URL"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        onClear={() => setUrl("")}
                        isClearable
                        required
                    />
                    <Input
                        fullWidth
                        type="url"
                        variant="bordered"
                        label="Nota"
                        placeholder="Ingrese nota de la defensa"
                        value={grade}
                        onChange={(event) => setGrade(event.target.value)}
                        onClear={() => setGrade("")}
                        isClearable
                        required
                    />
                    <Textarea
                        className="p-4"
                        fullWidth
                        type="text"
                        variant="bordered"
                        label="Comentarios"
                        placeholder="Ingrese comentarios "
                        labelPlacement="outside"
                        value={feedBack}
                        onChange={(event) => setFeedBack(event.target.value)}
                        onClear={() => setFeedBack("")}
                        required
                    />
                    <div className="flex justify-center">
                        <Button color="danger" variant="solid" onClick={() => { routeAddTask()}} >
                            Cancelar
                        </Button>
                        <Button color="success" variant="ghost" onClick={() =>checkModalOpen() }>
                            Calificar
                        </Button>

                    </div>
                </form>
                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">¿Seguro que desea calificar la defensa formal?</ModalHeader>
                                <ModalBody>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                        Cancelar
                                    </Button>
                                    <Button color="success" variant="ghost" onPress={() => { reviewFormalDefense() }} startContent={<FaCheck />}>
                                        Calificar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

            </div>

        )
    } else {
        return (
            <>Problemas al conseguir perfil de grado</>
        );
    }





}

export default FrameComponent;
