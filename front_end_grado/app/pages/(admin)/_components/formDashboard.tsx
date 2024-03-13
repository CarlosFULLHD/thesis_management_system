import React from "react";
import { Input } from "@nextui-org/input";
import { MailIcon } from "@/app/components/icons/MailIcon";
import { FormEvent } from "react";
import { Textarea } from "@nextui-org/input";
import TextArea from "./textArea";
import { Button } from "@nextui-org/button";
// async function onSubmit(event: FormEvent<HTMLFormElement>) {
//   event.preventDefault();

//   const formData = new FormData(event.currentTarget);
//   const response = await fetch("/api/submit", {
//     method: "POST",
//     body: formData,
//   });

//   // Handle response if necessary
//   const data = await response.json();
//   // ...
// }
export default function FormDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <TextArea />

        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
}
