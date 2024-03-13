import { title } from "@/app/components/primitives";
import FormDashboard from "../_components/formDashboard";

export default function PanelInformacion() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold py-2">
        Inscríbete al Sistema de manejo de Taller de grado 1
      </h1>
      <h2 className="text-xl mb-4">
        Cuando hayas hecho tu inscripcion al sistema académico correctamente de
        la materia se te dará acceso al sistema, cualquier problema comunicarse
        a <span className="font-bold">o.figueroa@ucb.edu.bo</span>
      </h2>
      <FormDashboard />
    </div>
  );
}
