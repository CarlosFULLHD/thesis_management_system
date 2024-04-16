import { FaHistory } from 'react-icons/fa';
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
const HistoricAcademicPeriodButton = () => {
    const router = useRouter();

    const redirectToNewPage = (route: string) => {
        return () => {  
            router.push(`/Periodo-academico/${route}`);
        };
    };
    return (
        <Button
            onClick={redirectToNewPage("Historial")}
            color="success"
            radius="full"
            variant="shadow"
            endContent={<FaHistory />}
        >
            Historial
        </Button>
    )
}

export default HistoricAcademicPeriodButton;