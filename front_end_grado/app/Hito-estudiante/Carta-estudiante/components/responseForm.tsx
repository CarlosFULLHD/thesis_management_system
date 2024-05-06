import { UserDetail } from "@/app/providers/SessionProvider";
import {
    Card, CardFooter, CardHeader, Image,
    Divider,
    CardBody,
    Button
} from "@nextui-org/react";
import { useMilestoneStudent } from "../../providers/MilestoneStudentProvider";
import { useState } from "react";
import SaveFormButton from "./responseFormComponents/saveFormButton";
import SendFormButton from "./responseFormComponents/sendFormButton";
interface InitialFormProps {
    userDetails: UserDetail
}
const ResponseForm = ({ userDetails }: InitialFormProps) => {

    // Importing data and method from provider
    const { milestoneItem, saveOrSendMilestoneItem } = useMilestoneStudent();

    const [formState, setFormState] = useState<number>(
        milestoneItem.isSend == 0 && milestoneItem.isStudentOrCoordinator == 1
            ? 1 // Letter has been saved, needs to be send
            : milestoneItem.isSend == 1 && milestoneItem.isStudentOrCoordinator == 2
                ? 2 // Letter has been send, and is waiting for an approbal for the concil
                : 3 // HOLD IT
    )
    return (
        <>
            <div className="flex justify-center mb-10">
                <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                    Estado propuesta de trabajo
                </h1>

            </div>
            <div className="flex justify-center">
                <Card className="" >
                    <CardHeader className={`pb-0 pt-2 px-4 flex-col items-center ${formState == 1 ? 'bg-custom-blue'
                        : formState == 2
                        ? 'bg-custom-purble'
                        : 'bg-custom-yellow'

                    }`}>
                        <p className="text-tiny  italic">
                            {formState == 1
                                ? "Envie la carta para ser evaluado"
                                : formState == 2
                                    ? "En espera de respuesta"
                                    : "HOLD IT"
                            }
                        </p>
                        <h4 className="font-bold text-large">
                            {formState == 1
                                ? "CARTA GUARDADA"
                                : formState == 2
                                    ? "EN ESPERA DE RESPUESTA"
                                    : "OBSERVADO"
                            }
                        </h4>
                    </CardHeader>
                    <Divider />
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="/img/logo-sis.png"
                            width={270}
                        />
                        <p><b><a href="https://drive.google.com/file/d/1KFDUyNch5uzvNkDF8NAu3CZXuHUQ4JZ6/view?usp=sharing" target="_blank">ejemplo</a></b></p>
                        <a href={milestoneItem.url} target="_blank">Tu carta</a>
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex justify-center">
                        {formState == 1
                            ? <div className="space-x-4">
                                <SaveFormButton/>
                                <SendFormButton/>
                            </div>
                            : formState == 2
                                ? "EN ESPERA DE RESPUESTA"
                                : "OBSERVADO"}
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

export default ResponseForm;
