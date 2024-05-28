import { useTasks } from "../../providers/tasksProvider";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
  Button,
  Link,
} from "@nextui-org/react";
import {
  Link2,
  Clock,
  MessageCircleX,
  ArrowLeft,
  Search,
  DoorOpen,
  CircleCheck,
} from "lucide-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css"; // Importar estilos de la línea de tiempo

import { useRouter, useSearchParams } from "next/navigation";
import InitialButtons from "../../Seleccion/components/initialButtons";

interface HistoryComponentProps {
  idGradePro: number;
}

const HistoryComponent = ({ idGradePro }: HistoryComponentProps) => {
  // Importing data and method from provider
  const { taskList, loadTaskList } = useTasks();
  // Routing instance and params
  const { replace } = useRouter();
  const searchParams = useSearchParams();
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

  // Method to route to the update page
  const addParamsToUrlUpdate = (idTask: number, idGradePro: number) => {
    const params = new URLSearchParams(searchParams);
    if (idTask) {
      params.set("idTask", idTask.toString());
    } else {
      params.delete("idTask");
    }
    if (idGradePro) {
      params.set("idGradePro", idGradePro.toString());
    } else {
      params.delete("idGradePro");
    }
    replace(`/Tareas/Docente/Modificar?${params.toString()}`);
  };

  // Method to route to the review page
  const addParamsToUrl = (idTask: number, idGradePro: number) => {
    const params = new URLSearchParams(searchParams);
    if (idTask) {
      params.set("idTask", idTask.toString());
    } else {
      params.delete("idTask");
    }
    if (idGradePro) {
      params.set("idGradePro", idGradePro.toString());
    } else {
      params.delete("idGradePro");
    }
    replace(`/Tareas/Docente/Revisar?${params.toString()}`);
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
      <>
        
        <div className="p-4">
          <VerticalTimeline lineColor="grey">
            {taskList.map((item) => {
              const taskStateId = item.task?.taskStatesIdTaskState?.idTaskState;
              return (
                <VerticalTimelineElement
                  key={item.task?.idTask}
                  contentStyle={{
                    background: `${colorsMap.get(taskStateId!)![1]}`,
                    color: "#fff",
                  }}
                  contentArrowStyle={{
                    borderRight: `10px solid ${colorsMap.get(taskStateId!)![1]}`,
                  }}
                  date={`Inicio: ${item.task?.publicationDate} - Fin: ${item.task?.deadline}`}
                  dateClassName=" text-black dark:text-white"
                  icon={colorsMap.get(taskStateId!)![2]}
                  iconStyle={{
                    background: `${colorsMap.get(taskStateId!)![1]}`,
                    color: "#fff",
                  }}
                >
                  <Card className="w-full">
                    <CardHeader className="text-black dark:text-white">
                      <h1 className="text-xl font-bold">
                        {item.task?.titleTask}
                      </h1>
                    </CardHeader>

                    <CardBody className="text-black dark:text-white">
                      <div className="flex flex-col space-y-2">
                        <p className="text-md">{item.task?.task}</p>
                        {item.meeting && (
                          <Accordion variant="splitted">
                            <AccordionItem
                              indicator={<Clock />}
                              subtitle={<span>Detalles de la reunión</span>}
                              title={`Reunión ${item.meeting.isVirtual == 1 ? "virtual" : "presencial"}`}
                            >
                              <p>
                                Fecha de reunión: {item.meeting.meetingDate}
                              </p>
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
                                    className="text-blue-200"
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
                        {item.urls && (
                          <Accordion variant="splitted">
                            <AccordionItem
                              indicator={<Link2 />}
                              subtitle={
                                <span>Detalles de url de la tarea</span>
                              }
                              title="Espacio en la nube"
                            >
                              <Divider />
                              <p>
                                Descripción:{" "}
                                {item.urls.description == ""
                                  ? "Sin descripción"
                                  : item.urls.description}
                              </p>
                              <Link
                                href={item.urls.url}
                                size="lg"
                                isExternal
                                className="text-blue-200"
                              >
                                URL - estudiante
                              </Link>
                              {item.urls.url != "" && (
                                <p>Fecha subida: {item.urls.createdAt}</p>
                              )}
                            </AccordionItem>
                          </Accordion>
                        )}
                      </div>
                    </CardBody>
                    <Divider />
                    <CardFooter className="text-white">
                      {item.task?.feedback && (
                        <div className="flex flex-col space-y-2">
                          <h1 className="text-lg font-bold">Comentarios:</h1>
                          <p>{item.task?.feedback}</p>
                        </div>
                      )}
                      <div className="flex items-center space-x-4">
                        <h1 className="text-lg font-bold">
                          ESTADO:{" "}
                          {item.task?.taskStatesIdTaskState?.description}
                        </h1>
                        <Button
                          color="success"
                          variant="ghost"
                          onClick={() =>
                            addParamsToUrl(item.task?.idTask!, idGradePro)
                          }
                          className="bg-white text-black"
                        >
                          Revisar
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
      </>
    );
  } else {
    <h1>No tiene ningúna tarea asignada aún</h1>;
  }
};

export default HistoryComponent;
