import { Button } from "@nextui-org/button";
import { ArrowLeft } from "lucide-react";
import DataComponents from "../components/dataComponent";
interface HistoryComponentProps {
    callBack:(newFlag: number, userId: number) => void,
    userId: number,
}

const HistoryComponent = ({ callBack, userId}: HistoryComponentProps) => {
    return (
        <div className="grid grid-rows-3 h-screen">

            <div className="flex justify-end items-start">
                <Button isIconOnly color="primary" onClick={() => callBack(0, userId)}><ArrowLeft /></Button>
            </div>

            <div className="h-10">
                HISTORIAL
            </div>

            <div className="h-full w-full flex flex-col items-center justify-center">
                <DataComponents userId={userId} />
            </div>
        </div>
    );

}

export default HistoryComponent;