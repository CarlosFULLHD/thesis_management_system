import { CircularProgress } from "@nextui-org/react";
import {
  emptyAcademicPeriodHasGradeProfile,
  useAcademicPeriodHasGradeProfile,
} from "../../providers/academicPeriodHasGradeProfileProvider";
import TitleComponent from "./titleComponent";
import { useQuery } from "@tanstack/react-query";
import InitialButtons from "./initialButtons";
import { useEffect, useState } from "react";
interface FrameComponentProps {
  idGradePro: number;
}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
  // Provider and methods
  const {
    academicPeriodHasGradeProfileItem,
    loadAcademicPeriodHasGradeprofileItem,
  } = useAcademicPeriodHasGradeProfile();
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  let flag: boolean = false;

  useEffect(() => {
    //setName(academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.name == undefined ? "SIN ASIGNAR" : `${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.name} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.motherLastName}`)
    setTitle(
      academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.title ==
        undefined
        ? "SIN ASIGNAR"
        : academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.title
    );
  }, [flag]);

  const { isLoading, isError } = useQuery({
    queryKey: ["academicPeriodHasGradeProfile"],
    queryFn: async () => {
      flag = await loadAcademicPeriodHasGradeprofileItem(idGradePro);
      setName(
        `${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.name} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.motherLastName}`
      );
      return academicPeriodHasGradeProfileItem;
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
  // Success state
  if (academicPeriodHasGradeProfileItem != emptyAcademicPeriodHasGradeProfile) {
    return (
      <>
        <TitleComponent studentName={name} gradeTitle={title} />

        <InitialButtons idGradePro={idGradePro} />
      </>
    );
  } else {
    return <>Problemas al conseguir perfil de grado</>;
  }
};

export default FrameComponent;
