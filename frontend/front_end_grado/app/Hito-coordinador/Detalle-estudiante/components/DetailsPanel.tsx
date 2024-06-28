import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  Link,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useMilestoneStudent } from "../providers/MilestoneStudentProvider";
import { FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

interface DetailsPanelProps {
  idMilestone: number;
  userId: number;
}
const DetailsPanel = ({
  idMilestone,
  userId,
}: DetailsPanelProps): ReactElement | null => {
  const router = useRouter();
  const { milestoneItem, loadMilestoneItem, isMilestoneItemEmpty } =
    useMilestoneStudent();
  const { isLoading, isError } = useQuery({
    queryKey: ["studentMilestone"],
    queryFn: async () => {
      await loadMilestoneItem(userId);
      return milestoneItem;
    },
  });

  if (!idMilestone || !userId) {
    return <div>Loading or invalid parameters...</div>;
  }

  if (isLoading) {
    return <CircularProgress aria-label="Cargando..." />;
  }

  if (isError) {
    return <div>Oops!</div>;
  }

  if (isMilestoneItemEmpty(milestoneItem)) {
    return <div>No hay detalles disponibles.</div>;
  }
  // Map for the radio buttons color and message
  const colorStateMap: Map<string, [string, string]> = new Map([
    [
      "4",
      [
        "success",
        "Propuesta aprobada, se creo un perfil de grado para el estudiante",
      ],
    ],
    [
      "3",
      [
        "warning",
        "Propuesta observada, estudiante debe corregir su propuesta y esperar otra evaluación",
      ],
    ],
    [
      "2",
      [
        "danger",
        "Propuesta rechazada, la propuesta no cumple con las expectativas",
      ],
    ],
  ]);

  return (
    <div className="w-[1024px] mx-auto">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark pt-6">
        Detalles carta de postulación
        <br />
        Alumno: {milestoneItem.usersIdUsers.personIdPerson.name}{" "}
        {milestoneItem.usersIdUsers.personIdPerson.fatherLastName}{" "}
        {milestoneItem.usersIdUsers.personIdPerson.motherLastName}
      </h1>

      {/* State division */}
      <div
        className={`rounded-xl w-full mt-4 mb-4 bg-${colorStateMap.get(milestoneItem.taskStatesIdTaskState.idTaskState.toString())![0]}`}
      >
        <div className="h-16 flex flex-col justify-center items-center">
          <p className="font-bold text-xl">
            {/* Message to be shown when the student sends its letter for the first time or corrects an observation */}
            {milestoneItem.taskStatesIdTaskState.description}
          </p>
          <p className="font-bold">
            {
              colorStateMap.get(
                milestoneItem.taskStatesIdTaskState.idTaskState.toString()
              )![1]
            }
          </p>
        </div>
      </div>

      {/* Evaluation council */}
      <div>
        <h1 className="mt-6 text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
          Panel evaluador
        </h1>
        <div className="flex justify-center space-x-4">
          {milestoneItem.plpInvolved.split(";").map((item, index) => (
            <Chip
              key={index}
              className={`bg-${colorStateMap.get((Math.floor(Math.random() * 3) + 2).toString())![0]}`}
            >
              {item}
            </Chip>
          ))}
        </div>
        <div className="mt-6 flex items-center">
          <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
            Fecha de reunión:
          </h1>
          <p className="ml-2">{milestoneItem.meetingDate}</p>
        </div>
      </div>
      <div>
        <h1 className="mt-6 text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
          Observaciones
        </h1>
        <Textarea
          disabled
          variant="bordered"
          value={milestoneItem.comments}
        ></Textarea>
      </div>
      <div className="flex justify-center space-x-4">
        <Tooltip color="primary" content="Carta de propuesta de trabajo">
          <Link
            href={milestoneItem.url}
            target="_blank"
            className="my-4  bg-blue-light dark:bg-blue-dark py-4 px-10 rounded-lg ml-4 mb-2 text-off-white font-bold"
          >
            Ver Carta de Postulación
            <FaEnvelope />
          </Link>
        </Tooltip>
      </div>

      <div className="mt-6 flex justify-center space-x-4 ">
        <Button
          variant="ghost"
          className="bg-yellow-light dark:bg-yellow-dark font-bold text-black px-10"
          color="primary"
          onPress={() => router.push("/Hito-coordinador/Listar-periodo")}
        >
          Volver
        </Button>
      </div>
    </div>
  );
};

export default DetailsPanel;
