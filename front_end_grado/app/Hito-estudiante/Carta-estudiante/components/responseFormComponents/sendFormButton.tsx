import { toast } from "react-toastify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Divider,
} from "@nextui-org/react";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useMilestoneStudent } from "@/app/Hito-estudiante/providers/MilestoneStudentProvider";

const SendFormButton = () => {
  // Importing data and method from provider
  const { milestoneItem, saveOrSendMilestoneItem } = useMilestoneStudent();
  // State for modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // State for url input field
  const [url, setUrl] = useState<string>(milestoneItem.url);
  // google drive validator url
  const isGoogleDriveUrl = (url: string): boolean => {
    const driveRegex = /^https?:\/\/(www\.)?(drive|docs)\.google\.com\/.*$/;
    return driveRegex.test(url);
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
  return (
    <>
      <Button
        color="success"
        variant="ghost"
        onClick={() => {
          sendForm();
        }}
      >
        Enviar
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} size="xs">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            ¿Enviar carta?
          </ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-4">
              <p>No podras editar la URL luego de enviar la carta</p>
            </div>
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
              onClick={async () => {
                await sendFormAction();
              }}
              startContent={<FaCheck />}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendFormButton;
