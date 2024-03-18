import { BASE_URL } from "@/config/globals";
import { FaTrash } from 'react-icons/fa';
import { Button } from "@nextui-org/react";
import axios from "axios";
import { usePublicInfo } from "../providers/PublicInfoProvider";


// Define an interface for the component's props
interface UpdateInfoButtonProps {
  idPublicInfo: number;
}


const DeleteInfoButton = ({ idPublicInfo }: UpdateInfoButtonProps) => {

  const { removePublicInfo } = usePublicInfo();

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
      } else {
        throw new Error(`Failed to delete the resource. Status: ${response.status}`);
      }
    } catch (error: any) {
      // Handle errors (Axios errors have a 'response' property)
      console.error('Error during deletion:', error.response?.data || error.message);
    }
  };


  return (
    <Button
      onPress={() => deleteResource(id)}
      color="danger"
      variant="ghost"
      startContent={<FaTrash />}
    >
      Borrar
    </Button>
  );
};

export default DeleteInfoButton;
