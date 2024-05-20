import { Button, Checkbox, CheckboxGroup, Input, Textarea } from "@nextui-org/react";
import {
    ArrowLeft
} from "lucide-react";
import { useState } from "react";
interface AddTaskComponentProps {
    callBack: (newFlag: number) => void,
}

const AddTaskComponent = ({ callBack }: AddTaskComponentProps) => {

    const [selected, setSelected] = useState(["Espacio en la nube", "Agendar reunión"]);
    return (
        <>


            <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 px-4 py-2">
                    Crear nueva tarea
                </h1>
                <Button isIconOnly color="primary" onClick={() => callBack(0)}><ArrowLeft /></Button>
            </div>

            <div className="flex justify-center items-center">
                <form className="px-10 max-w-lg w-full bg-white rounded-xl border border-gray-200 shadow-md dark:bg-black-50  dark:border-gray-700">

                    <Input
                        fullWidth
                        type="url"
                        variant="bordered"
                        label="Título de tarea"
                        placeholder="Ingrese título"
                        labelPlacement="outside"
                        // value={url}
                        // onChange={(event) => setUrl(event.target.value)}
                        // onClear={() => setUrl("")}
                        isClearable
                        required
                    />
                    <Textarea
                        fullWidth
                        type="url"
                        variant="bordered"
                        label="Descripción tarea"
                        placeholder="Ingrese url"
                        labelPlacement="outside"
                        // value={url}
                        // onChange={(event) => setUrl(event.target.value)}
                        // onClear={() => setUrl("")}
                        required
                    />

                    <div className="flex flex-col gap-3">
                        <CheckboxGroup
                            label="Seleccionar acciones"
                            color="primary"
                            value={selected}
                            onValueChange={setSelected}
                        >
                            <Checkbox value="buenos-aires">Espacio en la nube</Checkbox>
                            <Checkbox value="sydney">Agendar reunión</Checkbox>
                        </CheckboxGroup>
                    </div>


                </form>
            </div>
        </>
    );
}

export default AddTaskComponent;