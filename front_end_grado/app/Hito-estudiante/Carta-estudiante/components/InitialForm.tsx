import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMilestoneStudent } from "../../providers/MilestoneStudentProvider";
import { UserDetail } from "@/app/providers/SessionProvider";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider, Spinner } from "@nextui-org/react";
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

interface InitialFormProps {
    userDetails: UserDetail
}

const InitialForm = ({ userDetails }: InitialFormProps) => {


    // Importing data and method from provider
    const { milestoneItem, saveOrSendMilestoneItem } = useMilestoneStudent();
    // State for modal
    const { isOpen, onOpen, onClose } = useDisclosure();


    // State for url input field
    const [url, setUrl] = useState<string>("")

    // google drive validator url
    const isGoogleDriveUrl = (url: string): boolean => {
        const driveRegex = /^https?:\/\/(www\.)?(drive|docs)\.google\.com\/.*$/;
        return driveRegex.test(url)
    }

    // Save form
    const saveForm = async () => {
        if (isGoogleDriveUrl(url)) {
            await saveOrSendMilestoneItem(milestoneItem.idMilestone, url,false)
            toast.success("¡Carta de postulación guardada!")
        } else {
            toast.error("URL no pertenece a google drive")
        }
    }

    // Send form check
    const sendForm = () => {
        if (isGoogleDriveUrl(url)) {
            onOpen();
        } else {
            toast.error("¡URL no pertenece a google drive!")
        }
    }

    const sendFormAction = async () => {
        await saveOrSendMilestoneItem(milestoneItem.idMilestone, url,true)
        toast.success("Carta de postulación enviada, espera una respuesta!")
        onClose();
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
            <Modal backdrop="blur" isOpen={isOpen} size="xs">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">¿Enviar carta?</ModalHeader>
                    <Divider />
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <p>No podras editar la url luego de enviar la carta</p>
                        </div>
                    </ModalBody>
                    <Divider />
                    <ModalFooter>
                        <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                            NO
                        </Button>
                        <Button color="success" variant="ghost" onClick={async () => { await sendFormAction()}} startContent={<FaCheck />}>
                            SI
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default InitialForm;