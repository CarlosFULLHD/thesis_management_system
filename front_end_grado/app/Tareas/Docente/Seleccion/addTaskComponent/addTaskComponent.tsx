import DateTimePickerHtml from "@/components/DateTimePickerHtml";
import { Button, Card, CardBody, CardHeader, Checkbox, CheckboxGroup, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import {
    ArrowLeft
} from "lucide-react";
import { useState } from "react";
import MeetingComponent from "./meetingComponent";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { Meeting, Task, TaskInterface, useTasks } from "../../providers/tasksProvider";

interface AddTaskComponentProps {
    callBack: (newFlag: number) => void,
    idGradePro: number
}

const AddTaskComponent = ({idGradePro, callBack }: AddTaskComponentProps) => {
    // Importing data and method from provider
    const { postTaskItem } = useTasks();
    // Modal state
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // Radio group states
    const [selected, setSelected] = useState<string[]>([]);
    const [urlFlag, setUrlFlag] = useState<boolean>(false);
    const [meetingFlag, setMeetingFlag] = useState<boolean>(false);
    // Handle check group action
    const handleCheckGroup = (newValue: string[]) => {
        if (!newValue.includes("1")) {
            setUrlFlag(false)
        }
        if (!newValue.includes("2")) {
            setMeetingFlag(false)
        }

        if (newValue.includes("1")) {
            setUrlFlag(true)
        }

        if (newValue.includes("2")) {
            setMeetingFlag(true)
        }
        setSelected(newValue);
    }

    // Is virtual callback state
    const [isVirtual, setIsVirtual] = useState<boolean>(false);
    // Is virtual callback
    const isVirtualCallback = (flag: boolean) => {
        setIsVirtual(flag)
    }

    // Address link callback state
    const [address, setAddress] = useState<string>("");
    // Address link callback
    const addressCallback = (newAddress: string) => {
        setAddress(newAddress);
    }


    // State for task title
    const [titleTask, setTitleTask] = useState<string>("");
    // State for task
    const [task, setTask] = useState<string>("");
    // State meeting callbacks
    const [meetingDate, setMeeintDate] = useState<string>('');
    const handleMeetingDate = (dateTime: string) => {
        setMeeintDate(dateTime);
    }

    // State dates callbacks
    const [initDate, setInitDate] = useState<string>('');
    const handleInitDate = (dateTime: string) => {
        setInitDate(dateTime);
    }
    const [endDate, setEndDate] = useState<string>('');
    const handleEndDate = (dateTime: string) => {
        setEndDate(dateTime);
    }


    // Check if the form has been completed before opening the modal
    const checkModal = () => {
        if (titleTask == "" || task == "") {
            toast.warning("Debe completar el formulario")
            return
        }
        if (meetingFlag && (meetingDate == "" || address == "")) {

            toast.warning("Complete datos de la reunión")
            return
        }
        onOpen();
        
    }

    // Method to clean the form 
    const cleanForm = () => {
        if (selected.length > 0 || urlFlag == true || meetingFlag == true || isVirtual == true || address != "" || titleTask != "" || task != "" || meetingDate != "" || initDate != "" || endDate != "") {
            setSelected([])
            setUrlFlag(false)
            setMeetingFlag(false)
            setIsVirtual(false)
            setAddress("")
            setTitleTask("")
            setTask("")
            setMeeintDate("")
            setInitDate("")
            setEndDate("")
            toast.success("Formulario limpiado")
        } else {
            toast.warning("No hay nada que limpiar")
        }
    }

    // Method to create new task
    const saveTask = async () => {
        if (initDate == "" || endDate == "") {
            toast.warning("Asigne fechas de publicación")
            return
        }
        const newTask: Task = {
            academicHasGradeProfileIdAcadGrade:{
                gradeProfileIdGradePro:{
                    idGradePro: idGradePro,
                }
            },
            titleTask:       titleTask,
            task:            task,
            isUrl:           urlFlag ? 1 : 0,
            isMeeting:       meetingFlag ? 1 : 0,
            publicationDate: initDate,
            deadline: endDate
        }

        const newMetting : Meeting = {}
        if (newTask.isMeeting == 1){
            newMetting.addressLink = address;
            newMetting.isVirtual = isVirtual ? 1 : 0;
            newMetting.meetingDate = meetingDate;
        }

        const postTask :TaskInterface ={
            task : newTask,
            meeting: newMetting
        }

        await postTaskItem(postTask)

        toast.success("Tarea asignada exitosamente")
        onClose();
        callBack(0);
    }



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
                        className="p-4"
                        fullWidth
                        type="text"
                        variant="bordered"
                        label="Título de tarea"
                        placeholder="Ingrese título"
                        labelPlacement="outside"
                        value={titleTask}
                        onChange={(event) => setTitleTask(event.target.value)}
                        onClear={() => setTitleTask("")}
                        isClearable
                        required
                    />

                    <Textarea
                        className="p-4"
                        fullWidth
                        type="text"
                        variant="bordered"
                        label="Descripción tarea"
                        placeholder="Ingrese url"
                        labelPlacement="outside"
                        value={task}
                        onChange={(event) => setTask(event.target.value)}
                        onClear={() => setTask("")}
                        required
                    />

                    <div className="flex flex-col gap-3 p-4">
                        <CheckboxGroup
                            label="Seleccionar acciones"
                            color="primary"
                            value={selected}
                            onValueChange={handleCheckGroup}
                        >
                            <Checkbox value="1">Espacio en la nube</Checkbox>
                            <Checkbox value="2">Agendar reunión</Checkbox>
                        </CheckboxGroup>
                    </div>

                    {meetingFlag && (<MeetingComponent
                        isVirtual={isVirtual}
                        isVirtualCallback={isVirtualCallback}
                        address={address}
                        addressCallback={addressCallback}
                        meetingDate={meetingDate}
                        handleMeetingDate={handleMeetingDate}
                    />)}

                </form>
            </div>
            <div className="flex justify-center items-center gap-4 my-4">
                <Button color="default" variant="ghost" onClick={() => cleanForm()}>
                    Limpiar
                </Button>

                <Button color="primary" type="submit" onClick={() => { checkModal() }}>
                    Asignar tarea
                </Button>
            </div>



            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Asigne fechas para la tarea</ModalHeader>
                            <ModalBody>
                                <Card className="max-w-[400px]">
                                    <CardBody>
                                        <div className="flex flex-col gap-3 p-4">
                                            <DateTimePickerHtml title="Fecha publicación" onChange={handleInitDate} dateValue="" />
                                            <DateTimePickerHtml title="Fecha final" onChange={handleEndDate} dateValue="" />
                                        </div>
                                    </CardBody>

                                </Card>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose} startContent={<FaTimes />}>
                                    Cancelar
                                </Button>
                                <Button color="success" variant="ghost" onPress={() => { saveTask() }} startContent={<FaCheck />}>
                                    Asignar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>



        </>
    );
}

export default AddTaskComponent;