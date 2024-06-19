import { FaHistory } from "react-icons/fa";
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
      className="bg-blue-light text-off-white font-bold dark:bg-blue-dark"
      radius="full"
      variant="shadow"
      endContent={<FaHistory />}
    >
      Periodos academicos pasados
    </Button>
  );
};

export default HistoricAcademicPeriodButton;
