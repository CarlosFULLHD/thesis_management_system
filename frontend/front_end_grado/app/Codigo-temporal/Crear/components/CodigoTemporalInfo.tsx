import { Divider } from "@nextui-org/react";
const CodigoTemporalInfo = () => {
  return (
    <>
      <h1 className="mt-8 text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
        Al generar el código temporal
      </h1>
      <Divider />
      <br />
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Acerca del código temporal
          <ul className="list-circle pl-6">
            <li>Se envía un código de 6 dígitos al correo electrónico</li>
            <li>Cada código tiene una vigencia de 24 [h]</li>
            <li>
              Sirven para autorizar la creación de una cuenta para DOCENTES
              unicamente
            </li>
          </ul>
        </li>
        <li>
          ¿Donde debo ingresar el código temporal?
          <ul className="list-circle pl-6">
            <li>
              Junto con el correo, se recibe una url donde el código debe ser
              ingresado{" "}
            </li>
            <li>El código solo puede ser utilizado una vez</li>
            <li>
              Se pueden generar varios códigos temporales para un solo correo
            </li>
          </ul>
        </li>
      </ul>
      <br />
      <Divider />
    </>
  );
};

export default CodigoTemporalInfo;
