import { Radio, RadioGroup } from "@nextui-org/react";
import { useState } from "react";

interface SelectTutorLecturerProps {
    radioValue: number;
    radioValueCallback : (newValue: number) => void
}

const SelectTutorLecturer = ({ radioValue,radioValueCallback } :SelectTutorLecturerProps ) => {
    // const [selected, setSelected] = useState(radioValue.toString());
    var selected = radioValue.toString();
    return (
        <RadioGroup
            orientation="horizontal"
            value={selected}
            onValueChange={(e) => {radioValueCallback(parseInt(e))}}
        >
            <Radio value="0">Tutor</Radio>
            <Radio value="1">Relator</Radio>
        </RadioGroup>
    )
}

export default SelectTutorLecturer;