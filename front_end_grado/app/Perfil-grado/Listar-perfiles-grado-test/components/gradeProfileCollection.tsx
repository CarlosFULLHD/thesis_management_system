import { useQuery } from "@tanstack/react-query";
import { useGradeProfileLecturerCollection } from "../providers/gradeProfileLecturerCollectionProvider";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
} from "@nextui-org/react";
import { BookCopy, Captions, EarthLock, UserRoundCheck } from "lucide-react";
import TutorButton from "./tutorButton";
import LecturerButton from "./lecturerButton";
import TitleButton from "./titleButton";
import GraduationButton from "./graduationButton";
import WorkShopButton from "./workshopButton";

const GradeProfileLecturerCollection = () => {
  // Importing data and methods from provider
  const { gradeProfileLecturerList, loadGradeProfileLecturerList } =
    useGradeProfileLecturerCollection();

  const { isLoading, isError } = useQuery({
    queryKey: ["milestont"],
    queryFn: async () => {
      await loadGradeProfileLecturerList();
      return gradeProfileLecturerList;
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
  if (gradeProfileLecturerList.length > 0) {
    return (
      <>
        {/* TITTLE */}
        <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Perfiles de grado activos
        </h1>

        {/* GRADE PROFILES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gradeProfileLecturerList.map((item) => (
            <Card className="max-w-[500px]" key={item.gradeProfile.idGradePro}>
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <Avatar
                    className="bg-blue-500 font-bold"
                    isBordered
                    radius="full"
                    size="lg"
                    name={`${item.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.name?.charAt(0).toUpperCase()}${item.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.fatherLastName?.charAt(0).toUpperCase()}${item.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.motherLastName?.charAt(0).toUpperCase()}`}
                    // name={`${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.name.charAt(0).toUpperCase()}${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName.charAt(0).toUpperCase()}${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.motherLastName.charAt(0).toUpperCase()}`}
                  />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {item.gradeProfile.roleHasPerson?.usersIdUsers
                        .personIdPerson.name ?? ""}{" "}
                      {item.gradeProfile.roleHasPerson?.usersIdUsers
                        .personIdPerson.fatherLastName ?? ""}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                      {item.gradeProfile.roleHasPerson?.usersIdUsers
                        .personIdPerson.email ?? ""}
                    </h5>
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  variant="flat"
                  className="bg-custom-purple"
                >
                  Detalles
                </Button>
              </CardHeader>
              <Divider />
              <CardBody>
                {/* TUTOR */}
                <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                  <TutorButton
                    isDisabled={item.tutor == null ? false : true}
                    idGradePro={0}
                  />
                  <div className="col-span-2 flex flex-col justify-center items-start">
                    <h1 className="text-lg font-bold mb-2">Tutor</h1>
                    <p className="text-sm">
                      {item.tutor == null
                        ? "SIN ASIGNAR"
                        : `${item.tutor.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.name ?? ""} ${item.tutor.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.fatherLastName ?? ""}`}
                    </p>
                  </div>
                </div>

                {/* LECTURER */}
                <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                  <LecturerButton
                    isDisabled={item.lecturer == null ? false : true}
                    idGradePro={0}
                  />
                  <div className="col-span-2 flex flex-col justify-center items-start">
                    <h1 className="text-lg font-bold mb-2">Relator</h1>
                    <p className="text-sm">
                      {item.lecturer == null
                        ? "SIN ASIGNAR"
                        : `${item.lecturer.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.name ?? ""} ${item.lecturer.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.fatherLastName ?? ""}`}
                    </p>
                  </div>
                </div>

                {/* TITULO */}
                <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                  <TitleButton
                    isDisabled={item.gradeProfile.title == "" ? false : true}
                    idGradePro={item.gradeProfile.idGradePro}
                    title={item.gradeProfile.title}
                  />
                  <div className="col-span-2 flex flex-col justify-center items-start">
                    <h1 className="text-lg font-bold mb-2">Título</h1>
                    <p className="text-sm">
                      {item.gradeProfile.title == ""
                        ? "SIN ASIGNAR"
                        : `${item.gradeProfile.title}`}
                    </p>
                  </div>
                </div>

                {/* MODALIDAD GRADUACIÖN */}
                <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                  <GraduationButton
                    isDisabled={
                      item.gradeProfile.statusGraduationMode == -1
                        ? false
                        : true
                    }
                    idGradePro={item.gradeProfile.idGradePro}
                  />
                  <div className="col-span-2 flex flex-col justify-center items-start">
                    <h1 className="text-lg font-bold mb-2">
                      Modalidad graduación
                    </h1>
                    <p className="text-sm">
                      {item.gradeProfile.statusGraduationMode == -1 ? (
                        "SIN ASIGNAR"
                      ) : item.gradeProfile.statusGraduationMode == 1 ? (
                        "Proyecto de grado"
                      ) : item.gradeProfile.statusGraduationMode == 2 ? (
                        "Trabajo dirigido"
                      ) : item.gradeProfile.statusGraduationMode == 3 ? (
                        "Tesis de grado"
                      ) : item.gradeProfile.statusGraduationMode == 4 ? (
                        "Excelencia"
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                </div>

                {/* TALLER */}
                <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                  <WorkShopButton idGradePro={item.gradeProfile.idGradePro} />
                  <div className="col-span-2 flex flex-col justify-center items-start">
                    <h1 className="text-lg font-bold mb-2">Taller</h1>
                    <p className="text-sm">
                      {item.gradeProfile.isGradeoneortwo == 1
                        ? "Taller de grado 1"
                        : "Taller de grado 2"}
                    </p>
                  </div>
                </div>
              </CardBody>
              {item.gradeProfile.statusGraduationMode == -1 ||
              item.lecturer == null ||
              item.tutor == null ? (
                <>
                  <Divider />
                  <CardFooter className="flex justify-center items-center bg-custom-purple">
                    <div className="text-center rounded ">
                      <p className="font-bold text-xl">NECESITA ASIGNAR</p>
                      <ul className="flex">
                        {item.gradeProfile.statusGraduationMode == -1 && (
                          <li className="mr-4">
                            <span className="font-bold">Graduación</span>
                          </li>
                        )}
                        {item.tutor == null && (
                          <li className="mr-4">
                            <span className="font-bold">Tutor</span>
                          </li>
                        )}
                        {item.lecturer == null && (
                          <li className="mr-4">
                            <span className="font-bold">Relator</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardFooter>
                </>
              ) : (
                <></>
              )}
            </Card>
          ))}
        </div>
      </>
    );
  }
};

export default GradeProfileLecturerCollection;
