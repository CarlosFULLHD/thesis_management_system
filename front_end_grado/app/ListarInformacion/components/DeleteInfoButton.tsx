import { BASE_URL } from "@/config/globals";
import { FaTrash } from 'react-icons/fa';
import { Button } from "@nextui-org/react";

import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import { usePublicInfo } from "../providers/PublicInfoProvider";

// const deleteResource = async (
//   id: number,
//   baseUrl: string = `${BASE_URL}publicInformation?idPublicInfo=${id}`
// ): Promise<void> => {
//   try {
//     const response = await fetch(baseUrl, {
//       method: "DELETE",
//     });

//     if (!response.ok) {
//       throw new Error(
//         "Failed to delete the resource. Status: " + response.status
//       );
//     }
//     console.log("HOLA")
//     console.log(response.json());
    
//   } catch (error) {
//     console.error("Error during deletion:", error);
//   }
// };








const DeleteInfoButton = (props: number) => {
  
  const { publicInfoMap, removePublicInfo } = usePublicInfo();

  var id = props;
// The delete function using Axios and TypeScript annotations
const deleteResource = async ( id : number ): Promise<void> => {
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
      onClick={() => deleteResource(id)}
      color="danger"
      variant="ghost"
      startContent={<FaTrash />}
    >
      Borrar
    </Button>
  );
};

export default DeleteInfoButton;
