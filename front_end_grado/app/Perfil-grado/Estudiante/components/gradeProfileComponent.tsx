import { useQuery } from "@tanstack/react-query";
import { useGradeProfileStudent } from "../providers/gradeProfileStudentProvider";
import { UserDetail } from "@/app/providers/SessionProvider";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Link,
} from "@nextui-org/react";
import {
  UserRoundCheck,
  UserRoundCog,
  Captions,
  EarthLock,
  BookCopy,
} from "lucide-react";
import GradeProfileStudentTitle from "./gradeProfileStudentTitle";
import React, { ReactElement } from "react";

interface GradeProfileComponentProps {
  userDetails: UserDetail;
}

const GradeProfileComponent = ({
  userDetails,
}: GradeProfileComponentProps): ReactElement | null => {
  // Importing data and methods from provider
  const {
    gradeProfileStudentItem,
    loadGradeProfileStudentItem,
    isGradeProfileStudentItemEmpty,
  } = useGradeProfileStudent();
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
      <GradeProfileStudentTitle />

      <div className="flex justify-center">
        <Card
          className="w-full max-w-3xl"
          key={gradeProfileStudentItem.gradeProfile.idGradePro}
        >
          <CardHeader className="justify-between bg-yellow-light dark:bg-yellow-dark">
            <div className="flex gap-5">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                className="text-black"
                isBordered
                radius="full"
                size="lg"
                name={`${gradeProfileStudentItem.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.name?.charAt(0).toUpperCase()}${gradeProfileStudentItem.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.fatherLastName?.charAt(0).toUpperCase()}${gradeProfileStudentItem.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.motherLastName?.charAt(0).toUpperCase()}`}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-lg md:text-xl font-bold leading-none text-black">
                  {gradeProfileStudentItem.gradeProfile.roleHasPerson
                    ?.usersIdUsers.personIdPerson.name ?? ""}{" "}
                  {gradeProfileStudentItem.gradeProfile.roleHasPerson
                    ?.usersIdUsers.personIdPerson.fatherLastName ?? ""}
                </h4>
                <h5 className="text-md md:text-lg font-bold tracking-tight text-default-400">
                  {gradeProfileStudentItem.gradeProfile.roleHasPerson
                    ?.usersIdUsers.personIdPerson.email ?? ""}
                </h5>
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4">
            {/* TUTOR */}
            <div className="flex items-center rounded p-4">
              <Button
                className="w-12 h-12"
                isIconOnly
                variant="faded"
                isDisabled
              >
                <UserRoundCheck />
              </Button>
              <div className="flex flex-col justify-center items-start ml-4">
                <h1 className="text-lg md:text-xl font-bold">Tutor</h1>
                <p className="text-sm md:text-base">
                  {gradeProfileStudentItem.tutor == null
                    ? "SIN ASIGNAR"
                    : `${gradeProfileStudentItem.tutor.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.name ?? ""} ${gradeProfileStudentItem.tutor.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.fatherLastName ?? ""}`}
                </p>
              </div>
            </div>

            {/* LECTURER */}
            <div className="flex items-center rounded p-4">
              <Button
                className="w-12 h-12"
                isIconOnly
                variant="faded"
                isDisabled
              >
                <UserRoundCog />
              </Button>
              <div className="flex flex-col justify-center items-start ml-4">
                <h1 className="text-lg md:text-xl font-bold">Relator</h1>
                <p className="text-sm md:text-base">
                  {gradeProfileStudentItem.lecturer == null
                    ? "SIN ASIGNAR"
                    : `${gradeProfileStudentItem.lecturer.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.name ?? ""} ${gradeProfileStudentItem.lecturer.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.fatherLastName ?? ""}`}
                </p>
              </div>
            </div>

            {/* TITULO */}
            <div className="flex items-center rounded p-4">
              <Button
                className="w-12 h-12"
                isIconOnly
                variant="faded"
                isDisabled
              >
                <Captions />
              </Button>
              <div className="flex flex-col justify-center items-start ml-4">
                <h1 className="text-lg md:text-xl font-bold">Título</h1>
                <p className="text-sm md:text-base">
                  {gradeProfileStudentItem.gradeProfile.title == ""
                    ? "SIN ASIGNAR"
                    : `${gradeProfileStudentItem.gradeProfile.title}`}
                </p>
              </div>
            </div>

            {/* MODALIDAD GRADUACION */}
            <div className="flex items-center  rounded p-4">
              <Button
                className="w-12 h-12"
                isIconOnly
                variant="faded"
                isDisabled
              >
                <EarthLock />
              </Button>
              <div className="flex flex-col justify-center items-start ml-4">
                <h1 className="text-lg md:text-xl font-bold">
                  Modalidad graduación
                </h1>
                <p className="text-sm md:text-base">
                  {gradeProfileStudentItem.gradeProfile.statusGraduationMode ==
                  -1 ? (
                    "SIN ASIGNAR"
                  ) : gradeProfileStudentItem.gradeProfile
                      .statusGraduationMode == 1 ? (
                    "Proyecto de grado"
                  ) : gradeProfileStudentItem.gradeProfile
                      .statusGraduationMode == 2 ? (
                    "Trabajo dirigido"
                  ) : gradeProfileStudentItem.gradeProfile
                      .statusGraduationMode == 3 ? (
                    "Tesis de grado"
                  ) : gradeProfileStudentItem.gradeProfile
                      .statusGraduationMode == 4 ? (
                    "Excelencia"
                  ) : (
                    <></>
                  )}
                </p>
              </div>
            </div>

            {/* TALLER */}
            <div className="flex items-center  rounded p-4">
              <Button
                className="w-12 h-12"
                isIconOnly
                variant="faded"
                isDisabled
              >
                <BookCopy />
              </Button>
              <div className="flex flex-col justify-center items-start ml-4">
                <h1 className="text-lg md:text-xl font-bold">Taller</h1>
                <p className="text-sm md:text-base">
                  {gradeProfileStudentItem.gradeProfile.isGradeoneortwo == 1
                    ? "Taller de grado 1"
                    : "Taller de grado 2"}
                </p>
              </div>
            </div>
          </CardBody>
          {(gradeProfileStudentItem.gradeProfile.statusGraduationMode == -1 ||
            gradeProfileStudentItem.tutor == null ||
            gradeProfileStudentItem.lecturer == null) && (
            <>
              <Divider />
              <CardFooter className="flex justify-center items-center bg-custom-purple">
                <div className="text-center rounded ">
                  <p className="font-bold text-xl text-white">
                    NECESITA ASIGNAR
                  </p>
                  <ul className="flex justify-center mt-2">
                    {gradeProfileStudentItem.gradeProfile
                      .statusGraduationMode == -1 && (
                      <li className="mr-4">
                        <span className="font-bold text-white">Graduación</span>
                      </li>
                    )}
                    {gradeProfileStudentItem.tutor == null && (
                      <li className="mr-4">
                        <span className="font-bold text-white">Tutor</span>
                      </li>
                    )}
                    {gradeProfileStudentItem.lecturer == null && (
                      <li className="mr-4">
                        <span className="font-bold text-white">Relator</span>
                      </li>
                    )}
                  </ul>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </>
  );
  return null;
};

export default GradeProfileComponent;
