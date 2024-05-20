import { Button } from "@nextui-org/button";
import { ArrowLeft } from "lucide-react";
import DataComponents from "../components/dataComponent";
interface HistoryComponentProps {
    callBack:(newFlag: number, userId: number) => void,
    userId: number,
}

const HistoryComponent = ({ callBack, userId}: HistoryComponentProps) => {
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 px-4 py-2">
                    Historial de tareas
                </h1>
                <Button isIconOnly color="primary" onClick={() => callBack(0, userId)}><ArrowLeft /></Button>
            </div>
            <div className="h-full w-full flex flex-col items-center justify-center">
                <DataComponents userId={userId} />
            </div>
        </>
    );

}

export default HistoryComponent;