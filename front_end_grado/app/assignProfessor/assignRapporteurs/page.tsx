import { ReactQueryClientProvider } from "../../providers/ReactQueryClientProvider";
import StudentsTable from "./Components/StudentsTable";
import PersonProvider from "../Providers/PersonProvider";
import TutorProvider from "../Providers/TutorProvider";

export default function assignRapporteurs() {
    return (
        <ReactQueryClientProvider>
            <PersonProvider>
                <TutorProvider>
                    <h1>Asignar ponentes</h1>
                    <StudentsTable />
                </TutorProvider>
            </PersonProvider>
        </ReactQueryClientProvider>
    );
}