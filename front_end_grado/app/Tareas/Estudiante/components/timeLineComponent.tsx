import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {
    Link2,
    Clock,
    ArrowLeft,
    MessageCircleMore,
    MessageCircleX,
    Search,
    CircleCheck,
    DoorOpen
} from "lucide-react";
import { useTasks } from '../providers/tasksProvider';
import { useQuery } from '@tanstack/react-query';
import { Accordion, AccordionItem, Card, CardBody, CardFooter, CardHeader, CircularProgress, Divider, Link } from '@nextui-org/react';
interface TimeLineComponentProps {
    idGradePro: number
}

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



const TimeLineComponent = ({ idGradePro }: TimeLineComponentProps) => {
    // Importing data and method from provider
    const { taskList, loadTaskList } = useTasks();
    const { isLoading, isError } = useQuery({
        queryKey: ["academicPeriodHasGradeProfile"],
        queryFn: async () => {
            await loadTaskList(idGradePro);
            return taskList;
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
    if (taskList.length > 0) {
        return (




            <VerticalTimeline lineColor='cyan'>
                {taskList.map((item) => {

                    // Perform any logic to modify variables here
                    const taskStateId = item.task?.taskStatesIdTaskState?.idTaskState;
                    const isUrl = item.task?.isUrl;
                    const isMeeting = item.task?.isMeeting;
                    const isStudentOrLecturer = item.task?.isStudentOrTutor;
                    let stateMessage = "";

                    if (isStudentOrLecturer == 3)
                        stateMessage = ""

                    if (taskStateId === 1) {
                        stateMessage = "LISTA PARA REVISIÓN";
                    } else if (taskStateId === 5) {
                        stateMessage = "EN ESPERA ACCIÓN ESTUDIANTE";
                    } else {
                        stateMessage = item.task?.taskStatesIdTaskState?.description || "Desconocido";
                    }
                    return (
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date={`Inicio: ${item.task?.publicationDate} - Fin: ${item.task?.deadline}`}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={<Clock />}
                        >
                            <div>
                                <h1 className="vertical-timeline-element-title"><b>TÍTULO:</b> {item.task?.titleTask}</h1>
                                <h4 className="vertical-timeline-element-subtitle"><b>Descripción:</b> {item.task?.task}</h4>
                                <Divider />
                                <p>
                                    {item.task?.feedback != "" ? `Comentarios: ${item.task?.feedback}` : ""}
                                </p>
                                {
                                    (item.meeting || item.urls) && (<h1>Acciones de tarea</h1>)
                                }

                                {/* REUNIONES */}
                                {
                                    item.meeting && (
                                        <Accordion variant="splitted">
                                            <AccordionItem
                                                indicator={<Clock />}
                                                subtitle={
                                                    <span>
                                                        Detalles de la reunión
                                                    </span>
                                                }
                                                title={`Reunión ${item.meeting.isVirtual == 1 ? "virtual" : "presencial"}`}
                                            >
                                                <Divider />
                                                <p>Fecha de reunión: {item.meeting.meetingDate}</p>
                                                <p>{item.meeting.isVirtual == 1 ? "Url reunión" : "Lugar reunión"}: {item.meeting.isVirtual == 1 ? <Link href={item.meeting.addressLink} size="lg" isExternal >URL - reunión</Link>
                                                    : item.meeting.addressLink}</p>
                                            </AccordionItem>
                                        </Accordion>
                                    )
                                }

                                {/* URLS */}
                                {
                                    item.urls && (
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
                                                <p>Descripción: {item.urls.description == "" ? "Sin descripción" : item.urls.description}</p>
                                                <Link href={item.urls.url} size="lg" isExternal >
                                                    URL - estudiante
                                                </Link>
                                                <p>Fecha subida: {item.urls.createdAt}</p>
                                            </AccordionItem>
                                        </Accordion>
                                    )
                                }

                                <Card>
                                <CardFooter
                                    className={`flex justify-center items-center ${colorsMap.get(taskStateId!)}`}
                                >
                                    <div className="text-center rounded">
                                        <p className="text-xs uppercase tracking-wide">Estado</p>
                                        <p className="font-bold text-xl">
                                            {stateMessage}
                                        </p>
                                    </div>
                                </CardFooter>
                                </Card>

                            </div>

                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline>
        );
    }
}

export default TimeLineComponent;