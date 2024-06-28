import { useQuery } from "@tanstack/react-query";
import { useMilestoneCollection } from "../providers/MilestoneCollectionProvider";
import {
  CircularProgress,
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Link,
  Chip,
} from "@nextui-org/react";
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation";
import { FaEnvelope } from "react-icons/fa";
import React, { ReactElement } from "react";

const MilestoneCollection = () => {
  // Importing data and methods from provider
  const { milestoneList, loadMilestonesByAcademicPeriod } =
    useMilestoneCollection();
  // Routing instance and params
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  // Map for colors
  const colorsMap: Map<number, string> = new Map([
    [1, "bg-custom-purple px-4"], // EN ESPERA
    [2, "bg-danger"], // DESAPROBADO
    [3, "bg-custom-yellow"], // OBSERVADO
    [4, "bg-success"], // APROBADO
    [5, "bg-custom-blue"], // ABIERTO
    [6, "bg-danger"], // CERRADO
    [7, "bg-danger"], // SIN PRESENTAR
    [8, "bg-danger"], // PRESENTO TARDE
  ]);

  const { isLoading, isError } = useQuery({
    queryKey: ["milestont"],
    queryFn: async () => {
      await loadMilestonesByAcademicPeriod();
      return milestoneList;
    },
  });

  if (isLoading) {
    return <CircularProgress aria-label="Cargando..." />;
  }

  if (isError) {
    return <div>Oops! Something went wrong.</div>;
  }

  if (milestoneList.length === 0) {
    return <div>No milestones available.</div>;
  }

  // Function to add params into the url and redirect to the review form
  const addParamsToUrl = (idMilestone: string, userId: string) => {
    const params = new URLSearchParams(searchParams);
    if (idMilestone && userId) {
      params.set("idMilestone", idMilestone);
      params.set("userId", userId);
    } else {
      params.delete("idMilestone");
      params.delete("userId");
    }
    replace(`/Hito-coordinador/Revisar-estudiante?${params.toString()}`);
  };

  // Function to add params into the url and redirect to the details panel
  const addParamsToDetailsUrl = (idMilestone: string, userId: string) => {
    const params = new URLSearchParams(searchParams);
    if (idMilestone && userId) {
      params.set("idMilestone", idMilestone);
      params.set("userId", userId);
    } else {
      params.delete("idMilestone");
      params.delete("userId");
    }
    replace(`/Hito-coordinador/Detalle-estudiante?${params.toString()}`);
  };

  // Routing method to the review form
  const goReviewStudent = (idMilestone: number, idUsers: number) => {
    return () => {
      addParamsToUrl(idMilestone.toString(), idUsers.toString());
    };
  };

  // Routing method to the details panel
  const goDetailsStudent = (idMilestone: number, idUsers: number) => {
    return () => {
      addParamsToDetailsUrl(idMilestone.toString(), idUsers.toString());
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {milestoneList.map((item) => (
        <Card
          key={item.idMilestone}
          className="m-4 bg-background-light dark:bg-background-darker shadow-lg"
        >
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                className="bg-blue-light font-bold text-off-white"
                isBordered
                radius="full"
                size="md"
                name={`${item.usersIdUsers.personIdPerson.name.charAt(0).toUpperCase()}${item.usersIdUsers.personIdPerson.fatherLastName.charAt(0).toUpperCase()}${item.usersIdUsers.personIdPerson.motherLastName.charAt(0).toUpperCase()}`}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600 dark:text-off-white">{`${item.usersIdUsers.personIdPerson.name} ${item.usersIdUsers.personIdPerson.fatherLastName}`}</h4>
              </div>
            </div>

            {/* REVIEW BUTTON => (EN ESPERA)*/}
            {item.taskStatesIdTaskState.idTaskState == 1 ? (
              <Button
                className={colorsMap.get(
                  item.taskStatesIdTaskState.idTaskState
                )}
                radius="full"
                variant="flat"
                onPress={goReviewStudent(
                  item.idMilestone,
                  item.usersIdUsers.idUsers
                )}
              >
                Revisar
                {/* DETAILS BUTTON => (DESAPROBADO, OBSERVADO,APROBADO) */}
              </Button>
            ) : item.taskStatesIdTaskState.idTaskState == 2 ||
              item.taskStatesIdTaskState.idTaskState == 3 ||
              item.taskStatesIdTaskState.idTaskState == 4 ? (
              <Button
                className={colorsMap.get(
                  item.taskStatesIdTaskState.idTaskState
                )}
                radius="full"
                size="sm"
                variant="flat"
                onPress={goDetailsStudent(
                  item.idMilestone,
                  item.usersIdUsers.idUsers
                )}
              >
                Detalles
              </Button>
            ) : (
              <></>
            )}
          </CardHeader>
          <Divider />

          <CardBody className="bg-background-light dark:bg-background-darker text-off-white">
            {/* In case the student has been OBSERVADO or the letter has recently created ABIERTO */}
            {item.taskStatesIdTaskState.idTaskState == 5 ? (
              <p className="text-s font-bold italic uppercase tracking-wide text-center">
                <Chip
                  className={`${colorsMap.get(item.taskStatesIdTaskState.idTaskState)} text-off-white`}
                  variant="faded"
                >
                  Esperando acción estudiante
                </Chip>
              </p>
            ) : // In case there are url or comments
            item.taskStatesIdTaskState.idTaskState == 3 ? (
              <>
                <p className="text-s font-bold italic uppercase tracking-wide text-center">
                  <Chip
                    className={colorsMap.get(
                      item.taskStatesIdTaskState.idTaskState
                    )}
                    variant="faded"
                  >
                    Esperando acción estudiante
                  </Chip>
                </p>{" "}
                <div>
                  {item.comments != "" ? (
                    <div className="text-black dark:text-off-white">
                      <p>
                        <b>Observaciones:</b>
                      </p>
                      <p>{item.comments}</p>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="flex justify-center mt-4">
                    <Chip
                      className={colorsMap.get(
                        item.taskStatesIdTaskState.idTaskState
                      )}
                    >
                      <Link
                        href={item.url}
                        target="_blank"
                        className="text-blue-light"
                      >
                        <FaEnvelope />
                        Carta postulación
                        <FaEnvelope />
                      </Link>
                    </Chip>
                  </div>
                </div>
              </>
            ) : (
              <div>
                {item.comments != "" ? (
                  <div className="text-black dark:text-off-white">
                    <p>
                      <b>Observaciones:</b>
                    </p>
                    <p>{item.comments}</p>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex justify-center mt-4">
                  <Chip
                    className={colorsMap.get(
                      item.taskStatesIdTaskState.idTaskState
                    )}
                  >
                    <Link href={item.url} target="_blank">
                      Carta postulación
                      <FaEnvelope />
                    </Link>
                  </Chip>
                </div>
              </div>
            )}
          </CardBody>

          <Divider />
          <CardFooter
            className={`flex justify-center items-center ${colorsMap.get(item.taskStatesIdTaskState.idTaskState)}`}
          >
            <div className="text-center rounded ">
              <p className="text-xs uppercase tracking-wide text-off-white">
                Estado
              </p>
              <p className="font-bold text-xl text-off-white">
                {/* Message to be show when the student sends its letter for the first time or corrects an observation */}
                {item.taskStatesIdTaskState.idTaskState == 1
                  ? "LISTA PARA REVISIÓN"
                  : item.taskStatesIdTaskState.idTaskState == 5
                    ? "EN ESPERA DE CARTA"
                    : item.taskStatesIdTaskState.description}
              </p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MilestoneCollection;
