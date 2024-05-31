import { CircularProgress } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { emptyGradeProfileStudentItem, useGradeProfileStudent } from "../../providers/gradeProfileStudentProvider";
import { UserDetail } from "@/app/providers/SessionProvider";
import FormalDefenseItem from "./formalDefenseItem";


interface FrameComponentProps {
    userDetails: UserDetail;

}

const FrameComponent = ({ userDetails }: FrameComponentProps) => {
    // Provider and methods
    const {gradeProfileStudentItem, loadGradeProfileStudentItem} = useGradeProfileStudent();


    let flag : boolean = false;
    
    

    const { isLoading, isError } = useQuery({
        queryKey: ["academicPeriodHasGradeProfile"],
        queryFn: async () => {
            flag = await loadGradeProfileStudentItem(userDetails.userId);
            return gradeProfileStudentItem;
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
    // Success state
    if (gradeProfileStudentItem != emptyGradeProfileStudentItem) {
        
        return (
            <div>
                <FormalDefenseItem idGradePro={gradeProfileStudentItem.gradeProfile.idGradePro}/>
                           
            </div>
        )
    } else {
        return (
            <>No tienes ningúna defensa formal programada</>
        );
    }

}

export default FrameComponent;
