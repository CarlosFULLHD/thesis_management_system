import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import StudentsTable from "./Components/StudentsTable";
import PersonProvider from "../Providers/PersonProvider";
import TutorProvider from "../Providers/TutorProvider";

export default function assignTuttors() {
    return (
        <ReactQueryClientProvider>
            <PersonProvider>
                <TutorProvider>
                    <h1>Asignar tutores</h1>
                    <StudentsTable initialPage={0} pageSize={5}/>
                </TutorProvider>
            </PersonProvider>
        </ReactQueryClientProvider>
    );
}