import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";

interface DetailsButtonProps {
  idGradePro: number;
}

const DetailsButton = ({ idGradePro }: DetailsButtonProps) => {
  // Routing instance and params
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  // Function to add params into selection tasks url
  const addParamsToUrl = (idGradePro: number) => {
    const params = new URLSearchParams(searchParams);
    if (idGradePro) {
      params.set("idGradePro", idGradePro.toString());
    } else {
      params.delete("idGradePro");
    }
    replace(`/Tareas/CoordinadorDirector/Seleccion?${params.toString()}`);
  };

  return (
    <Button
      radius="full"
      size="sm"
      variant="flat"
      className="bg-yellow-light dark:bg-yellow-dark font-bold text-lg"
      onClick={() => addParamsToUrl(idGradePro)}
    >
      Detalles
    </Button>
  );
};

export default DetailsButton;
