import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMilestoneStudent } from "../../providers/MilestoneStudentProvider";
import { UserDetail } from "@/app/providers/SessionProvider";

interface InitialFormProps {
    userDetails: UserDetail
}

const InitialForm = ({ userDetails }: InitialFormProps) => {


    // Importing data and method from provider
    const { milestoneItem, loadMilestoneItem } = useMilestoneStudent();

    // State for url input field
    const [url, setUrl] = useState<string>("")

    // google drive validator url
    const isGoogleDriveUrl = (url: string): boolean => {
        const driveRegex = /^https?:\/\/(www\.)?(drive|docs)\.google\.com\/.*$/;
        return driveRegex.test(url)
    }

    // Save form
    const saveForm = () => {
        if (isGoogleDriveUrl(url)) {
            toast.success("Formulario guardado")
        } else {
            toast.error("URL no pertenece a google drive")
        }
    }

    // Send form
    const sendForm = () => {
        if (isGoogleDriveUrl(url)) {
            toast.success("URL DRIVE")
        } else {
            toast.error("URL no pertenece a google drive")
        }
    }



    return (
        <div className="mt-10">
            <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                Carta propuesta de trabajo - {userDetails.name}
            </h1>

            <div className="p-2">
                <h1 className="text-lg font-semibold">Tu respuesta</h1>
            </div>

            <div className="p-2">
                <p className="text-base">Agregue una dirección URL del pdf de la carta de presentación, utilice su cuenta institucional de google.</p>
                <i><p>Utiliza el siguiente <b><a href="https://drive.google.com/file/d/1KFDUyNch5uzvNkDF8NAu3CZXuHUQ4JZ6/view?usp=sharing" target="_blank">documento</a></b> como ejemplo</p></i>
            </div>

            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    maxWidth: "700px",
                    margin: "auto",
                }}>
                <div>
                    <Input
                        fullWidth
                        type="url"
                        variant="bordered"
                        label="URL - google drive"
                        placeholder="Ingrese url"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        onClear={() => setUrl("")}
                        isClearable
                        required
                    />
                </div>
                <div className="flex justify-center space-x-4">
                    <Button
                        color="primary"
                        variant="ghost"
                        onClick={() => { saveForm() }}
                    >
                        Guardar pero no enviar
                    </Button>
                    <Button
                        color="primary"
                        variant="ghost"
                        onClick={() => { sendForm() }}
                    >
                        Guardar y enviar
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default InitialForm;