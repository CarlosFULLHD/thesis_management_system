import React, { ReactElement, useState } from "react";
import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Divider,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useMilestoneStudent } from "../../providers/MilestoneStudentProvider";
import { UserDetail } from "@/app/providers/SessionProvider";
import { useDisclosure } from "@nextui-org/modal";
import { FaCheck, FaTimes, FaEnvelope } from "react-icons/fa";
import SendFormButton from "./responseFormComponents/sendFormButton";
import SaveFormButton from "./responseFormComponents/saveFormButton";

interface InitialFormProps {
  userDetails: UserDetail;
}

const InitialForm = ({
  userDetails,
}: InitialFormProps): ReactElement | null => {
  const { milestoneItem, saveOrSendMilestoneItem } = useMilestoneStudent();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState<string>("");

  const isGoogleDriveUrl = (url: string): boolean => {
    const driveRegex = /^https?:\/\/(www\.)?(drive|docs)\.google\.com\/.*$/;
    return driveRegex.test(url);
  };

  const saveForm = async () => {
    if (isGoogleDriveUrl(url)) {
      await saveOrSendMilestoneItem(milestoneItem.idMilestone, url, false);
      toast.success("¡Carta de postulación guardada!");
    } else {
      toast.error("URL no pertenece a google drive");
    }
  };

  const sendForm = () => {
    if (isGoogleDriveUrl(url)) {
      onOpen();
    } else {
      toast.error("¡URL no pertenece a google drive!");
    }
  };

  const sendFormAction = async () => {
    await saveOrSendMilestoneItem(milestoneItem.idMilestone, url, true);
    toast.success("Carta de postulación enviada, espera una respuesta!");
    onClose();
  };

  if (milestoneItem.isSend == -1) {
    return (
      <div className="mt-10 px-4 sm:px-6 lg:px-8 lg:w-[1024px] lg:mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 text-center mb-4">
          Carta propuesta de trabajo
        </h1>

        <div className="p-2">
          <h2 className="text-lg font-semibold">Tu respuesta</h2>
        </div>

        <div className="p-2">
          <p className="text-base mb-2">
            Agrega una dirección URL del PDF de la carta de presentación,
            utilizando tu cuenta institucional de Google.
          </p>
          <p className="italic text-sm">
            Utiliza el siguiente{" "}
            <b>
              <Link
                href="https://drive.google.com/file/d/1KFDUyNch5uzvNkDF8NAu3CZXuHUQ4JZ6/view?usp=sharing"
                target="_blank"
              >
                documento de ejemplo
              </Link>
            </b>
          </p>
        </div>

        <form className="flex flex-col gap-4 max-w-md mx-auto">
          <Input
            fullWidth
            type="url"
            variant="bordered"
            label="URL de Google Drive"
            placeholder="Ingrese la URL"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onClear={() => setUrl("")}
            isClearable
            required
          />
          <div className="flex justify-between">
            <Button color="primary" variant="ghost" onClick={saveForm}>
              Guardar pero no enviar
            </Button>
            <Button color="primary" variant="solid" onClick={sendForm}>
              Guardar y enviar
            </Button>
          </div>
        </form>

        <Modal backdrop="blur" isOpen={isOpen} size="xs">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              ¿Enviar carta?
            </ModalHeader>

            <ModalBody>
              <p className="text-center">
                No podrás editar la URL luego de enviar la carta.
              </p>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="ghost"
                onPress={onClose}
                startContent={<FaTimes />}
              >
                Cancelar
              </Button>
              <Button
                color="success"
                variant="ghost"
                onClick={sendFormAction}
                startContent={<FaCheck />}
              >
                Enviar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  } else if (milestoneItem.isSend == 0) {
    return (
      <div className="flex flex-col items-center mb-10 px-4 sm:px-6 lg:px-8 lg:w-[1024px] lg:mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 text-center mb-4">
          Estado de propuesta de trabajo
        </h1>
        <Card className="w-full max-w-md">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center bg-blue-light dark:bg-blue-dark text-white">
            <p className="text-sm italic">Puedes modificar tu carta</p>
            <h4 className="font-bold text-lg">Debes enviar tu carta</h4>
          </CardHeader>
          <Divider />
          <CardBody className="py-4 items-center">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="/img/logo-sis.png"
              width={270}
            />
            <div className="flex justify-center mt-4">
              <Chip color="default">
                <Link
                  href="https://drive.google.com/file/d/1KFDUyNch5uzvNkDF8NAu3CZXuHUQ4JZ6/view?usp=sharing"
                  target="_blank"
                >
                  Ver carta de ejemplo
                </Link>
              </Chip>
            </div>
            <div className="flex justify-center mt-4">
              <Chip className="bg-blue-light text-off-white dark:text-blue-light">
                <Link href={milestoneItem.url} target="_blank">
                  Ver mi carta
                  <FaEnvelope className="ml-2" />
                </Link>
              </Chip>
            </div>
          </CardBody>

          <CardFooter className="flex justify-center space-x-4">
            <SaveFormButton />
            <SendFormButton />
          </CardFooter>
        </Card>
      </div>
    );
  }
  return null;
};

export default InitialForm;
