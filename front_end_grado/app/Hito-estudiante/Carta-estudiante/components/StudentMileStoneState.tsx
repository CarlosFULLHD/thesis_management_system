import { UserDetail } from "@/app/providers/SessionProvider";
import { CircularProgress } from "@nextui-org/react";
import { useMilestoneStudent } from "../../providers/MilestoneStudentProvider";
import { useQuery } from "@tanstack/react-query";
import InitialForm from "./InitialForm";
import { useState } from "react";
import ResponseForm from "./responseForm";
import NewsForm from "./newsForm";

interface StudentMileStoneStateProps {
    userDetails: UserDetail
}

const StudentMileStoneState = ({ userDetails }: StudentMileStoneStateProps) => {

    // Importing data and method from provider
    const { milestoneItem, loadMilestoneItem, isMilestoneItemEmpty } = useMilestoneStudent();

    const [isStudentOrCoordinator, setIsStudentOrCoordinator] = useState<number>(milestoneItem.isStudentOrCoordinator);
    const [isSend, setIsSend] = useState<number>(milestoneItem.isSend);

    //Query that fetches the end point, being called as soon the component builds it self
    const { isLoading, isError } = useQuery({
        queryKey: ["studentMilestone"],
        queryFn: async () => {
            await loadMilestoneItem(userDetails.userId);

            return milestoneItem
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
    if (!isMilestoneItemEmpty(milestoneItem)) {
        if (milestoneItem.isStudentOrCoordinator == 1 && milestoneItem.isSend == -1) {
            return(<InitialForm userDetails={userDetails} />)
        }
        // State saved or the student has the response from the coordinator with some modifications
        if (milestoneItem.isStudentOrCoordinator == 1 && milestoneItem.isSend == 0) {
            return(<ResponseForm userDetails={userDetails} />)
        }
        // State send, the turn is now of the coordinator
        if (milestoneItem.isStudentOrCoordinator == 2) {
            return(<NewsForm/>)
        }
    }
    else {
        return (
            <div>
                <h1>¡Error al cargar carta de {userDetails.name}</h1>
            </div>
        )
    }
}

export default StudentMileStoneState;