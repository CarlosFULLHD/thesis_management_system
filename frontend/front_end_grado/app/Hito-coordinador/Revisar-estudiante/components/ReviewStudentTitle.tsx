import { useQuery } from "@tanstack/react-query";
import { useMilestoneStudent } from "../providers/MilestoneStudentProvider";
import { CircularProgress, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ReviewStudentTitleProps {
  idMilestone: number;
  userId: number;
}
const ReviewStudentTitle = ({
  idMilestone,
  userId,
}: ReviewStudentTitleProps) => {
  // Importing data and method from provider
  const { milestoneItem, loadMilestoneItem, isMilestoneItemEmpty } =
    useMilestoneStudent();
  // Router instance
  const router = useRouter();

  // Map for the radio buttons color and message
  const colorStateMap: Map<string, [string, string]> = new Map([
    [
      "4",
      [
        "success",
        "Propuesta aprobada, se creara un perfil de grado para el estudiante",
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

  //Query that fetches the end point, being called as soon the component builds it self
  const { isLoading, isError } = useQuery({
    queryKey: ["studentMilestone"],
    queryFn: async () => {
      await loadMilestoneItem(userId);
      return milestoneItem;
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
  if (!isMilestoneItemEmpty(milestoneItem)) {
    return (
      <>
        <div className="pb-4">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark pt-6">
            Formulario de revisión, carta de postulación
          </h1>

          <h1 className="pb-4 text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark pt-6">
            Alumno: {milestoneItem.usersIdUsers.personIdPerson.name}{" "}
            {milestoneItem.usersIdUsers.personIdPerson.fatherLastName}{" "}
            {milestoneItem.usersIdUsers.personIdPerson.motherLastName}
          </h1>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <h1>¡Error al cargar carta de postulación </h1>
      </div>
    );
  }
};

export default ReviewStudentTitle;
