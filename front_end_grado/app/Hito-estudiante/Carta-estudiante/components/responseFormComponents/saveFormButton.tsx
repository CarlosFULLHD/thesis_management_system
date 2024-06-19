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

const SaveFormButton = () => {
  // State for modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // Importing data and method from provider
  const { milestoneItem, saveOrSendMilestoneItem } = useMilestoneStudent();
  // State for url input field
  const [url, setUrl] = useState<string>(milestoneItem.url);
  // google drive validator url
  const isGoogleDriveUrl = (url: string): boolean => {
    const driveRegex = /^https?:\/\/(www\.)?(drive|docs)\.google\.com\/.*$/;
    return driveRegex.test(url);
  };

  // Save form
  const saveForm = async () => {
    if (isGoogleDriveUrl(url)) {
      if (url == milestoneItem.url) {
        toast.error("La URL es la misma que antes");
        return;
      }
      await saveOrSendMilestoneItem(milestoneItem.idMilestone, url, false);
      toast.success("¡Carta de postulación modificada!");
    } else {
      toast.error("URL no pertenece a google drive");
    }
    setUrl(milestoneItem.url);
    onClose();
  };
  return (
    <>
      <Button
        color="warning"
        variant="ghost"
        onClick={() => {
          onOpen();
        }}
      >
        Modificar
      </Button>
      <Modal placement="center" backdrop="blur" isOpen={isOpen} size="xs">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Modificar URL de carta
          </ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                fullWidth
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
          </ModalBody>

          <ModalFooter>
            <Button
              color="danger"
              variant="ghost"
              onPress={() => {
                onClose();
                setUrl(milestoneItem.url);
              }}
              startContent={<FaTimes />}
            >
              Cancelar
            </Button>
            <Button
              color="success"
              variant="ghost"
              onClick={async () => {
                saveForm();
              }}
              startContent={<FaCheck />}
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SaveFormButton;
