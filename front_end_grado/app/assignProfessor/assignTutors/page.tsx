import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import StudentsTable from "./Components/StudentsTable";
import { StudentsProfessorsProvider } from "../Providers/StudentsProfessorsProvider";
import TutorProvider from "../Providers/TutorProvider";

export default function assignTuttors() {
    return (
        <ReactQueryClientProvider>
            <StudentsProfessorsProvider>
                <TutorProvider>
                    <div className="">
                        <h1 className="ext-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
                            Asignar tutores
                        </h1>
                        <StudentsTable />
                    </div>
                </TutorProvider>
            </StudentsProfessorsProvider>
        </ReactQueryClientProvider>
    );
}