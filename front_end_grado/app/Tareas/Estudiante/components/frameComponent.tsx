import { CircularProgress } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TitleComponent from "./titleComponent";
import TimeLineComponent from "./timeLineComponent";
import { UserDetail } from "@/app/providers/SessionProvider";
import { useGradeProfileStudent } from "../providers/gradeProfileStudentProvider";

interface FrameComponentProps {
    userDetails: UserDetail;
}

const FrameComponent = ({ userDetails }: FrameComponentProps) => {
    // Importing data and methods from provider
    const { gradeProfileStudentItem, loadGradeProfileStudentItem, isGradeProfileStudentItemEmpty } = useGradeProfileStudent();
    //Query that fetches the end point, being called as soon the component builds it self
    const { isLoading, isError } = useQuery({
        queryKey: ["studentMilestone"],
        queryFn: async () => {
            await loadGradeProfileStudentItem(userDetails.userId);

            return gradeProfileStudentItem;
        },
    });
    // Fetching state
    if (isLoading) {
        return <CircularProgress aria-label="Cargando..." />;
    }
    // Error state
    if (isError || !gradeProfileStudentItem) {
        return <div>Oops!</div>;
    }
    if (isGradeProfileStudentItemEmpty(gradeProfileStudentItem)) {
        return (
            <div>¡Error al cargar el perfil de grado de {userDetails.name}!</div>
        );
    }
    return (
        <>
            <TitleComponent />
            <TimeLineComponent idGradePro={gradeProfileStudentItem.gradeProfile.idGradePro}/>
        </>
    )
}

export default FrameComponent;
