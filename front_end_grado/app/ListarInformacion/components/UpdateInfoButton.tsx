import { Button } from '@nextui-org/button';
import { FaEdit } from 'react-icons/fa'; // Importing the edit icon
const UpdateInfoButton = (props : number) => {
    return (
        <Button color="primary" variant="ghost" startContent={<FaEdit />}>
            Modificar
        </Button>
    )
}

export default UpdateInfoButton;
