import { useQuery } from "@tanstack/react-query";
import { useGradeProfileStudent } from "../providers/gradeProfileStudentProvider";
import { UserDetail } from "@/app/providers/SessionProvider";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, CircularProgress, Divider, Link } from "@nextui-org/react";
import { UserRoundCheck, UserRoundCog, Captions, EarthLock, BookCopy } from "lucide-react";
interface GradeProfileComponentProps {
    userDetails: UserDetail
}

const GradeProfileComponent = ({ userDetails }: GradeProfileComponentProps) => {
    // Importing data and methods from provider
    const { gradeProfileStudentItem, loadGradeProfileStudentItem, isGradeProfileStudentItemEmpty } = useGradeProfileStudent();
    //Query that fetches the end point, being called as soon the component builds it self
    const { isLoading, isError } = useQuery({
        queryKey: ["studentMilestone"],
        queryFn: async () => {
            await loadGradeProfileStudentItem(userDetails.userId);

            return gradeProfileStudentItem
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
    if (!isGradeProfileStudentItemEmpty(gradeProfileStudentItem)) {
        return (
            <div className="flex justify-center">
                <Card className="max-w-[340px]" key={gradeProfileStudentItem.gradeProfile.idGradePro}>
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                            <Avatar
                                className="bg-blue-500 font-bold"
                                isBordered
                                radius="full"
                                size="md"
                                name={`${gradeProfileStudentItem.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.name?.charAt(0).toUpperCase()}${gradeProfileStudentItem.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.fatherLastName?.charAt(0).toUpperCase()}${gradeProfileStudentItem.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.motherLastName?.charAt(0).toUpperCase()}`}
                            // name={`${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.name.charAt(0).toUpperCase()}${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName.charAt(0).toUpperCase()}${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.motherLastName.charAt(0).toUpperCase()}`}
                            />
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">
                                    {gradeProfileStudentItem.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.name ?? ''} {gradeProfileStudentItem.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.fatherLastName ?? ''}
                                </h4>
                                <h5 className="text-small tracking-tight text-default-400">
                                    {gradeProfileStudentItem.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.email ?? ''}
                                </h5>
                            </div>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody >
                        {/* TUTOR */}
                        <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                            <div className="col-span-1">
                                <Button className="w-16" isIconOnly variant="faded"> {/* Adjust the width as needed */}
                                    <UserRoundCheck />
                                </Button>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center items-start">
                                <h1 className="text-lg font-bold mb-2">
                                    Tutor
                                </h1>
                                <p className="text-sm">
                                    {gradeProfileStudentItem.tutor == null ? "SIN ASIGNAR" : `${gradeProfileStudentItem.tutor.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.name ?? ''} ${gradeProfileStudentItem.tutor.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.fatherLastName ?? ''}`}
                                </p>
                            </div>
                        </div>

                        {/* LECTURER */}
                        <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                            <div className="col-span-1">
                                <Button className="w-16" isIconOnly variant="faded">
                                    <UserRoundCheck />
                                </Button>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center items-start">
                                <h1 className="text-lg font-bold mb-2">
                                    Relator
                                </h1>
                                <p className="text-sm">
                                    {gradeProfileStudentItem.lecturer == null ? "SIN ASIGNAR" : `${gradeProfileStudentItem.lecturer.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.name ?? ''} ${gradeProfileStudentItem.lecturer.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.fatherLastName ?? ''}`}
                                </p>
                            </div>
                        </div>

                        {/* TITULO */}
                        <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                            <div className="col-span-1">
                                <Button className="w-16" isIconOnly variant="faded">
                                    <Captions />
                                </Button>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center items-start">
                                <h1 className="text-lg font-bold mb-2">
                                    Título
                                </h1>
                                <p className="text-sm">
                                    {gradeProfileStudentItem.gradeProfile.title == "" ? "SIN ASIGNAR" : `${gradeProfileStudentItem.gradeProfile.title}`}
                                </p>
                            </div>
                        </div>

                        {/* MODALIDAD GRADUACIÖN */}
                        <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                            <div className="col-span-1">
                                <Button className="w-16" isIconOnly variant="faded">
                                    <EarthLock />
                                </Button>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center items-start">
                                <h1 className="text-lg font-bold mb-2">
                                    Modalidad graduación
                                </h1>
                                <p className="text-sm">
                                    {gradeProfileStudentItem.gradeProfile.statusGraduationMode == -1
                                        ? "SIN ASIGNAR"
                                        : gradeProfileStudentItem.gradeProfile.statusGraduationMode == 1
                                            ? "Proyecto de grado"
                                            : gradeProfileStudentItem.gradeProfile.statusGraduationMode == 2
                                                ? "Trabajo dirigido"
                                                : gradeProfileStudentItem.gradeProfile.statusGraduationMode == 3
                                                    ? "Tesis de grado"
                                                    : gradeProfileStudentItem.gradeProfile.statusGraduationMode == 4
                                                        ? "Excelencia"
                                                        : <></>}
                                </p>
                            </div>
                        </div>

                        {/* TALLER */}
                        <div className="grid grid-cols-3 gap-2 border border-gray-300 rounded p-4">
                            <div className="col-span-1">
                                <Button className="w-16" isIconOnly variant="faded">
                                    <BookCopy />
                                </Button>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center items-start">
                                <h1 className="text-lg font-bold mb-2">
                                    Taller
                                </h1>
                                <p className="text-sm">
                                    {gradeProfileStudentItem.gradeProfile.isGradeoneortwo == 1 ? "Taller de grado 1" : "Taller de grado 2"}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="gap-3">
                        {/* <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">4</p>
                            <p className=" text-default-400 text-small">Following</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">97.1K</p>
                            <p className="text-default-400 text-small">Followers</p>
                        </div> */}
                    </CardFooter>
                </Card>
            </div>
        );

    }

}

export default GradeProfileComponent;