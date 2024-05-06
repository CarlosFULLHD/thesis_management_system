import { UserDetail } from "@/app/providers/SessionProvider";
import {  CircularProgress } from "@nextui-org/react";
import { useMilestoneStudent } from "../../providers/MilestoneStudentProvider";
import { useQuery } from "@tanstack/react-query";
import InitialForm from "./InitialForm";

interface StudentMileStoneStateProps {
    userDetails: UserDetail
}

const StudentMileStoneState = ({ userDetails }: StudentMileStoneStateProps) => {

    // Importing data and method from provider
    const { milestoneItem, loadMilestoneItem, isMilestoneItemEmpty } = useMilestoneStudent();

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
    // Initial state (pending to send the letter)
    if (milestoneItem.isStudentOrCoordinator == 1 && milestoneItem.isSend == -1) {
        return <InitialForm userDetails = {userDetails}/>
    }
    // Student has saved the URL but it's not send it yet
    if (milestoneItem.isStudentOrCoordinator == 1 && milestoneItem.isSend == 0) {
        return(<p>ESTADO GUARDADO Y TURNO DEL ESTUDIANTE</p>)
    }
    // Student can view the state of their letter
    if (milestoneItem.isStudentOrCoordinator == 2) {
        return(<p>ESTADO DE ENVIADO DEL ESTUDIANTE</p>)
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