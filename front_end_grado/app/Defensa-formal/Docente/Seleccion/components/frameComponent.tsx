import { CircularProgress } from "@nextui-org/react";

import { useQuery } from "@tanstack/react-query";

import {  useState } from "react";
import { emptyAcademicPeriodHasGradeProfile, useAcademicPeriodHasGradeProfile } from "../../providers/academicPeriodHasGradeProfileProvider";
import InitialButtons from "./initialButtons";
import TitleComponent from "./titleComponent";
import { emptyFormalDefense, useFormalDefense } from "../../providers/formalDefenseProvider";
import FormalDefenseItem from "./formalDefenseItem";
interface FrameComponentProps {
    idGradePro: number;

}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
    // Provider and methods
    const { academicPeriodHasGradeProfileItem, loadAcademicPeriodHasGradeprofileItem } = useAcademicPeriodHasGradeProfile();
    const { formalDefenseItem, fetchFormalDefenseItem} = useFormalDefense();
    const [name ,setName] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    let flag : boolean = false;
    


    const { isLoading, isError } = useQuery({
        queryKey: ["academicPeriodHasGradeProfile"],
        queryFn: async () => {
            flag = await loadAcademicPeriodHasGradeprofileItem(idGradePro);
            flag = await fetchFormalDefenseItem(idGradePro);
            setName(`${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.name} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.motherLastName}`)
            setTitle(academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.title == undefined ? "SIN ASIGNAR" : academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.title);
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
    if (academicPeriodHasGradeProfileItem != emptyAcademicPeriodHasGradeProfile) {
        
        return (
            <div>
                <TitleComponent 
                    studentName={name}
                    gradeTitle={title}
                /> 
                {
                    formalDefenseItem == emptyFormalDefense && (<InitialButtons idGradePro={idGradePro}/>)
                }

                { formalDefenseItem != emptyFormalDefense && (<FormalDefenseItem idGradePro={idGradePro} />)}

                
                
                
            </div>
        )
    } else {
        return (
            <>Problemas al conseguir perfil de grado</>
        );
    }





}

export default FrameComponent;
