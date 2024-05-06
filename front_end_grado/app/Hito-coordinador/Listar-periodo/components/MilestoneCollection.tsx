import { useQuery } from "@tanstack/react-query";
import { useMilestoneCollection } from "../providers/MilestoneCollectionProvider";
import { CircularProgress, Card, CardHeader, Divider, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";


const MilestoneCollection = () => {
    // Importing data and methods from provider
    const { milestoneList, loadMilestonesByAcademicPeriod } = useMilestoneCollection();

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
                            isDisabled={item.isStudentOrCoordinator == 1 ? true : false}
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
                                <Button
                                    color="primary"
                                    radius="full"
                                    size="sm"
                                    variant="flat"
                                    isDisabled={item.isStudentOrCoordinator == 1 ? true : false}
                                >
                                    Detalles
                                </Button>

                            </CardHeader>
                            <Divider />

                            <CardBody>
                                {item.isStudentOrCoordinator == 1
                                    ? <p className="text-s font-bold italic uppercase tracking-wide text-center">
                                        Esperando acción estudiante
                                    </p>
                                    : ""
                                }
                            </CardBody>

                            <Divider />
                            <CardFooter className={`flex justify-center items-center ${item.taskStatesIdTaskState.idTaskState == 1 ? 'bg-custom-purple' : // EN ESPERA
                                item.taskStatesIdTaskState.idTaskState == 2 ? 'bg-custom-red' : // DESAPROBADO
                                    item.taskStatesIdTaskState.idTaskState == 3 ? 'bg-custom-yellow' : // OBSERVADO
                                        item.taskStatesIdTaskState.idTaskState == 4 ? 'bg-custom-green' : // APROBADO
                                            item.taskStatesIdTaskState.idTaskState == 5 ? 'bg-custom-blue' : // ABIERTO
                                                item.taskStatesIdTaskState.idTaskState == 6 ? 'bg-custom-red' : // CERRADO
                                                    item.taskStatesIdTaskState.idTaskState == 7 ? 'bg-custom-red' : // SIN PRESENTAR
                                                        item.taskStatesIdTaskState.idTaskState == 8 ? 'bg-custom-red' : // PRESENTO TARDE
                                                            ""
                                }`}>
                                <div className="text-center rounded ">
                                    <p className="text-xs uppercase tracking-wide">Estado</p>
                                    <p className="font-bold text-xl">{item.taskStatesIdTaskState.description}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        );
    }
}

export default MilestoneCollection;