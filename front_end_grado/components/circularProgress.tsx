import React from "react";
import { CircularProgress as NextUICircularProgress } from "@nextui-org/react";

export const CircularProgressComponent = () => {
  return (
    <NextUICircularProgress
        label="Historial"
        size="lg"
        value={70}
        color="success"
        formatOptions={{ style: "unit", unit: "kilometer" }}
        showValueLabel={true}
    />
  );
}
