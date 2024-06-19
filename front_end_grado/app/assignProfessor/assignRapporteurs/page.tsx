import { ReactQueryClientProvider } from "../../providers/ReactQueryClientProvider";
import StudentsTable from "./Components/StudentsTable";
import { StudentsProfessorsProvider } from "./Providers/StudentsProfessorsProvider";
import { ProfessorsProvider } from "../Providers/ProfessorsProvider";

export default function assignRapporteurs() {
    return (
        <ReactQueryClientProvider>
            <StudentsProfessorsProvider>
                <ProfessorsProvider>
                    <h1>Asignar ponentes</h1>
                    <StudentsTable />
                </ProfessorsProvider>
            </StudentsProfessorsProvider>
        </ReactQueryClientProvider>
    );
}