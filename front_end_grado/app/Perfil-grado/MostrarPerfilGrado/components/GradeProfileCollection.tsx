import { GradeProfileItem } from "@/app/GestionPerfilGrado/providers/GradeProfileProvider";
import { BASE_URL } from "@/config/globals";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, CircularProgress, Avatar, Button } from "@nextui-org/react";

const GradeProfileCollection = () => {
    // Fetch data function
    const fetchData = async () => fetch(`${BASE_URL}grade-profile/`).then((res) => res.json());

    const [gradeProfileMapItems, setGradeProfileMapItems] = useState<GradeProfileItem[]>([]);
    // Loading state
    const loadGradeProfileMap = (response: any) => {
        if (response.status == 200) {
            setGradeProfileMapItems(response["result"]);
        }
    }

    // Query fetching end poing, being called as soon the component renders it
    const { isLoading, isError } = useQuery({
        queryKey: ["infoTable"],
        queryFn: async () => {
            const data = await fetchData();
            loadGradeProfileMap(data)
            return data
        }
    });
    // Fetching state
    if (isLoading) {
        return <CircularProgress aria-label="Cargando..." />;
    }
    // Error state
    if (isError) {
        return
        <div>Oops!</div>;
    }
    // Success state
    if (gradeProfileMapItems.length > 0) {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gradeProfileMapItems.map((gradeProfile: GradeProfileItem) => (
                        <div>
                            <Card className="max-w-[340px]" key={gradeProfile.idGradePro}>
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <Avatar
                                            className="bg-blue-500 font-bold"
                                            isBordered
                                            radius="full"
                                            size="md"
                                            name={`${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.name.charAt(0).toUpperCase()}${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName.charAt(0).toUpperCase()}${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.motherLastName.charAt(0).toUpperCase()}`}
                                        />
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small font-semibold leading-none text-default-600">{`${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.name} ${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName}`}</h4>
                                            <h5 className="text-small tracking-tight text-default-400">{gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.email}</h5>
                                        </div>
                                    </div>
                                    <Button
                                        
                                        color="primary"
                                        radius="full"
                                        size="sm"
                                    
                                    >
                                        {/* {isFollowed ? "Unfollow" : "Follow"} */}
                                        Detalles
                                    </Button>
                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <h1>
                                        Título: {gradeProfile.title == "" ? "SIN ASIGNAR" : gradeProfile.title}
                                    </h1>
                                    <span className="pt-2">
                                        <h2>Modalidad graduación: {gradeProfile.statusGraduationMode == 1 ? "Proyecto de grado" : gradeProfile.statusGraduationMode == 2 ? "Tesis" : gradeProfile.statusGraduationMode == 3 ? "Trabajo dirigido" : gradeProfile.statusGraduationMode == -1 ? "Sin asignar" : "Sin asignar"}</h2>
                                    </span>
                                </CardBody>
                                <CardFooter className="gap-3">
                                    <div className="flex gap-1">
                                        <p className="font-semibold text-default-400 text-small">4</p>
                                        <p className=" text-default-400 text-small">Following</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <p className="font-semibold text-default-400 text-small">97.1K</p>
                                        <p className="text-default-400 text-small">Followers</p>
                                    </div>
                                </CardFooter>
                            </Card>

                        </div>
                    ))}
                </div>
            </>
        );
    } else {
        return <div>No existe información por ahora.</div>;
    }

}


export default GradeProfileCollection;