import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  Link2,
  Clock,
  MessageCircleX,
  Search,
  CircleCheck,
  DoorOpen,
} from "lucide-react";
import { useTasks } from "../../providers/tasksProvider";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
  Link,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
interface TimeLineComponentProps {
  idGradePro: number;
}

// Map for colors
const colorsMap: Map<number, (string | JSX.Element)[]> = new Map([
  [1, ["bg-custom-purple", "#854bbf", <Clock />]], // EN ESPERA
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
  // Routing instance and params
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  // Method to route to the review page
  const addParamsToUrl = (idTask: number) => {
    const params = new URLSearchParams(searchParams);
    if (idTask) {
      params.set("idTask", idTask.toString());
    } else {
      params.delete("idTask");
    }
    replace(`/Tareas/Estudiante/Revisar?${params.toString()}`);
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["academicPeriodHasGradeProfile"],
    queryFn: async () => {
      await loadTaskList(idGradePro);
      return taskList;
    },
  });
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
      <VerticalTimeline lineColor="grey">
        {taskList.map((item) => {
          // Perform any logic to modify variables here
          const taskStateId = item.task?.taskStatesIdTaskState?.idTaskState;
          const isStudentOrLecturer = item.task?.isStudentOrTutor;
          let stateMessage = "";

          if (isStudentOrLecturer == 3) stateMessage = "";

          if (taskStateId === 1) {
            stateMessage = "LISTA PARA REVISIÓN";
          } else if (taskStateId === 5) {
            stateMessage = "EN ESPERA ACCIÓN ESTUDIANTE";
          } else {
            stateMessage =
              item.task?.taskStatesIdTaskState?.description || "Desconocido";
          }
          return (
            <VerticalTimelineElement
              contentStyle={{
                background: `${colorsMap.get(taskStateId!)![1]}`,
              }}
              contentArrowStyle={{
                borderRight: `10px solid  ${colorsMap.get(taskStateId!)![1]}`,
              }}
              date={`Inicio: ${item.task?.publicationDate} - Fin: ${item.task?.deadline}`}
              dateClassName=" text-black dark:text-white"
              icon={colorsMap.get(taskStateId!)![2]}
              iconStyle={{
                background: `${colorsMap.get(taskStateId!)![1]}`,
                color: "#fff",
              }}
            >
              <div className="flex flex-col ">
                <div className="relative ">
                  <div className="flex items-baseline space-x-4">
                    <h1 className="text-2xl font-bold">
                      {item.task?.titleTask}
                    </h1>
                  </div>
                  <div className="flex items-baseline space-x-4">
                    <h2 className="text-xl font-bold">{item.task?.task}</h2>
                  </div>

                  {(item.task?.taskStatesIdTaskState?.idTaskState == 5 ||
                    item.task?.taskStatesIdTaskState?.idTaskState == 3) && (
                    <Button
                      className="bg-yellow-light text-black font-bold dark:bg-yellow-dark"
                      onClick={() => addParamsToUrl(item.task?.idTask!)}
                    >
                      Presentar
                    </Button>
                  )}
                </div>

                <div className="flex-grow p-4">
                  {/* MEETINGS */}
                  {item.meeting && (
                    <Accordion variant="splitted">
                      <AccordionItem
                        indicator={<Clock />}
                        subtitle={<span>Detalles de la reunión</span>}
                        title={`Reunión ${item.meeting.isVirtual == 1 ? "virtual" : "presencial"}`}
                      >
                        <Divider />
                        <p>Fecha de reunión: {item.meeting.meetingDate}</p>
                        <p>
                          {item.meeting.isVirtual == 1
                            ? "Url reunión"
                            : "Lugar reunión"}
                          :{" "}
                          {item.meeting.isVirtual == 1 ? (
                            <Link
                              href={item.meeting.addressLink}
                              size="lg"
                              isExternal
                            >
                              URL - reunión
                            </Link>
                          ) : (
                            item.meeting.addressLink
                          )}
                        </p>
                      </AccordionItem>
                    </Accordion>
                  )}
                  {/* URLS */}
                  {item.urls && (
                    <Accordion variant="splitted">
                      <AccordionItem
                        indicator={<Link2 />}
                        subtitle={<span>Detalles de url de la tarea</span>}
                        title="Espacio en la nube"
                      >
                        <Divider />
                        {item.urls.description != "" ? (
                          <p>
                            Descripción:{" "}
                            {item.urls.description == ""
                              ? "Sin descripción"
                              : item.urls.description}
                          </p>
                        ) : (
                          <p>Sube tu url para enviarla al docente</p>
                        )}

                        {item.urls.url != "" && (
                          <Link href={item.urls.url} size="lg" isExternal>
                            URL - estudiante
                          </Link>
                        )}

                        {item.urls.url != "" && (
                          <p>Fecha subida: {item.urls.createdAt}</p>
                        )}
                      </AccordionItem>
                    </Accordion>
                  )}
                </div>

                <div className={`bg-gray-800 text-white p-4`}>
                  {item.task?.feedback && (
                    <div className="flex items-baseline space-x-4">
                      <h1 className="text-2xl font-bold">Comentarios:</h1>
                      <p>{item.task?.feedback}</p>
                    </div>
                  )}
                  <div className="flex items-baseline space-x-4">
                    <h1 className="text-2xl font-bold">
                      ESTADO {item.task?.taskStatesIdTaskState?.description}
                    </h1>
                  </div>
                </div>
              </div>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    );
  } else {
    <h1>No tiene ningúna tarea asignada aún</h1>;
  }
};

export default TimeLineComponent;
