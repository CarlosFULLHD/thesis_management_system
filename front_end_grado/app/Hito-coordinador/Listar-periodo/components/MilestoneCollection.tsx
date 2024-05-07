import { useQuery } from "@tanstack/react-query";
import { useMilestoneCollection } from "../providers/MilestoneCollectionProvider";
import { CircularProgress, Card, CardHeader, Divider, CardBody, CardFooter, Avatar, Button, Link } from "@nextui-org/react";
import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation";
import { FaEnvelope } from 'react-icons/fa';


const MilestoneCollection = () => {
    // Importing data and methods from provider
    const { milestoneList, loadMilestonesByAcademicPeriod } = useMilestoneCollection();
    // Routing instance and params
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    // Map for colors
    const colorsMap: Map<number, string> = new Map([
        [1, "bg-custom-purple"],  // EN ESPERA
        [2, "bg-danger"], // DESAPROBADO
        [3, "bg-custom-yellow"],// OBSERVADO
        [4, "bg-success"], // APROBADO
        [5, "bg-custom-blue"], // ABIERTO
        [6, "bg-danger"],// CERRADO
        [7, "bg-danger"],// SIN PRESENTAR
        [8, "bg-danger"]// PRESENTO TARDE
    ]);

    // Function to add params into the url
    const addParamsToUrl = (idMilestone: string, userId: string) => {
        const params = new URLSearchParams(searchParams);
        if (idMilestone && userId) {
            params.set('idMilestone', idMilestone);
            params.set('userId', userId);
        } else {
            params.delete('idMilestone');
            params.delete('userId')
        }
        replace(`/Hito-coordinador/Revisar-estudiante?${params.toString()}`)
    }

    // Routing method
    const goReviewStudent = (idMilestone: number, idUsers: number) => {
        return () => {
            addParamsToUrl(idMilestone.toString(), idUsers.toString())
        };
    }


    const { isLoading, isError } = useQuery({
        queryKey: ["milestont"],
        queryFn: async () => {
            await loadMilestonesByAcademicPeriod();
            return milestoneList;
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
    if (milestoneList.length > 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    milestoneList.map((item) => (
                        <Card className="m-8" isHoverable
                        >
                            <CardHeader className="justify-between">
                                <div className="flex gap-5">
                                    <Avatar
                                        className="bg-blue-500 font-bold"
                                        isBordered
                                        radius="full"
                                        size="md"
                                        name={`${item.usersIdUsers.personIdPerson.name.charAt(0).toUpperCase()}${item.usersIdUsers.personIdPerson.fatherLastName.charAt(0).toUpperCase()}${item.usersIdUsers.personIdPerson.motherLastName.charAt(0).toUpperCase()}`}
                                    />
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-small font-semibold leading-none text-default-600">{`${item.usersIdUsers.personIdPerson.name} ${item.usersIdUsers.personIdPerson.fatherLastName}`}</h4>
                                    </div>
                                </div>
    
                                {/* REVIEW BUTTON => (EN ESPERA)*/}
                                {item.taskStatesIdTaskState.idTaskState == 1
                                    ? <Button
                                        color="primary"
                                        radius="full"
                                        size="sm"
                                        variant="flat"
                                        onPress={(goReviewStudent(item.idMilestone, item.usersIdUsers.idUsers))}

                                    >
                                        Revisar
                                        {/* DETAILS BUTTON => (DESAPROBADO, OBSERVADO,APROBADO) */}
                                    </Button>
                                    : item.taskStatesIdTaskState.idTaskState == 2 || item.taskStatesIdTaskState.idTaskState == 3 || item.taskStatesIdTaskState.idTaskState == 4 ? <Button
                                        radius="full"
                                        size="sm"
                                        variant="flat"
                                    //onPress={(goReviewStudent(item.idMilestone, item.usersIdUsers.idUsers))}

                                    >
                                        Detalles
                                    </Button>
                                        : <></>
                                }
                            </CardHeader>
                            <Divider />

                            <CardBody>
                                {/* In case the student has been OBSERVADO or the letter has recently created ABIERTO */}
                                {item.taskStatesIdTaskState.idTaskState == 5 || item.taskStatesIdTaskState.idTaskState == 3
                                    ? <p className="text-s font-bold italic uppercase tracking-wide text-center">
                                        Esperando acción estudiante
                                    </p>
                                    // In case there are url or comments
                                    : <div>
                                        <Link href={item.url} target="_blank"><FaEnvelope />Carta postulación<FaEnvelope /></Link>
                                        {item.comments != ""
                                            ? <div><p><b>Observaciones:</b></p> <p>{item.comments}</p> </div>
                                            : <></>}
                                    </div>
                                }
                            </CardBody>

                            <Divider />
                            <CardFooter className={`flex justify-center items-center ${colorsMap.get(item.taskStatesIdTaskState.idTaskState)}`}>
                                <div className="text-center rounded ">
                                    <p className="text-xs uppercase tracking-wide">Estado</p>
                                    <p className="font-bold text-xl">
                                        {/* Message to be show when the student sends its letter for the first time or corrects an observation */}
                                        {item.taskStatesIdTaskState.idTaskState == 1
                                            ? "LISTA PARA REVISIÓN"
                                            : item.taskStatesIdTaskState.idTaskState == 5
                                            ? "ESPERANDO CARTA DEL ESTUDIANTE"
                                            : item.taskStatesIdTaskState.description
                                        }
                                    </p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div >
        );
    }
}

export default MilestoneCollection;