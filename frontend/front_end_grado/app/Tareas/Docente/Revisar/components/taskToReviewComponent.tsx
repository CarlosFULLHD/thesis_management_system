import { useQuery } from "@tanstack/react-query";
import { emptyTask, useTasks } from "../../providers/tasksProvider";
import { Accordion, AccordionItem, Button, Card, CardBody, CardFooter, CardHeader, Radio, Chip, CircularProgress, Divider, Link, RadioGroup, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { CircleCheck, Clock, DoorOpen, Link2, MessageCircleMore, MessageCircleX, Search } from "lucide-react";
import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

interface TaskToReviewComponentProps {
    idTask: number
}
const TaskToReviewComponent = ({ idTask }: TaskToReviewComponentProps) => {
    // Importing data and method from provider
    const { taskItem, loadTaskItem, reviewTaskItem } = useTasks();

    // State for modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    // Routing instance and params
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    // Function to add params into selection tasks url
    const addParamsToUrl = (idGradePro: number) => {
        const params = new URLSearchParams(searchParams);
        if (idGradePro) {
            params.set('idGradePro', idGradePro.toString());
        } else {
            params.delete('idGradePro')
        }

        replace(`/Tareas/Docente/Historial?${params.toString()}`);
    }


    // Feedback state
    const [feedback, setFeedBack] = useState<string>("");
    // Task state
    const [state, setState] = useState<string>("1");

    // Map for colors
    const colorsMap: Map<number, (string | JSX.Element)[]> = new Map([
        [1, ["bg-custom-purple", '#854bbf', <Clock />]], // EN ESPERA
        [2, ["bg-danger", "#f31260", <MessageCircleX />]], // DESAPROBADO
        [3, ["bg-custom-yellow", "#f5a524", <Search />]], // OBSERVADO
        [4, ["bg-success", "#17c964", <CircleCheck />]], // APROBADO
        [5, ["bg-custom-blue", "#006fee", <DoorOpen />]], // ABIERTO
        [6, ["bg-danger", "#f31260", <MessageCircleX />]], // CERRADO
        [7, ["bg-danger", "#f31260", <MessageCircleX />]], // SIN PRESENTAR
        [8, ["bg-danger", "#f31260", <MessageCircleX />]], // PRESENTO TARDE
    ]);

    // Method to reset the form
    const cleanForm = () => {
        setState("1")
        setFeedBack(taskItem.task?.feedback!)
    }

    // Method to send the form
    const sendForm = async () => {
        if (feedback != taskItem.task?.feedback && state != "1") {

            await reviewTaskItem(taskItem.task?.idTask!, parseInt(state, 10), feedback, taskItem.task?.academicHasGradeProfileIdAcadGrade?.gradeProfileIdGradePro?.idGradePro!)
            toast.success("Tarea evaluada")
            addParamsToUrl(taskItem.task?.academicHasGradeProfileIdAcadGrade?.gradeProfileIdGradePro?.idGradePro!)
            onClose();
        } else {
            toast.warning("Debe completar el formulario")
            onClose();
        }
    }

    const { isLoading, isError } = useQuery({
        queryKey: ["academicPeriodHasGradeProfile"],
        queryFn: async () => {
            let flag: boolean = await loadTaskItem(idTask);
            if (flag) setFeedBack(taskItem.task?.feedback!)
            return taskItem;
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
    if (taskItem != emptyTask) {

        return (
            <>
                <div className="space-y-4">
                    <Card key={taskItem.task?.idTask}>
                        <CardHeader>
                            <div className="w-full">
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span className="font-semibold">Tarea # {taskItem.task?.orderIs}</span>
                                </div>

                                <div className="text-lg font-bold mb-2">
                                    Título: {taskItem.task?.titleTask}
                                </div>

                                <div className="">
                                    Descripción: {taskItem.task?.task}
                                </div>
                                <div className="">
                                    Fecha publicación: {taskItem.task?.publicationDate}
                                </div>
                                <div className="">
                                    Fecha límite: {taskItem.task?.deadline}
                                </div>
                            </div>
                        </CardHeader>

                        <Divider />
                        <CardBody>

                            {/* REUNIONES */}
                            {
                                taskItem.meeting && (
                                    <Accordion variant="splitted">
                                        <AccordionItem
                                            indicator={<Clock />}

                                            subtitle={
                                                <span>
                                                    Detalles de la reunión
                                                </span>
                                            }
                                            title={`Reunión ${taskItem.meeting.isVirtual == 1 ? "virtual" : "presencial"}`}
                                        >
                                            <Divider />
                                            <p>Fecha de reunión: {taskItem.meeting.meetingDate}</p>
                                            <p>{taskItem.meeting.isVirtual == 1 ? "Url reunión" : "Lugar reunión"}: {taskItem.meeting.isVirtual == 1 ? <Link href={taskItem.meeting.addressLink} size="lg" isExternal >URL - reunión</Link>
                                                : taskItem.meeting.addressLink}</p>
                                        </AccordionItem>
                                    </Accordion>
                                )
                            }



                            {/* URLS */}
                            {
                                taskItem.urls && (
                                    <Accordion variant="splitted">
                                        <AccordionItem
                                            indicator={<Link2 />}

                                            subtitle={
                                                <span>
                                                    Detalles de url de la tarea
                                                </span>
                                            }
                                            title="Espacio en la nube"
                                        >
                                            <Divider />
                                            <p>Descripción: {taskItem.urls.description == "" ? "Sin descripción" : taskItem.urls.description}</p>
                                            <Link href={taskItem.urls.url} size="lg" isExternal >
                                                URL - estudiante
                                            </Link>
                                            <p>Fecha subida: {taskItem.urls.createdAt}</p>
                                        </AccordionItem>
                                    </Accordion>
                                )
                            }


                            <Textarea
                                labelPlacement="outside"
                                label="Observaciones"
                                variant="bordered"
                                placeholder={`Añade observaciones realizadas `}
                                value={feedback}
                                onChange={(event) => setFeedBack(event.target.value)}
                                onClear={() => setFeedBack("")}
                                required
                            />



                        </CardBody>
                        <CardFooter
                            className={`flex justify-center ${colorsMap.get(parseInt(state, 10))![0]}`}
                        >
                            <div className="p-4">
                                <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                                    Asignar estado
                                </h1>
                                <RadioGroup
                                    orientation="horizontal"
                                    value={state}
                                    onValueChange={setState}
                                >
                                    <Radio value="4">Aprobado</Radio>
                                    <Radio value="3">Observado</Radio>
                                    <Radio value="2">Desaprobado</Radio>
                                </RadioGroup>
                            </div>

                        </CardFooter>
                        <div className="flex justify-center space-x-4" >
                            <Button
                                color="primary"
                                variant="ghost"
                                onClick={() => {
                                    cleanForm()
                                }}
                            >
                                Reiniciar
                            </Button>
                            <Button color="success" variant="ghost" type="submit" onPress={onOpen}>
                                Enviar
                            </Button>
                        </div>
                    </Card>
                </div>
                <div>
                    <Modal backdrop="blur" isOpen={isOpen} size="xs">
                        <ModalContent>
                            <ModalHeader className="flex flex-col gap-1">¿Enviar calificación?</ModalHeader>


                            <Divider />
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                    NO
                                </Button>
                                <Button color="success" variant="ghost" onClick={async () => { await sendForm() }} startContent={<FaCheck />}>
                                    SI
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>
            </>
        );


    }
}
export default TaskToReviewComponent;