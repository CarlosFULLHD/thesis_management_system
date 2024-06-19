import { useMyStudents } from "../providers/MyStudentsProvider";
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
import { WholeWord, BookCopy, EarthLock } from "lucide-react";
import TaskButton from "./tasksButton";
import FormalDefenseButton from "./formalDefenseButton";

interface MyStudentsCollectionProps {
  radioValue: number;
}

const MyStudentsCollection = ({ radioValue }: MyStudentsCollectionProps) => {
  // Importing data and method from provider
  const { myStudentsList } = useMyStudents();

  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          {myStudentsList.map((item) => (
            <Card key={item.gradeProfileIdGradePro.idGradePro}>
              <CardHeader className="justify-between bg-yellow-light dark:bg-yellow-dark">
                <div className="flex gap-5">
                  <Avatar
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    className="font-bold text-black"
                    isBordered
                    radius="full"
                    size="lg"
                    name={`${item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers?.personIdPerson.name?.charAt(0).toUpperCase()}${item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers?.personIdPerson.fatherLastName?.charAt(0).toUpperCase()}${item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers?.personIdPerson.motherLastName?.charAt(0).toUpperCase()}`}
                  />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-lg md:text-xl font-bold leading-none text-black">
                      {item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers
                        ?.personIdPerson.name ?? ""}{" "}
                      {item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers
                        ?.personIdPerson.fatherLastName ?? ""}
                    </h4>
                    <h5 className="text-md md:text-lg font-bold tracking-tight text-default-400">
                      {item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers
                        ?.personIdPerson.email ?? ""}
                    </h5>
                  </div>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-4">
                {/* Title */}
                <div className="flex items-center rounded p-4">
                  <Button
                    className="w-12 h-12"
                    isIconOnly
                    variant="faded"
                    isDisabled
                  >
                    <WholeWord />
                  </Button>
                  <div className="flex flex-col justify-center items-start ml-4">
                    <h1 className="text-lg md:text-xl font-bold">Título</h1>
                    <p className="text-sm md:text-base">
                      {item.gradeProfileIdGradePro.title == ""
                        ? "SIN ASIGNAR"
                        : `${item.gradeProfileIdGradePro.title}`}
                    </p>
                  </div>
                </div>

                {/* Workshop */}
                <div className="flex items-center rounded p-4">
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
                      {item.gradeProfileIdGradePro.isGradeoneortwo == 1
                        ? "Taller de grado 1"
                        : "Taller de grado 2"}
                    </p>
                  </div>
                </div>

                {/* MODALIDAD GRADUACIÖN */}
                <div className="flex items-center rounded p-4">
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
                      {item.gradeProfileIdGradePro.statusGraduationMode ==
                      -1 ? (
                        "SIN ASIGNAR"
                      ) : item.gradeProfileIdGradePro.statusGraduationMode ==
                        1 ? (
                        "Proyecto de grado"
                      ) : item.gradeProfileIdGradePro.statusGraduationMode ==
                        2 ? (
                        "Trabajo dirigido"
                      ) : item.gradeProfileIdGradePro.statusGraduationMode ==
                        3 ? (
                        "Tesis de grado"
                      ) : item.gradeProfileIdGradePro.statusGraduationMode ==
                        4 ? (
                        "Excelencia"
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                </div>
              </CardBody>
              {radioValue == 0 && (
                <>
                  <CardFooter className="flex justify-center ">
                    <div className="space-x-4">
                      <FormalDefenseButton
                        idGradePro={item.gradeProfileIdGradePro.idGradePro}
                      />
                      <TaskButton
                        idGradePro={item.gradeProfileIdGradePro.idGradePro}
                        userId={
                          item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers
                            ?.idUsers ?? 0
                        }
                      />
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyStudentsCollection;
