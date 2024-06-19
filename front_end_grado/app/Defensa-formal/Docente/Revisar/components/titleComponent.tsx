import {
    UserRound,
    FileSpreadsheetIcon
} from "lucide-react";
interface TitleComponentProps {
    studentName: string,
    gradeTitle: string,
}

const TitleComponent = ({ studentName, gradeTitle }: TitleComponentProps) => {
    return (
        <>
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 px-4 py-2">
                Revisión defensa formal
            </h1>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                <div className="px-6 py-8">
                    <div className="font-bold text-xl mb-4 text-gray-800">Estudiante</div>
                    <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                            <UserRound />
                        </div>
                        <span className="text-gray-700 font-bold">Estudiante:</span>
                        <span className="text-gray-900 ml-2">{studentName}</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                            <FileSpreadsheetIcon />
                        </div>
                        <span className="text-gray-700 font-bold">Título proyecto:</span>
                        <span className="text-gray-900 ml-2">{gradeTitle == "" ? "SIN ASIGNAR" : gradeTitle}</span>
                    </div>
                </div>
            </div>
        </>
    );

}

export default TitleComponent;