// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom/jest-globals";
// import "@testing-library/jest-dom";

// import FormRegistration from "../_components/formRegistration";
// import { StudentProvider } from "../_providers/studentProvider";

// describe("FormRegistration", () => {
//   it("renders the form with all input fields and a submit button", () => {
//     render(
//       <StudentProvider>
//         <FormRegistration />
//       </StudentProvider>
//     );

//     expect(screen.getByLabelText(/Carnet de Identidad:/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Nombres:/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Apellido Paterno:/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Apellido Materno:/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Email Institucional:/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Celular:/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
//   });

//   it("allows typing in the input fields", () => {
//     render(
//       <StudentProvider>
//         <FormRegistration />
//       </StudentProvider>
//     );

//     const ciInput = screen.getByLabelText(/Carnet de Identidad:/i);
//     userEvent.type(ciInput, "12345678");
//     expect(ciInput).toHaveValue("12345678");

//     const nameInput = screen.getByLabelText(/Nombres:/i);
//     userEvent.type(nameInput, "Juan");
//     expect(nameInput).toHaveValue("Juan");
//   });

//   // Puedes agregar más pruebas aquí, como simular el envío del formulario y verificar llamadas a funciones, etc.
// });
