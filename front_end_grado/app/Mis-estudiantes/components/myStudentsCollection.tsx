import { UserDetail } from "@/app/providers/SessionProvider";
import MyStudentsTitle from "./myStudentsTitle";
import { useMyStudents } from "../providers/MyStudentsProvider";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, CardBody, CardFooter, CardHeader, CircularProgress, Divider } from "@nextui-org/react";
import SelectTutorLecturer from "./selectTutorLecturer";
import { useState } from "react";
import { WholeWord, BookCopy, EarthLock } from "lucide-react";
import TaskButton from "./tasksButton";


interface MyStudentsCollectionProps {
    userDetails: UserDetail
}
const MyStudentsCollection = ({ userDetails }: MyStudentsCollectionProps) => {
    // Importing data and method from provider
    const { myStudentsList, loadMyStudents } = useMyStudents();

    // State for radio buttons
    const [radioValue, setRadioValue] = useState<number>(0);
    // callback for the radio value
    const radioValueCallback = async (newValue: number) => {
        await loadMyStudents(userDetails.userId, newValue == 1 ? true : false);
        setRadioValue(newValue)
    }


    const { isLoading, isError } = useQuery({
        queryKey: ["gradeprofiles"],
        queryFn: async () => {
            await loadMyStudents(userDetails.userId, false);
            return myStudentsList;
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
    if (myStudentsList.length > 0) {
        return (
            <>
                <MyStudentsTitle />
                <SelectTutorLecturer radioValue={radioValue} radioValueCallback={radioValueCallback} />
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-1 lg:grid-cols-1 gap-4">
                        {
                            myStudentsList.map((item) => (
                                <Card key={item.gradeProfileIdGradePro.idGradePro}>
                                    <CardHeader>
                                        <div className="flex gap-5">
                                            <Avatar
                                                className="bg-blue-500 font-bold"
                                                isBordered
                                                radius="full"
                                                size="sm"
                                                name={`${item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers?.personIdPerson.name?.charAt(0).toUpperCase()}${item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers?.personIdPerson.fatherLastName?.charAt(0).toUpperCase()}${item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers?.personIdPerson.motherLastName?.charAt(0).toUpperCase()}`}
                                            />
                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                <h4 className="text-small font-semibold leading-none text-default-600">
                                                    {item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers?.personIdPerson.name ?? ''} {item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers?.personIdPerson.fatherLastName ?? ''}
                                                </h4>
                                                <h5 className="text-small tracking-tight text-default-400">
                                                    {item.gradeProfileIdGradePro.roleHasPerson.usersIdUsers?.personIdPerson.email ?? ''}
                                                </h5>
                                            </div>
                                        </div>

                                    </CardHeader>
                                    <Divider />
                                    <CardBody>

                                        {/* Title */}
                                        <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                                            <WholeWord />
                                            <div className="col-span-2 flex flex-col justify-center items-start">
                                                <h1 className="text-lg font-bold mb-2">
                                                    Título
                                                </h1>
                                                <p className="text-sm">
                                                    {item.gradeProfileIdGradePro.title == "" ? "SIN ASIGNAR" : `${item.gradeProfileIdGradePro.title}`}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Workshop */}
                                        <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                                            <BookCopy />
                                            <div className="col-span-2 flex flex-col justify-center items-start">
                                                <h1 className="text-lg font-bold mb-2">
                                                    Taller
                                                </h1>
                                                <p className="text-sm">
                                                    {item.gradeProfileIdGradePro.isGradeoneortwo == 1 ? "Taller de grado 1" : "Taller de grado 2"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* MODALIDAD GRADUACIÖN */}
                                        <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                                            <EarthLock />
                                            <div className="col-span-2 flex flex-col justify-center items-start">
                                                <h1 className="text-lg font-bold mb-2">
                                                    Modalidad graduación
                                                </h1>
                                                <p className="text-sm">
                                                    {item.gradeProfileIdGradePro.statusGraduationMode == -1
                                                        ? "SIN ASIGNAR"
                                                        : item.gradeProfileIdGradePro.statusGraduationMode == 1
                                                            ? "Proyecto de grado"
                                                            : item.gradeProfileIdGradePro.statusGraduationMode == 2
                                                                ? "Trabajo dirigido"
                                                                : item.gradeProfileIdGradePro.statusGraduationMode == 3
                                                                    ? "Tesis de grado"
                                                                    : item.gradeProfileIdGradePro.statusGraduationMode == 4
                                                                        ? "Excelencia"
                                                                        : <></>}
                                                </p>
                                            </div>
                                        </div>

                                    </CardBody>
                                    <Divider />
                                    <CardFooter className="flex justify-center">

                                        <div className="space-x-4">
                                            <TaskButton idGradePro={item.gradeProfileIdGradePro.idGradePro}/>
                                        </div>

                                    </CardFooter>
                                </Card>

                            ))
                        }
                    </div >
                </div>
            </>
        );
    }
}

export default MyStudentsCollection;