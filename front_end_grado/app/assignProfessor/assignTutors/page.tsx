import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import StudentsTable from "./Components/StudentsTable";
import StudentProfessorsProjectProvider from "../Providers/StudentsProfessorsProjectProvider";
import TutorProvider from "../Providers/TutorProvider";

export default function assignTuttors() {
    return (
        <ReactQueryClientProvider>
            <StudentProfessorsProjectProvider>
                <TutorProvider>
                    <h1>Asignar tutores</h1>
                    <StudentsTable />
                </TutorProvider>
            </StudentProfessorsProjectProvider>
        </ReactQueryClientProvider>
    );
}