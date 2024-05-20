import { CircularProgress } from "@nextui-org/react";
import { useAcademicPeriodHasGradeProfile } from "../../providers/academicPeriodHasGradeProfileProvider";
import TitleComponent from "./titleComponent";
import { useQuery } from "@tanstack/react-query";
import InitialButtons from "./initialButtons";
import { useState } from "react";
import AddTaskComponent from "../addTaskComponent/addTaskComponent";
import HistoryComponent from "../historyComponent/historyComponent";
import ModifyComponent from "../modifyComponent/modifyComponent";
interface FrameComponentProps {
    idGradePro: number
}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
    // Provider and methods
    const { academicPeriodHasGradeProfileItem, loadAcademicPeriodHasGradeprofileItem, isAcademicPeriodHasGradeprofileEmpty } = useAcademicPeriodHasGradeProfile();

    // Component flag
    const [componentFlag, setComponentFlag] = useState<number>(0);
    // Callback for component flag
    const componentFlagCallback = ( newFlag : number) => {
        setComponentFlag(newFlag)
    }

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

                {
                    componentFlag == 0 ? <InitialButtons callBack = {componentFlagCallback}/>
                    : componentFlag == 1 ? <AddTaskComponent callBack = {componentFlagCallback}/>
                    : componentFlag == 2 ? <HistoryComponent callBack = {componentFlagCallback}/>
                    : componentFlag == 3 ? <ModifyComponent callBack = {componentFlagCallback}/>
                    : <></>
                }
                
                
            </>
        )
    } else {
        return (
            <>Problemas al conseguir perfil de grado</>
        );
    }





}

export default FrameComponent;