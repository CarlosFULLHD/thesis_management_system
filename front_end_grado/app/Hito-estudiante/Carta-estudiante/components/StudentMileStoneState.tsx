import { UserDetail } from "@/app/providers/SessionProvider";
import { CircularProgress } from "@nextui-org/react";
import { useMilestoneStudent } from "../../providers/MilestoneStudentProvider";
import { useQuery } from "@tanstack/react-query";
import InitialForm from "./InitialForm";
import { ReactElement, useState } from "react";
import ResponseForm from "./responseForm";
import SendItForm from "./SendItForm";

interface StudentMileStoneStateProps {
  userDetails: UserDetail;
}
const StudentMileStoneState = ({
  userDetails,
}: StudentMileStoneStateProps): ReactElement | null => {
  const { milestoneItem, loadMilestoneItem, isMilestoneItemEmpty } =
    useMilestoneStudent();

  //Query that fetches the end point, being called as soon the component builds it self
  const { isLoading, isError } = useQuery({
    queryKey: ["studentMilestone"],
    queryFn: async () => {
      await loadMilestoneItem(userDetails.userId);

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
  if (milestoneItem && !isMilestoneItemEmpty(milestoneItem)) {
    switch (milestoneItem.taskStatesIdTaskState.idTaskState) {
      case 1: // EN ESPERA
        return <SendItForm />;
      case 2: // DESAPROBADO
        return <SendItForm />;
      case 3: // OBSERVADO
        return <ResponseForm userDetails={userDetails} />;
      case 4: // APROBADO
        return <SendItForm />;
      case 5: // ABIERTO
        return <InitialForm userDetails={userDetails} />;
      case 6: // CERRADO
        return <SendItForm />;
      case 7: // SIN PRESENTAR
        return <SendItForm />;
      case 8: // PRESENTO TARDE
        return <SendItForm />;
      default:
        return null;
    }
    // if (milestoneItem.isStudentOrCoordinator == 1 && milestoneItem.isSend == -1) {
    //     return(<InitialForm userDetails={userDetails} />)
    // }
    // // State saved or the student has the response from the coordinator with some modifications
    // if (milestoneItem.isStudentOrCoordinator == 1 && milestoneItem.isSend == 0) {
    //     return(<ResponseForm userDetails={userDetails} />)
    // }
    // // State send, the turn is now of the coordinator
    // if (milestoneItem.isStudentOrCoordinator == 2) {
    //     return(<SendItForm/>)
    // }
  } else {
    return (
      <div>
        <h1>¡Error al cargar carta de {userDetails.name}</h1>
      </div>
    );
  }
  return null;
};

export default StudentMileStoneState;
