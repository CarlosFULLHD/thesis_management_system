import { Button, Chip, CircularProgress, Divider, Link, Textarea } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useMilestoneStudent } from "../providers/MilestoneStudentProvider";
import { FaEnvelope } from 'react-icons/fa';
import { useRouter } from "next/navigation";

interface DetailsPanelProps {
    idMilestone: number,
    userId: number,
}
const DetailsPanel = ({ idMilestone, userId }: DetailsPanelProps) => {
    // Importing data and method from provider
    const { milestoneItem, loadMilestoneItem, isMilestoneItemEmpty } = useMilestoneStudent();
    // Map for the radio buttons color and message 
    const colorStateMap: Map<string, [string, string]> = new Map([
        ['4', ["success", "Propuesta aprobada, se creo un perfil de grado para el estudiante"]],
        ['3', ["warning", "Propuesta observada, estudiante debe corregir su propuesta y esperar otra evaluación"]],
        ['2', ["danger", "Propuesta rechazada, la propuesta no cumple con las expectativas"]],
    ]);
    //Query that fetches the end point, being called as soon the component builds it self
    const { isLoading, isError } = useQuery({
        queryKey: ["studentMilestone"],
        queryFn: async () => {
            await loadMilestoneItem(userId);
            return milestoneItem
        }
    })
    // Routing instance and params
    const router = useRouter();


    // Fetching state
    if (isLoading) {
        return <CircularProgress aria-label="Cargando..." />;
    }
    // Error state
    if (isError) {
        return <div>Oops!</div>;
    }
    if (!isMilestoneItemEmpty(milestoneItem)) {
        return (
            <>
                {/* Title division */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                        Detalles carta de postulación
                    </h1>
                    <h1 className="text-2xl md:text-3xl font-bold ">
                        Alumno: {milestoneItem.usersIdUsers.personIdPerson.name}  {milestoneItem.usersIdUsers.personIdPerson.fatherLastName}  {milestoneItem.usersIdUsers.personIdPerson.motherLastName}
                    </h1>
                    <Divider />
                </div>
                {/* State division */}
                <div className={`w-full mt-4 mb-4 bg-${colorStateMap.get(milestoneItem.taskStatesIdTaskState.idTaskState.toString())![0]}`}>
                    <div className="h-16 flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                            {/* Message to be shown when the student sends its letter for the first time or corrects an observation */}
                            {milestoneItem.taskStatesIdTaskState.description}
                        </p>
                        <p className="font-bold">{colorStateMap.get(milestoneItem.taskStatesIdTaskState.idTaskState.toString())![1]}</p>
                    </div>
                </div>
                <Divider />
                {/* Evaluation council */}
                <div>
                    <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                        Panel evaluador
                    </h1>
                    <div className="flex justify-center space-x-4">
                        {milestoneItem.plpInvolved.split(";").map((item, index) => (
                            <Chip
                                key={index}
                                className={`bg-${colorStateMap.get((Math.floor(Math.random() * 3) + 2).toString())![0]}`}
                            >{item}</Chip>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                            Fecha de reunión:
                        </h1>
                        <p className="ml-2">{milestoneItem.meetingDate}</p>
                    </div>
                    <Divider />
                </div>
                <div>
                    <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                        Observaciones
                    </h1>
                    <Textarea
                        disabled
                        value={milestoneItem.comments}
                    >
                    </Textarea>
                    <Divider />
                </div>
                <div className="flex justify-center space-x-4">
                    <Link href={milestoneItem.url} target="_blank">
                        <FaEnvelope />
                        Carta de postulación
                        <FaEnvelope />
                    </Link>
                </div>
                <Divider />
                <div className="flex justify-center space-x-4">
                    <Button variant="ghost" color="primary" onPress={()=>router.push("/Hito-coordinador/Listar-periodo")}>Volver</Button>
                </div>


            </>
        );

    }

}

export default DetailsPanel;