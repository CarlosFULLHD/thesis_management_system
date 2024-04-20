import { FaTasks } from 'react-icons/fa';
import { Button, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAcademicPeriod } from '../../providers/AcademicPeriodProvider';

interface AssignTaskButtonHistoricProps {
    idAcad: number
}

const AssignTaskButtonHistoric = ({ idAcad } : AssignTaskButtonHistoricProps) => {
    // Importing data and method from provider
    const { getAcademicPeriodById, fetchMainAcademicPeriod } = useAcademicPeriod();
    // Instanciating routing class
    const router = useRouter();

    const redirectToNewPageAndLoadProvider = () => {
        fetchMainAcademicPeriod(getAcademicPeriodById(idAcad)!)
        return () => {  
            router.push(`/Periodo-academico/Tareas`);
        };
    };

    return (
        <div>
            <Tooltip color="warning" content="Asignar tareas">
                <Button
                    key="blur"
                    color="warning"
                    variant="ghost"
                    onClick={redirectToNewPageAndLoadProvider()}
                >
                    <FaTasks />
                </Button>
            </Tooltip>
        </div>
    );
}

export default AssignTaskButtonHistoric;