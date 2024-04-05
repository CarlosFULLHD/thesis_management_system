import { BASE_URL } from "@/config/globals";
import { FaTrash , FaCheck, FaTimes} from 'react-icons/fa';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import axios from "axios";
import { usePublicInfo} from "../providers/PublicInfoProvider";


// Define an interface for the component's props
interface UpdateInfoButtonProps {
  idPublicInfo: number;
}


const DeleteInfoButton = ({ idPublicInfo }: UpdateInfoButtonProps) => {

  const { publicInfoMap, removePublicInfo } = usePublicInfo();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const publicInfoEntry = publicInfoMap.get(idPublicInfo)!;

  var id = idPublicInfo;
  // The delete function using Axios and TypeScript annotations

  const deleteResource = async (id: number): Promise<void> => {
    // URL of the endpoint
    const url: string = `${BASE_URL}publicInformation?idPublicInfo=${id}`;
    try {
      // Delete method with axios (wait)
      const response = await axios.delete(url);
      // Check for successful response status (e.g., 200 OK, 204 No Content)
      if (response.status >= 200 && response.status < 300) {
        removePublicInfo(id)
        onClose(); 
      }
    } catch (error: any) {
      // Handle errors (Axios errors have a 'response' property)
      console.error('Error al eliminar recurso:', error.response?.data || error.message);
      onClose(); 
    }
  };


  return (
    <>
      <div>
        <Button
          key="blur"
          onPress={onOpen}
          // onPress={() => deleteResource(id)}
          color="danger"
          variant="ghost"
          startContent={<FaTrash />}
        >
          Borrar
        </Button>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">¿Seguro que desea borrar esta información?</ModalHeader>
              <ModalBody>
                <Card className="max-w-[400px]">
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md"><b>Título: </b>{publicInfoEntry.title}</p>
                      <p className="text-small text-default-500"><b>Fecha Creado: </b>  {publicInfoEntry.createdAt.toString()}</p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>{publicInfoEntry.information}</p>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <p><b>Creado por: </b> {`${publicInfoEntry.roleHasPersonIdRolePer.personIdPerson.name} ${publicInfoEntry.roleHasPersonIdRolePer.personIdPerson.fatherLastName} ${publicInfoEntry.roleHasPersonIdRolePer.personIdPerson.motherLastName}`}</p>
                  </CardFooter>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                  NO
                </Button>
                <Button color="success"  variant="ghost" onPress={() => deleteResource(id)} startContent={<FaCheck />}>
                  SI
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>

  );
};

export default DeleteInfoButton;
