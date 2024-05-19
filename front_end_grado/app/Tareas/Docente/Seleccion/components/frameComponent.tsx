import { CircularProgress } from "@nextui-org/react";
import { useAcademicPeriodHasGradeProfile } from "../../providers/academicPeriodHasGradeProfileProvider";
import TitleComponent from "./titleComponent";
import { useQuery } from "@tanstack/react-query";
interface FrameComponentProps {
    idGradePro: number
}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
    const { academicPeriodHasGradeProfileItem, loadAcademicPeriodHasGradeprofileItem, isAcademicPeriodHasGradeprofileEmpty } = useAcademicPeriodHasGradeProfile();

    const { isLoading, isError } = useQuery({
        queryKey: ["academicPeriodHasGradeProfile"],
        queryFn: async () => {
            await loadAcademicPeriodHasGradeprofileItem(idGradePro);
            return academicPeriodHasGradeProfileItem;
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
    if (!isAcademicPeriodHasGradeprofileEmpty(academicPeriodHasGradeProfileItem)) {
        return (
            <>
                <TitleComponent 
                    studentName = {`${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.name} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.motherLastName}`} 
                    gradeTitle = {academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.title}
                />
            </>
        )
    } else {
        return (
            <>Problemas al conseguir perfil de grado</>
        );
    }





}

export default FrameComponent;