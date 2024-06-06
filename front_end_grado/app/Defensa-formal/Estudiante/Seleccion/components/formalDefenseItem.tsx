import { Button, Chip, CircularProgress, Divider, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { FormalDefenseInterface, emptyFormalDefense, useFormalDefense } from "../../providers/formalDefenseProvider";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaCheck, FaTimes } from "react-icons/fa";

interface FormalDefenseItemProps {
    idGradePro: number
}

const FormalDefenseItem = ({ idGradePro }: FormalDefenseItemProps) => {
    // Provider and methods
    const { formalDefenseItem, fetchFormalDefenseItem, putFormalDefenseItem } = useFormalDefense();

    // States for feedback and the url
    const [newUrl, setNewUrl] = useState<string>("")
    const [newFeedBack, setNewFeedBack] = useState<string>("")

    // Modal state
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const colorsMap: Map<number, string[]> = new Map([
        [
            1,
            [
                "bg-custom-purple",
                "En espera de revisión",
                "El panel evaluador evaluara tu propuesta",
            ],
        ], // EN ESPERA
        [
            2,
            [
                "bg-danger",
                "REPROBADO",
                `Nota final ${formalDefenseItem.grade}` ,
            ],
        ], // DESAPROBADO
        [
            3,
            ["bg-custom-yellow", "Propuesta observada", "Corrige las observaciones"],
        ], // OBSERVADO
        [
            4,
            [
                "bg-success",
                "APROBADO",
                `Nota final ${formalDefenseItem.grade}` ,
            ],
        ], // APROBADO
        [
            5,
            [
                "bg-custom-blue",
                "Propuesta abierta",
                "En espera de que el estudiante envie documento a evaluar",
            ],
        ], // ABIERTO
        [6, ["bg-danger", "Tarea cerrada", "No se pueden mandar propuestas"]], // CERRADO
        [7, ["bg-danger", "No se presento", "Oldivaste presentar la propuesta"]], // SIN PRESENTAR
        [
            8,
            ["bg-danger", "Propuesta atrasada", "La propuesta fue presentada tarde"],
        ], // PRESENTO TARDE
    ]);
    // Method to send form
    const sendForm = async () => {
        // PREPARING => Request
        const newFormalDefense: FormalDefenseInterface = {
            idFormal: formalDefenseItem.idFormal,
            url: newUrl,
            feedback: newFeedBack,
        }
        let flag: boolean = false;
        if (newUrl != "" && newFeedBack != "") {
            flag = await putFormalDefenseItem(newFormalDefense);
        } else {
            toast.warning("Debes completar el formulario")
            return;
        }

        if (flag) {
            await fetchFormalDefenseItem(idGradePro);
            toast.success("Formulario enviado")
        } else {
            toast.error("Error al enviar el formulario")
        }

    }

      // Method to check if the form is filled or not
      const checkModalOpen = () => {
        if (newUrl == "" || newFeedBack == "" ) {
            toast.warning("Debe completar el formulario")
            return
        }
        onOpen();
    }


    let flag: boolean = false;
    const { isLoading, isError } = useQuery({
        queryKey: ["academicPeriodHasGradeProfile"],
        queryFn: async () => {
            flag = await fetchFormalDefenseItem(idGradePro);
            // setName(`${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.name} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.motherLastName}`)
            return formalDefenseItem;
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
    if (formalDefenseItem != emptyFormalDefense) {

        return (
            <>


                {/* FORMAL DEFENSE */}
                <div className={`w-full h-16 flex flex-col items-center justify-center mt-4 mb-4 ${colorsMap.get(formalDefenseItem.taskStatesIdTaskState?.idTaskState!)![0]}`}>
                    <p className="font-bold">{colorsMap.get(formalDefenseItem.taskStatesIdTaskState?.idTaskState!)![1]}</p>
                    <p className="font-bold text-xs">{colorsMap.get(formalDefenseItem.taskStatesIdTaskState?.idTaskState!)![2]}</p>
                </div>
                {formalDefenseItem.taskStatesIdTaskState?.idTaskState == 4 && (<div>
                    Felicidades ahora puedes {formalDefenseItem.isGradeoneortwo == 1 ? "inscribirte a taller de grado 2" : "titularte"}
                </div>) }

                {formalDefenseItem.taskStatesIdTaskState?.idTaskState == 2 && (<div>
                    Mejor suerte la proxima
                </div>) }


                <div className="flex justify-center items-center">
                    <form className="px-10 max-w-lg w-full rounded-xl border border-gray-200 shadow-md dark:bg-black-50  dark:border-gray-700">
                        <div className="space-y-4">
                            <p><b>Fecha programada: {formalDefenseItem.defenseDate}</b></p>
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
                            value={formalDefenseItem.place}
                            isDisabled
                        />

                        <Textarea
                            className="p-4"
                            fullWidth
                            type="text"
                            variant="bordered"
                            label="Comentarios"
                            placeholder="Ingrese comentarios para la pre defensa"
                            labelPlacement="outside"
                            value={formalDefenseItem.feedback}
                            isDisabled
                        />
                        <Divider />
                        {formalDefenseItem.plpInvolved && (
                            <div className="flex items-center">
                                <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                                    Panel evaluador:
                                </h1>
                                <div className="flex justify-center overflow-x-auto space-x-4">
                                    {formalDefenseItem.plpInvolved.split(";").map((item, index) => (
                                        <Chip
                                            key={index}
                                            className={`${colorsMap.get(Math.floor(Math.random() * 5) + 2)![0]}`}
                                        >
                                            {item}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        )}
                        <Divider />
                        {
                            formalDefenseItem.taskStatesIdTaskState?.idTaskState == 5 && (
                                <>
                                    <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                                        Documento final:
                                    </h1>
                                    <div className="flex justify-center overflow-x-auto space-x-4">
                                        <Input
                                            className="p-4"
                                            fullWidth
                                            type="text"
                                            variant="bordered"
                                            label="Añade una url"
                                            placeholder="Recuera que este es el documento final"
                                            labelPlacement="outside"
                                            value={newUrl}
                                            onChange={e => setNewUrl(e.target.value)}

                                        />
                                    </div>
                                    <Textarea
                                        className="p-4"
                                        fullWidth
                                        type="text"
                                        variant="bordered"
                                        label="Comentarios"
                                        placeholder="Ingrese comentarios para la pre defensa"
                                        labelPlacement="outside"
                                        value={newFeedBack}
                                        onChange={e => setNewFeedBack(e.target.value)}

                                    />
                                    <div className="flex justify-center items-start justify-start space-x-4">
                                        <Button color="success" variant="ghost" onClick={ () =>  checkModalOpen()}>Enviar</Button>
                                    </div>
                                </>)
                        }

                        {
                            formalDefenseItem.taskStatesIdTaskState?.idTaskState != 5 && (
                                <>

                                    <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                                        Documento enviado:
                                    </h1>
                                    <div className="flex justify-center overflow-x-auto space-x-4">
                                        {formalDefenseItem.url == "" ? "No existe documento final" : <Link href={formalDefenseItem.url} target="_blank">Documento final</Link>}
                                    </div>
                                </>
                            )
                        }


                    </form >
                </div >
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
                                    <Button color="success" variant="ghost" onPress={() => { async () => await sendForm() }} startContent={<FaCheck />}>
                                        Calificar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        )
    } else {
        return (
            <>No tienes ningúna defensa formal programada</>
        );
    }
}

export default FormalDefenseItem;



