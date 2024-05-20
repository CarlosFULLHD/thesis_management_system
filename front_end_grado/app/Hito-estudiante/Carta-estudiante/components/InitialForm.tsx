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
import SaveFormButton from "./responseFormComponents/saveFormButton";
import SendFormButton from "./responseFormComponents/sendFormButton";

interface InitialFormProps {
  userDetails: UserDetail;
}

const InitialForm = ({
  userDetails,
}: InitialFormProps): ReactElement | null => {
  // Importing data and method from provider
  const { milestoneItem, saveOrSendMilestoneItem } = useMilestoneStudent();
  // State for modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State for url input field
  const [url, setUrl] = useState<string>("");

  // google drive validator url
  const isGoogleDriveUrl = (url: string): boolean => {
    const driveRegex = /^https?:\/\/(www\.)?(drive|docs)\.google\.com\/.*$/;
    return driveRegex.test(url);
  };

  // Save form
  const saveForm = async () => {
    if (isGoogleDriveUrl(url)) {
      await saveOrSendMilestoneItem(milestoneItem.idMilestone, url, false);
      toast.success("¡Carta de postulación guardada!");
    } else {
      toast.error("URL no pertenece a google drive");
    }
  };

  // Send form check
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
      <div className="mt-10">
        <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Carta propuesta de trabajo - {userDetails.name}
        </h1>

        <div className="p-2">
          <h1 className="text-lg font-semibold">Tu respuesta</h1>
        </div>

        <div className="p-2">
          <p className="text-base">
            Agregue una dirección URL del pdf de la carta de presentación,
            utilice su cuenta institucional de google.
          </p>
          <i>
            <p>
              Utiliza el siguiente{" "}
              <b>
                <Link
                  href="https://drive.google.com/file/d/1KFDUyNch5uzvNkDF8NAu3CZXuHUQ4JZ6/view?usp=sharing"
                  target="_blank"
                >
                  documento
                </Link>
              </b>{" "}
              como ejemplo
            </p>
          </i>
        </div>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "700px",
            margin: "auto",
          }}
        >
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
              onClick={() => {
                saveForm();
              }}
            >
              Guardar pero no enviar
            </Button>
            <Button
              color="primary"
              variant="ghost"
              onClick={() => {
                sendForm();
              }}
            >
              Guardar y enviar
            </Button>
          </div>
        </form>
        <Modal backdrop="blur" isOpen={isOpen} size="xs">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              ¿Enviar carta?
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div className="flex flex-col gap-4">
                <p>No podras editar la url luego de enviar la carta</p>
              </div>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button
                color="danger"
                variant="ghost"
                onPress={onClose}
                startContent={<FaTimes />}
              >
                NO
              </Button>
              <Button
                color="success"
                variant="ghost"
                onClick={async () => {
                  await sendFormAction();
                }}
                startContent={<FaCheck />}
              >
                SI
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  } else if (milestoneItem.isSend == 0) {
    return (
      <>
        {/* Title division */}
        <div className="flex justify-center mb-10">
          <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Estado propuesta de trabajo
          </h1>
        </div>
        <div className="flex justify-center">
          <Card className="">
            <CardHeader
              className={`pb-0 pt-2 px-4 flex-col items-center bg-custom-blue`}
            >
              <p className="text-tiny  italic">Puedes modificar tu carta</p>
              <h4 className="font-bold text-large">Debes enviar tu carta</h4>
            </CardHeader>
            <Divider />
            <CardBody className="overflow-visible py-2">
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
                    Carta de ejemplo
                  </Link>
                </Chip>
              </div>
              <div className="flex justify-center mt-4">
                <Chip className="bg-custom-blue">
                  <Link href={milestoneItem.url} target="_blank">
                    <FaEnvelope />
                    Tu carta
                    <FaEnvelope />
                  </Link>
                </Chip>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center">
              <div className="space-x-4">
                <SaveFormButton />
                <SendFormButton />
              </div>
            </CardFooter>
          </Card>
        </div>
      </>
    );
  }
  return null;
};

export default InitialForm;
