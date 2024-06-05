import { CircularProgress } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { emptyAcademicPeriodHasGradeProfile, useAcademicPeriodHasGradeProfile } from "../../providers/academicPeriodHasGradeProfileProvider";
import TitleComponent from "./titleComponent";
import { emptyFormalDefense, useFormalDefense } from "../../providers/formalDefenseProvider";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
interface FrameComponentProps {
    idGradePro: number;


}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {

    // Provider and methods
    const { academicPeriodHasGradeProfileItem, loadAcademicPeriodHasGradeprofileItem } = useAcademicPeriodHasGradeProfile();
    const { formalDefenseItem, fetchFormalDefenseItem, reviewFormalDefenseItem } = useFormalDefense();
    const [name, setName] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [grade, setGrade] = useState<string>("");
    const [feedBack, setFeedBack] = useState<string>("");

    let flag: boolean = false;


    const { isLoading, isError } = useQuery({
        queryKey: ["academicPeriodHasGradeProfile"],
        queryFn: async () => {
            flag = await loadAcademicPeriodHasGradeprofileItem(idGradePro);
            flag = await fetchFormalDefenseItem(idGradePro);
            setName(`${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.name} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName} ${academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.roleHasPerson.usersIdUsers.personIdPerson.motherLastName}`)
            setTitle(academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.title == undefined ? "SIN ASIGNAR" : academicPeriodHasGradeProfileItem.gradeProfileIdGradePro.title);
            return academicPeriodHasGradeProfileItem;
        }
    })

    // Method to review the formal defense 
    const reviewFormalDefense = async () => {
        
    }


    // Fetching state
    if (isLoading) {
        return <CircularProgress aria-label="Cargando..." />;
    }
    // Error state
    if (isError) {
        return <div>Oops!</div>;
    }
    // Success state
    if (academicPeriodHasGradeProfileItem != emptyAcademicPeriodHasGradeProfile) {

        return (
            <div>
                <TitleComponent
                    studentName={name}
                    gradeTitle={title}
                />
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 text-center mb-4">
                    Acta de la defensa formal
                </h1>
                <div className="p-2">
                    <h2 className="text-lg font-semibold">Tu respuesta</h2>
                </div>
                <form className="flex flex-col gap-4 max-w-md mx-auto">
                    <Input
                        fullWidth
                        type="url"
                        variant="bordered"
                        label="URL del acta firmada y aprobada"
                        placeholder="Ingrese la URL"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        onClear={() => setUrl("")}
                        isClearable
                        required
                    />
                    <Input
                        fullWidth
                        type="url"
                        variant="bordered"
                        label="Nota"
                        placeholder="Ingrese nota de la defensa"
                        value={grade}
                        onChange={(event) => setUrl(event.target.value)}
                        onClear={() => setGrade("")}
                        isClearable
                        required
                    />
                    <Textarea
                        className="p-4"
                        fullWidth
                        type="text"
                        variant="bordered"
                        label="Comentarios"
                        placeholder="Ingrese comentarios "
                        labelPlacement="outside"
                        value={feedBack}
                        onChange={(event) => setFeedBack(event.target.value)}
                        onClear={() => setFeedBack("")}
                        required
                    />
                    <div className="flex justify-center">
                        <Button color="danger" variant="solid" onClick={{}}>
                            Cancelar
                        </Button>
                        <Button color="success" variant="ghost" onClick={{}}>
                            Calificar
                        </Button>

                    </div>
                </form>


            </div>
        )
    } else {
        return (
            <>Problemas al conseguir perfil de grado</>
        );
    }





}

export default FrameComponent;
