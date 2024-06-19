import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import RapporteurCard from "./Components/RapporteurCard";
import PersonProvider from "./Providers/PersonProvider";

export default function AssignedRapporteurs() {
  return (
    <ReactQueryClientProvider>
      <PersonProvider>
        <h1 className="text-3xl md:text-4xl font-bold py-2 text-blue-500">
          Mis relatores:
        </h1>
        <RapporteurCard idGradeProfile={1} />
      </PersonProvider>
    </ReactQueryClientProvider>
  );
}
