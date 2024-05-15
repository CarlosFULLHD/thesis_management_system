import { UserDetail } from "@/app/providers/SessionProvider";
import {
    Card, CardFooter, CardHeader, Image,
    Divider,
    CardBody,
    Chip,
    Link
} from "@nextui-org/react";
import { useMilestoneStudent } from "../../providers/MilestoneStudentProvider";
import SaveFormButton from "./responseFormComponents/saveFormButton";
import SendFormButton from "./responseFormComponents/sendFormButton";
import { FaEnvelope } from "react-icons/fa";
interface InitialFormProps {
    userDetails: UserDetail
}
const ResponseForm = ({ userDetails }: InitialFormProps) => {

    // Importing data and method from provider
    const { milestoneItem } = useMilestoneStudent();
    // Map for colors
    // Map for colors
    const colorsMap: Map<number, string[]> = new Map([
        [1, ["bg-custom-purple", "En espera de revisión", "Deben evaluar tu propuesta"]],  // EN ESPERA
        [2, ["bg-danger", "Propuesta rechazada", "Debes presentar otra carta de postulación"]], // DESAPROBADO
        [3, ["bg-custom-yellow", "Propuesta observada", "Corrige las observaciones"]],// OBSERVADO
        [4, ["bg-success", "Propuesta aprobada", "Felicidades, ahora necesitas un tutor"]], // APROBADO
        [5, ["bg-custom-blue", "Propuesta abierta", "Prepare la propuesta para enviar"]], // ABIERTO
        [6, ["bg-danger", "Tarea cerrada", "No se pueden mandar propuestas"]], // CERRADO
        [7, ["bg-danger", "No se presento", "Oldivaste presentar la propuesta"]], // SIN PRESENTAR
        [8, ["bg-danger", "Propuesta atrasada", "La propuesta fue presentada tarde"]], // PRESENTO TARDE
    ]);

    return (
        <>
            {/* Title division */}
            <div className="flex justify-center mb-10">
                <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                    Estado propuesta de trabajo
                </h1>

            </div>
            <div className="flex justify-center">
                <Card className="" >
                    <CardHeader className={`pb-0 pt-2 px-4 flex-col items-center ${colorsMap.get(milestoneItem.taskStatesIdTaskState.idTaskState)![0]}`}>
                        <p className="text-tiny  italic">
                            {colorsMap.get(milestoneItem.taskStatesIdTaskState.idTaskState)![2]}
                        </p>
                        <h4 className="font-bold text-large">
                            {colorsMap.get(milestoneItem.taskStatesIdTaskState.idTaskState)![1]}
                        </h4>
                    </CardHeader>
                    <Divider />
                    <CardBody className="overflow-visible py-2">
                        <div className="flex justify-center mt-4">
                            <Chip color="default"><Link href="https://drive.google.com/file/d/1KFDUyNch5uzvNkDF8NAu3CZXuHUQ4JZ6/view?usp=sharing" target="_blank">Ejemplo</Link></Chip>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Chip className={colorsMap.get(milestoneItem.taskStatesIdTaskState.idTaskState)![0]}><Link href={milestoneItem.url} target="_blank"><FaEnvelope />Tu carta<FaEnvelope /></Link></Chip>
                        </div>
                        {milestoneItem.comments && (
                            <div>
                                <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                                    Observaciones
                                </h1>
                                <p>{milestoneItem.comments}</p>
                            </div>
                        )}
                        {milestoneItem.meetingDate && (
                            <div className="flex items-center"> {/* Flex container to make items align horizontally */}
                            <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                                Fecha evaluación: 
                            </h1>
                            <p>{milestoneItem.meetingDate}</p>
                        </div>
                        )}
                        {milestoneItem.plpInvolved && (
                           <div className="flex items-center"> 
                                <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                                    Panel evaluador: 
                                </h1>
                                <div className="flex justify-center overflow-x-auto space-x-4">
                                    {milestoneItem.plpInvolved.split(";").map((item, index) => (
                                        <Chip
                                            key={index}
                                            className={`${colorsMap.get((Math.floor(Math.random() * 5) + 2))![0]}`}
                                        >{item}</Chip>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex justify-center">

                        <div className="space-x-4">
                            <SaveFormButton />
                            <SendFormButton />
                        </div>

                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

export default ResponseForm;
