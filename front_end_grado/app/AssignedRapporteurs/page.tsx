import { ReactQueryClientProvider } from "../(public)/form/providers/ReactQueryClientProvider";
import RapporteurCard from "./Components/RapporteurCard";
import PersonProvider from "./Providers/PersonProvider";

export default function AssignedRapporteurs() {
    return (
        <ReactQueryClientProvider>
            <PersonProvider>
                <h1>Tus relatores</h1>
                <RapporteurCard />
            </PersonProvider>
        </ReactQueryClientProvider>
    )
}