import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { FaEdit } from "react-icons/fa"; // Importing the edit icon
const UpdateInfoButton = (props: number) => {
  return (
    <Button
      href="/form"
      as={Link}
      color="primary"
      variant="ghost"
      startContent={<FaEdit />}
    >
      Modificar
    </Button>
  );
};

export default UpdateInfoButton;
