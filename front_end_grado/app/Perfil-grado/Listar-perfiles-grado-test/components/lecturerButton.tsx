import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import {
  CircularProgress,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { UserRoundCog } from "lucide-react";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { useLecturerCollection } from "../providers/lecturerCollectionProvider";
import { SetStateAction, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGradeProfileLecturerCollection } from "../providers/gradeProfileLecturerCollectionProvider";
import { toast } from "react-toastify";

interface LecturerButtonProps {
  isDisabled: boolean;
  idGradePro: number;
}

const LecturerButton = ({ isDisabled, idGradePro }: LecturerButtonProps) => {
  // State for modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // Importing data and methods from provider
  const { lecturerList, loadLecturerList } = useLecturerCollection();
  // Importing data and methods from provider
  const { assignTutorOrLecturerToGradeProfile } =
    useGradeProfileLecturerCollection();
  // State for the select component
  // State for the select component
  const [value, setValue] = useState("");
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    const assignedStudents = getAssignedStudentsById(parseInt(e.target.value));
    if (assignedStudents! > 3) {
      toast.warning(
        `Docente tiene actualmente ${assignedStudents} estudiantes asignados`
      );
    }
  };
  // Method to get number of asigned studens of docentes list
  function getAssignedStudentsById(idRolePer: number): number | undefined {
    const lecturer = lecturerList.find(
      (lecturer) => lecturer.idRolePer === idRolePer
    );
    return lecturer ? lecturer.assignedStudents : undefined;
  }
  // Method to assign new lecturer
  const assignLecturer = async () => {
    var flag: boolean = await assignTutorOrLecturerToGradeProfile(
      parseInt(value),
      idGradePro,
      true
    );
    if (!flag) {
      toast.error("Error con la conexión");
      onClose();
      return;
    }
    toast.success("Relator asignado correctamente");
    onClose();
  };
  const { isLoading, isError } = useQuery({
    queryKey: ["tutorsGet"],
    queryFn: async () => {
      await loadLecturerList("lecturer");
      return lecturerList;
    },
  });
  // Fetching state
  if (isLoading) {
    return <CircularProgress aria-label="Cargando..." />;
  }
  // Error state
  if (isError) {
    return <div>Oops!</div>;
  }
  // Success state

  return (
    <>
      <div className="col-span-1">
        <Button
          className="w-16"
          isIconOnly
          variant="faded"
          isDisabled={isDisabled}
          onPress={onOpen}
        >
          <UserRoundCog />
        </Button>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-5">
                Asignar nuevo relator
              </ModalHeader>
              <Divider />
              <ModalBody>
                <Select
                  items={lecturerList}
                  variant="bordered"
                  label="Relatores"
                  className="max-w-sx"
                  defaultSelectedKeys={["1"]}
                  selectedKeys={[value]}
                  onChange={handleSelectionChange}
                >
                  {(gradList) => (
                    <SelectItem key={gradList.idRolePer}>
                      {gradList.name}
                    </SelectItem>
                  )}
                </Select>
              </ModalBody>
              <Divider />
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
                  startContent={<FaPlusCircle />}
                  onClick={() => {
                    assignLecturer();
                  }}
                >
                  Asignar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LecturerButton;
