import { UserDetail } from "@/app/providers/SessionProvider";
import {
    Card, CardFooter, CardHeader, Image,
    Divider,
    CardBody,
    Button
} from "@nextui-org/react";
import { useMilestoneStudent } from "../../providers/MilestoneStudentProvider";
import { useState } from "react";

const NewsForm = () => {
    // Importing data and method from provider
    const { milestoneItem, saveOrSendMilestoneItem } = useMilestoneStudent();
    return (
        <>
            <div className="flex justify-center mb-10">
                <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                    Esperando respuesta
                </h1>
            </div>
            <div className="flex justify-center">
                <Card className="bg-custom-purple" >
                    <CardHeader className='pb-0 pt-2 px-4 flex-col items-center'>
                        <p className="text-tiny  italic">
                            Deben evaluar tu postulación
                        </p>
                        <h4 className="font-bold text-large">
                            EN ESPERA DE REVISIÓN
                        </h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="/img/logo-sis.png"
                            width={270}
                        />
                        <a href={milestoneItem.url} target="_blank">Tu carta</a>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default NewsForm;