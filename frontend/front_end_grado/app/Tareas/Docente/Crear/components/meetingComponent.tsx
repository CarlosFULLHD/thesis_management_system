import DateTimePickerHtml from "@/components/DateTimePickerHtml";
import { Checkbox, Divider, Input } from "@nextui-org/react";
interface MeetingComponentProps {
    isVirtual: boolean,
    isVirtualCallback: (flag: boolean) => void
    address: string,
    addressCallback: (newAddress: string) => void,
    meetingDate:string,
    handleMeetingDate: (dateTime: string) => void
}


const MeetingComponent = ({ isVirtual, isVirtualCallback, address, addressCallback, meetingDate, handleMeetingDate }: MeetingComponentProps) => {
    return (
        <>
            <h3 className="text-lg md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 px-2 py-1">
                Configurar Reunión
            </h3>
            <Divider />
            <div className="flex flex-col gap-2">
                <Checkbox isSelected={isVirtual} onValueChange={isVirtualCallback} radius="full">
                    ¿La reunión es virtual?
                </Checkbox>
            </div>
     
                <Input
                className="p-4"
                fullWidth
                type={isVirtual ? "url" : "text"}
                variant="bordered"
                label={isVirtual ? "Url de reunión" : "Dirección de reunión"}
                placeholder={isVirtual ? "Ingrese url de reunión" : "Ingrese dirección de la reunión"}
                labelPlacement="outside"
                value={address}
                onChange={(event) => addressCallback(event.target.value)}
                onClear={() => addressCallback("")}
                isClearable
                required
            />
       
            <div className="flex flex-col gap-3 p-4">
            <DateTimePickerHtml title="Fecha - hora reunión" onChange={handleMeetingDate} dateValue="" />
            </div>
            <Divider />
        </>
    )
}

export default MeetingComponent;