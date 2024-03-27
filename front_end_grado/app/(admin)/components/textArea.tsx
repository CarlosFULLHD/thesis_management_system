import React from "react";
import { Textarea } from "@nextui-org/input";

export default function TextArea() {
  return (
    <Textarea
      label="Description"
      variant="bordered"
      placeholder="Enter your description"
      disableAnimation
      disableAutosize
      classNames={{
        base: "max-w-xs",
        input: "resize-y min-h-[40px]",
      }}
    />
  );
}
