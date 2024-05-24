import { Button } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
interface ModifyComponentProps {
    callBack: (newFlag: number) => void,
}

const ReOrderComponent = ({ callBack }: ModifyComponentProps) => {
    return (
        <div className="grid grid-rows-3 h-screen">

            <div className="flex justify-end items-start">
                <Button isIconOnly color="primary" onClick={() => callBack(0)}><ArrowLeft /></Button>
            </div>

            <div className="h-10">
                MODIFICAR TAREA
            </div>

            <div className="flex justify-center items-center bg-gray-200 h-1/2">
                Middle Content
            </div>
        </div>
    )
}

export default ReOrderComponent;