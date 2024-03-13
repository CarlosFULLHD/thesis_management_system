
import { BASE_URL } from "@/config/globals";
import { useQuery } from "@tanstack/react-query"; // React query useQuery
import { FaTrash } from 'react-icons/fa';
import { Button } from "@nextui-org/react";



const deleteProps = (id: number) => {

    useQuery({
        queryKey: ["infoTable"],
        queryFn: () =>
            fetch(`${BASE_URL}publicInformation?idPublicInfo=${id}`).then((res) =>
                res.json()
            ),
    });
}







const DeleteInfoButton = (props: number) => {

    var id = props;

    const deleteResource = async (id: number, baseUrl: string = `${BASE_URL}publicInformation?idPublicInfo=${id}`): Promise<void> => {
        try {
          const response = await fetch(baseUrl, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete the resource. Status: ' + response.status);
          }
          console.log('Resource deleted successfully');
        } catch (error) {
          console.error('Error during deletion:', error);
        }
      };


    


    return (
        <Button onClick={() => deleteResource(id)} color="danger" variant="ghost" startContent={<FaTrash />}>
            Borrar
        </Button>
    )
}

export default DeleteInfoButton;
