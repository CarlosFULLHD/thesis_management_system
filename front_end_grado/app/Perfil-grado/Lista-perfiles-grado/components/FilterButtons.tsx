import { Radio, RadioGroup } from "@nextui-org/react";
import { useState } from "react";

const FilterButtons = () => {

    const [selected, setSelected] = useState("1");
    return (
        <div className="justify-center gap-3">
            <RadioGroup
                label={`Vista de proyectos: ${selected}`}
                value={selected}
                onValueChange={setSelected}
            >
                <div className="flex flex-row gap-3">
                    <Radio value="Taller 1">Taller 1</Radio>
                    <Radio value="Taller 2">Taller 2</Radio>
                    <Radio value="Ambos">Ambos</Radio>
                </div>

            </RadioGroup>

        </div>
    );
}

export default FilterButtons;