import { useQuery } from "@tanstack/react-query";
import {
  TaskInterface,
  emptyTask,
  useTasks,
} from "../../providers/tasksProvider";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Radio,
  Chip,
  CircularProgress,
  Divider,
  Link,
  RadioGroup,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import {
  CircleCheck,
  Clock,
  DoorOpen,
  Link2,
  MessageCircleMore,
  MessageCircleX,
  Search,
} from "lucide-react";
import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

interface TaskToReviewComponentProps {
  idTask: number;
}
const TaskToReviewComponent = ({ idTask }: TaskToReviewComponentProps) => {
  // Importing data and method from provider
  const { taskItem, loadTaskItem, reviewTaskItem } = useTasks();

  // State for modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  // State for url description
  const [description, setDescription] = useState<string>("");
  // State for the url field
  const [newUrl, setNewUrl] = useState<string>("");

  // Routing instance and params
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  // Function to add params into selection tasks url
  const addParamsToUrl = (idGradePro: number) => {
    const params = new URLSearchParams(searchParams);
    if (idGradePro) {
      params.set("idGradePro", idGradePro.toString());
    } else {
      params.delete("idGradePro");
    }
    replace(`/Tareas/Estudiante/Historial`);
  };

  // Feedback state
  const [feedback, setFeedBack] = useState<string>("");

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

  // Method to reset the form
  const cleanForm = () => {
    setFeedBack(taskItem.task?.feedback!);
  };

  // Method to send the form
  const sendForm = async () => {
    if (feedback != taskItem.task?.feedback) {
      let newTask: TaskInterface = loadNewTask();
      await reviewTaskItem(newTask);
      toast.success("Tarea evaluada");
      addParamsToUrl(
        taskItem.task?.academicHasGradeProfileIdAcadGrade
          ?.gradeProfileIdGradePro?.idGradePro!
      );
      onClose();
    } else {
      toast.warning("Debe completar el formulario");
      onClose();
    }
  };

  // Method to load task request
  const loadNewTask = (): TaskInterface => {
    let newTask: TaskInterface = {
      task: {
        idTask: taskItem.task?.idTask,
        feedback: feedback,
      },
      urls: taskItem.urls
        ? {
            description: description,
            url: newUrl,
          }
        : {},
      meeting: taskItem.meeting ? {} : {},
    };

    return newTask;
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["academicPeriodHasGradeProfile"],
    queryFn: async () => {
      let flag: boolean = await loadTaskItem(idTask);
      return taskItem;
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
  if (taskItem != emptyTask) {
    return (
      <>
        <div className="space-y-4">
          <Card key={taskItem.task?.idTask}>
            <CardHeader>
              <div className="w-full">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="font-semibold">
                    Tarea # {taskItem.task?.orderIs}
                  </span>
                </div>

                <div className="text-lg font-bold mb-2">
                  Título: {taskItem.task?.titleTask}
                </div>

                <div className="">Descripción: {taskItem.task?.task}</div>
                <div className="">
                  Fecha publicación: {taskItem.task?.publicationDate}
                </div>
                <div className="">Fecha límite: {taskItem.task?.deadline}</div>
              </div>
            </CardHeader>

            <Divider />
            <CardBody>
              {/* REUNIONES */}
              {taskItem.meeting && (
                <Accordion variant="splitted">
                  <AccordionItem
                    indicator={<Clock />}
                    subtitle={<span>Detalles de la reunión</span>}
                    title={`Reunión ${taskItem.meeting.isVirtual == 1 ? "virtual" : "presencial"}`}
                  >
                    <Divider />
                    <p>Fecha de reunión: {taskItem.meeting.meetingDate}</p>
                    <p>
                      {taskItem.meeting.isVirtual == 1
                        ? "Url reunión"
                        : "Lugar reunión"}
                      :{" "}
                      {taskItem.meeting.isVirtual == 1 ? (
                        <Link
                          href={taskItem.meeting.addressLink}
                          size="lg"
                          isExternal
                        >
                          URL - reunión
                        </Link>
                      ) : (
                        taskItem.meeting.addressLink
                      )}
                    </p>
                  </AccordionItem>
                </Accordion>
              )}

              {/* URLS */}
              {taskItem.urls && (
                <Accordion variant="splitted">
                  <AccordionItem
                    indicator={<Link2 />}
                    subtitle={<span>Detalles</span>}
                    title="Espacio en la nube"
                  >
                    <Divider />
                    <Input
                      fullWidth
                      type="text"
                      variant="bordered"
                      label="Descripción de la url"
                      placeholder="Descripción"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      onClear={() => setDescription("")}
                      isClearable
                      required
                      labelPlacement="outside"
                    />

                    <Input
                      fullWidth
                      type="url"
                      variant="bordered"
                      label="Url"
                      placeholder="Ingrese url de google drive"
                      value={newUrl}
                      onChange={(event) => setNewUrl(event.target.value)}
                      onClear={() => setDescription("")}
                      isClearable
                      required
                      labelPlacement="outside"
                    />
                  </AccordionItem>
                </Accordion>
              )}

              <Textarea
                labelPlacement="outside"
                label="Comentarios"
                variant="bordered"
                placeholder={`Añade comentarios a la tarea `}
                value={feedback}
                onChange={(event) => setFeedBack(event.target.value)}
                onClear={() => setFeedBack("")}
                required
              />
            </CardBody>
            <CardFooter
              className={`flex justify-center ${colorsMap.get(taskItem.task?.taskStatesIdTaskState?.idTaskState!)![0]}`}
            >
              <div className="p-4">
                <h1 className="text-white text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                  Estado: {taskItem.task?.taskStatesIdTaskState?.description!}
                </h1>
              </div>
            </CardFooter>
            <div className="flex justify-center space-x-4">
              <Button
                color="primary"
                variant="ghost"
                onClick={() => {
                  cleanForm();
                }}
              >
                Limpiar
              </Button>
              <Button
                color="success"
                variant="ghost"
                type="submit"
                onPress={onOpen}
              >
                Enviar
              </Button>
            </div>
          </Card>
        </div>
        <div>
          <Modal backdrop="blur" isOpen={isOpen} size="xs">
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                ¿Enviar calificación?
              </ModalHeader>

              <Divider />
              <ModalFooter>
                <Button
                  color="danger"
                  variant="ghost"
                  onPress={onClose}
                  startContent={<FaTimes />}
                >
                  NO
                </Button>
                <Button
                  color="success"
                  variant="ghost"
                  onClick={async () => {
                    await sendForm();
                  }}
                  startContent={<FaCheck />}
                >
                  SI
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </>
    );
  }
};
export default TaskToReviewComponent;
