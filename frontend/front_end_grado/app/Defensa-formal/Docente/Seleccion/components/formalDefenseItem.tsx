import { Button } from "@nextui-org/button";
import { useFormalDefense } from "../../providers/formalDefenseProvider";
import { Chip, Divider, Input, Link, Textarea } from "@nextui-org/react";
import { BASE_URL } from "@/config/globals";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

interface FormalDefenseitemProps {
    idGradePro: number
}

const FormalDefenseitem = ({ idGradePro }: FormalDefenseitemProps) => {
    // Provider and methods
    const { formalDefenseItem } = useFormalDefense();
    // Routing instance and params
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    const colorsMap: Map<number, string[]> = new Map([
        [
            1,
            [
                "bg-custom-purple",
                "En espera de revisión",
                "Lista para ser revisada",
            ],
        ], // EN ESPERA
        [
            2,
            [
                "bg-danger",
                "REPROBADO",
                `Nota final ${formalDefenseItem.grade}` ,
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
                "APROBADO",
                `Nota final ${formalDefenseItem.grade}` ,
            ],
        ], // APROBADO
        [
            5,
            [
                "bg-custom-blue",
                "Propuesta abierta",
                "En espera de que el estudiante envie documento a evaluar",
            ],
        ], // ABIERTO
        [6, ["bg-danger", "Tarea cerrada", "No se pueden mandar propuestas"]], // CERRADO
        [7, ["bg-danger", "No se presento", "Oldivaste presentar la propuesta"]], // SIN PRESENTAR
        [
            8,
            ["bg-danger", "Propuesta atrasada", "La propuesta fue presentada tarde"],
        ], // PRESENTO TARDE
    ]);

    // Method to re route to review formal defense 
    const routeToReviewFormalDefense = () => {
        const params = new URLSearchParams(searchParams);
        if (idGradePro) {
            params.set("idGradePro", idGradePro.toString());
        } else {
            params.delete("idGradePro");
        }
        replace(`/Defensa-formal/Docente/Revisar?${params.toString()}`);
    }


    const handleGeneratePDF = async () => {
        try {
            const response = await fetch(`${BASE_URL}pdf?idGradePro=${idGradePro}`);
            if (!response.ok) {
                throw new Error("Error con la red")
            }
            const data = await response.json() as {
                timeStamp: string,
                status: string,
                message: string,
                result: string
            };

            // Decoding string to base64
            const bytesCharacters = atob(data.result);
            const byteNumbers = new Array(bytesCharacters.length)
            for (let i = 0; i < bytesCharacters.length; i++) {
                byteNumbers[i] = bytesCharacters.charCodeAt(i)
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "acta_defensa_formal.pdf")
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Acta de defensa formal descargada")
        } catch (error) {
            toast.error("Error al generar PDF")
        }

    };



    return (
        <>
            <div className="flex flex-row items-start justify-start space-x-4">
                {formalDefenseItem.taskStatesIdTaskState?.idTaskState !== 5 && (<Button color="success" variant="ghost" onClick={async () => { await handleGeneratePDF() }}>Imprimir acta</Button>)}
                {(formalDefenseItem.taskStatesIdTaskState?.idTaskState !== 4 && formalDefenseItem.taskStatesIdTaskState?.idTaskState !== 2 && formalDefenseItem.taskStatesIdTaskState?.idTaskState !== 5) && (<Button color="warning" variant="ghost" onClick={() => { routeToReviewFormalDefense() }}>Revisar defensa</Button>)}
            </div>

            {/* FORMAL DEFENSE */}
            <div className={`w-full h-16 flex flex-col items-center justify-center mt-4 mb-4 ${colorsMap.get(formalDefenseItem.taskStatesIdTaskState?.idTaskState!)![0]}`}>
                <p className="font-bold">{colorsMap.get(formalDefenseItem.taskStatesIdTaskState?.idTaskState!)![1]}</p>
                <p className="font-bold text-xs">{colorsMap.get(formalDefenseItem.taskStatesIdTaskState?.idTaskState!)![2]}</p>
            </div>




            <div className="flex justify-center items-center">
                <form className="px-10 max-w-lg w-full rounded-xl border border-gray-200 shadow-md dark:bg-black-50  dark:border-gray-700">
                    <div className="space-y-4">
                        <p><b>Fecha programada: {formalDefenseItem.defenseDate}</b></p>
                        <Divider />
                    </div>
                    <Input
                        className="p-4"
                        fullWidth
                        type="text"
                        variant="bordered"
                        label="Lugar de la defensa"
                        placeholder="Ingrese aula donde será la defensa"
                        labelPlacement="outside"
                        value={formalDefenseItem.place}
                        isDisabled
                    />

                    <Textarea
                        className="p-4"
                        fullWidth
                        type="text"
                        variant="bordered"
                        label="Comentarios"
                        placeholder="Ingrese comentarios para la pre defensa"
                        labelPlacement="outside"
                        value={formalDefenseItem.feedback}
                        isDisabled
                    />
                    <Divider />
                    {formalDefenseItem.plpInvolved && (
                        <div className="flex items-center">
                            <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                                Panel evaluador:
                            </h1>
                            <div className="flex justify-center overflow-x-auto space-x-4">
                                {formalDefenseItem.plpInvolved.split(";").map((item, index) => (
                                    <Chip
                                        key={index}
                                        className={`${colorsMap.get(Math.floor(Math.random() * 5) + 2)![0]}`}
                                    >
                                        {item}
                                    </Chip>
                                ))}
                            </div>
                        </div>
                    )}
                    <Divider />

                    <h1 className="text-lg md:text-xl font-bold bg-clip-text text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                        Documento estudiante:
                    </h1>
                    <div className="flex justify-center overflow-x-auto space-x-4">
                        {formalDefenseItem.url == "" ? "No existe documento final" : <Link href={formalDefenseItem.url} target="_blank">Documento final</Link>}
                    </div>
                </form >

                
            </div >
        </>
    )
}

export default FormalDefenseitem;