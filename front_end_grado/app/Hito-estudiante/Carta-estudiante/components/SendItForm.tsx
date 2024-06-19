import {
  Card,
  CardFooter,
  CardHeader,
  Image,
  CardBody,
  Chip,
  Link,
  Divider,
  Button,
} from "@nextui-org/react";
import { useMilestoneStudent } from "../../providers/MilestoneStudentProvider";
import { FaEnvelope } from "react-icons/fa";
import SaveFormButton from "./responseFormComponents/saveFormButton";
import SendFormButton from "./responseFormComponents/sendFormButton";
import { useRouter } from "next/navigation";

const SendItForm = () => {
  // Importing data and method from provider
  const { milestoneItem, saveOrSendMilestoneItem } = useMilestoneStudent();
  const router = useRouter();
  const colorsMap: Map<number, string[]> = new Map([
    [
      1,
      ["bg-blue-light", "En espera de revisión", "Deben evaluar tu propuesta"],
    ], // EN ESPERA
    [
      2,
      [
        "bg-danger",
        "Propuesta rechazada",
        "Debes presentar otra carta de postulación",
      ],
    ], // DESAPROBADO
    [
      3,
      ["bg-custom-yellow", "Propuesta observada", "Corrige las observaciones"],
    ], // OBSERVADO
    [
      4,
      [
        "bg-success",
        "Propuesta aprobada",
        "Felicidades, ahora se te asignará un tutor",
      ],
    ], // APROBADO
    [
      5,
      [
        "bg-custom-blue",
        "Propuesta abierta",
        "Prepare la propuesta para enviar",
      ],
    ], // ABIERTO
    [6, ["bg-danger", "Tarea cerrada", "No se pueden mandar propuestas"]], // CERRADO
    [7, ["bg-danger", "No se presento", "Oldivaste presentar la propuesta"]], // SIN PRESENTAR
    [
      8,
      ["bg-danger", "Propuesta atrasada", "La propuesta fue presentada tarde"],
    ], // PRESENTO TARDE
  ]);

  return (
    <>
      <div className="flex justify-center mb-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark pt-6">
          Estado de propuesta
        </h1>
      </div>
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader
            className={`${colorsMap.get(milestoneItem.taskStatesIdTaskState.idTaskState)![0]} pb-0 pt-2 px-4 flex-col items-center text-off-white`}
          >
            <p className="text-lg italic lg:text-xl">
              {
                colorsMap.get(
                  milestoneItem.taskStatesIdTaskState.idTaskState
                )![2]
              }
            </p>
            <h4 className="font-bold text-xl pb-2 lg:text-2xl">
              {
                colorsMap.get(
                  milestoneItem.taskStatesIdTaskState.idTaskState
                )![1]
              }
            </h4>
          </CardHeader>
          <Divider />
          <CardBody className="p-2 px-6">
            <div className="flex justify-center">
              <Button
                as={Link}
                href={milestoneItem.url}
                className="bg-yellow-light dark:bg-yellow-dark font-bold text-black"
                isExternal={true}
              >
                Ver tu carta <FaEnvelope />
              </Button>
            </div>
            {milestoneItem.comments && (
              <div>
                <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                  Observaciones:
                </h1>
                <p>{milestoneItem.comments}</p>
              </div>
            )}
            {milestoneItem.meetingDate &&
              milestoneItem.taskStatesIdTaskState.idTaskState != 1 && (
                <div className="flex items-center mt-2">
                  <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                    Fecha evaluación:
                  </h1>
                  <p className="ml-2">{milestoneItem.meetingDate}</p>
                </div>
              )}
            {milestoneItem.plpInvolved && (
              <div className="mt-4">
                <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                  Panel evaluador:
                </h1>
                <div className="mt-2 space-y-2">
                  {milestoneItem.plpInvolved.split(";").map((item, index) => (
                    <Chip key={index} className={`w-full flex flex-col`}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
            )}
          </CardBody>
          {milestoneItem.taskStatesIdTaskState.idTaskState == 2 && (
            <>
              <Divider />
              <CardFooter className="flex justify-center mt-4 py-2">
                <div className="space-x-4">
                  <SaveFormButton />
                  <SendFormButton />
                </div>
              </CardFooter>
            </>
          )}
          {milestoneItem.taskStatesIdTaskState.idTaskState == 4 && (
            <div className="flex flex-col items-center p-4">
              <Divider />
              <p className="text-lg lg:text-xl italic">
                Felicidades, se te creó un perfil de grado
              </p>
              <Button
                onPress={() => router.push("/Perfil-grado/Estudiante")}
                className="bg-yellow-light dark:bg-yellow-dark font-bold text-black"
              >
                Ir a perfil de grado
              </Button>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default SendItForm;
