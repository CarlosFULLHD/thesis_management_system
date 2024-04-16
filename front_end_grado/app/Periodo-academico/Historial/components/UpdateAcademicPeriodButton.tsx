import { FaEdit } from 'react-icons/fa';
import { Button, Tooltip } from "@nextui-org/react";
const UpdateAcademicPeriodButton = () => {
    return (
        <Tooltip color="primary" content="Modificar periodo">
            <Button
                key="blur"
                color="primary"
                variant="ghost"
            >
                <FaEdit />
            </Button>
        </Tooltip>
    )
}

export default UpdateAcademicPeriodButton;