import { FaTasks, FaCheck, FaTimes } from 'react-icons/fa';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Tooltip, Divider } from "@nextui-org/react";
import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation";
import { useAcademicPeriod } from '../../providers/AcademicPeriodProvider';

interface AssignTaskButtonProps {
    idAcad:number,
    semester: string,
}

const AssignTaskButton = ( { idAcad, semester } : AssignTaskButtonProps ) => {


    const {replace} = useRouter();
    const searchParams = useSearchParams();


    function handleSearch(term: string, route:string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
          params.set('idAcad', term);
        } else {
          params.delete('idAcad');
        }
        replace(`/Periodo-academico/Tareas/${route}?${params.toString()}`);
      }


    // State for the modals
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    // Routing function
    const redirectToNewPage = (route : string) => {
        return () => {
            handleSearch(idAcad.toString(), route)
        };
    };

    return (
        <div>
            <Tooltip color="warning" content="Asignar tareas">
                <Button
                    key="blur"
                    color="warning"
                    variant="ghost"
                    onPress={onOpen}
                >
                    <FaTasks />
                </Button>
            </Tooltip>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Periodo académico {semester}
                            </ModalHeader>
                            <Divider />
                            <ModalBody>
                                <h2 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-300">
                                    Elija taller al que asignar tareas
                                </h2>
                            </ModalBody>
                            <Divider />
                            <ModalFooter>
                                <div className="space-x-4">

                                    <Button color="primary" variant="ghost"
                                        onPress={(redirectToNewPage("Taller-grado-uno"))}
                                    >
                                        <p className="font-bold py-2 px-4 rounded">
                                            Tareas - TALLER I
                                        </p>
                                    </Button>

                                    <Button color="success" variant="ghost"
                                     onPress={(redirectToNewPage("Taller-grado-dos"))} >
                                        <p className=" font-bold py-2 px-4 rounded" >
                                            Tareas - TALLER II
                                        </p>
                                    </Button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default AssignTaskButton;