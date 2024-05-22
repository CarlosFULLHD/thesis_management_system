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
    idGradePro: number;
    userId: number;
}

const FrameComponent = ({ idGradePro, userId }: FrameComponentProps) => {
    // Provider and methods
    const { academicPeriodHasGradeProfileItem, loadAcademicPeriodHasGradeprofileItem, isAcademicPeriodHasGradeprofileEmpty } = useAcademicPeriodHasGradeProfile();
    const [name ,setName] = useState<string>("");
    const [title, setTitle] = useState<string>("");
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
            setName(`${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.name} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.motherLastName}`)
            setTitle(academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.title)
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
                    studentName={name}
                    gradeTitle={title}
                    
                    //studentName = {`${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.name} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.motherLastName}`} 
                    //gradeTitle = {academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.title}
                />

                {
                    componentFlag == 0 ? <InitialButtons callBack = {componentFlagCallback} userId={userId}/>
                    : componentFlag == 1 ? <AddTaskComponent callBack = {componentFlagCallback} idGradePro={idGradePro}/>
                    : componentFlag == 2 ? <HistoryComponent callBack = {componentFlagCallback} userId={userId}/>
                    : componentFlag == 3 ? <ModifyComponent callBack = {componentFlagCallback} />
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
