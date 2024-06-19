import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";

interface SelectTutorLecturerProps {
  radioValue: number;
  radioValueCallback: (newValue: number) => void;
}

const SelectTutorLecturer = ({
  radioValue,
  radioValueCallback,
}: SelectTutorLecturerProps) => {
  const [selected, setSelected] = useState(radioValue.toString());

  const handleTabChange = (key: any) => {
    setSelected(key);
    radioValueCallback(parseInt(key));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Tabs
        aria-label="Tutor or Lecturer Selection"
        selectedKey={selected}
        onSelectionChange={handleTabChange}
        className=""
      >
        <Tab key="0" title="Tutor" className="text-lg md:text-xl font-bold" />
        <Tab key="1" title="Relator" className="text-lg md:text-xl font-bold" />
      </Tabs>
    </div>
  );
};

export default SelectTutorLecturer;
