
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import { toast } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Spinner } from "@nextui-org/react";
import { useState } from 'react';
import { useMutation } from "@tanstack/react-query";

const CodigoTemporalForm = () => {

    // State for email field
    const [email, setEmail] = useState('');
    // State for modal
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    // Create temporal code url
    const captchaUrl = `${BASE_URL}temporal-code/`;

    // Check form before sending it 
    const checkForm = (event: any) => {
        event.preventDefault();
        onOpen();
        if (email == "") {
            toast.warning("Completa el formulario")
            onClose();
            return;
        }
        mutation.mutate();
        onClose();
    }

    // Create temporal code request
    const createTemporalCode = async (): Promise<number> => {
        const data = {
            idUsers: 1, // Replace with the id of the current signed up user
            username: email // E mail of the person which the backend will send a mail
        }
        const headers = { 'Content-Type': 'application/json' }
        try {
            const response = await axios.post(captchaUrl, data, { headers })
            return (response.status >= 200 || response.status < 400) ?
                1 : 0;
        } catch (error) {
            console.error('Temporal code error:', error)
            return 0;
        }
    }


    // Mutation function
    const mutation = useMutation({
        mutationFn: createTemporalCode,
        onMutate: (variables) => {
            onOpen();
            // console.log(variables)
        },
        onError: (error, variables, context) => {
            // console.log(error)
            // console.log(variables)
            // console.log(context)
            toast.error("Error en con el servidor")
            onClose();
        },
        onSuccess: (data, variables, context) => {
            console.log(`EXITO ${data}`)
            if (data == 1) {
                toast.success(`Código temporal enviado a ${email}`)
            } else {
                toast.error("Error al crear código temporal")
            }
            onClose();
        },
        onSettled: (data, error, variables, context) => {
            // console.log(data)
            // console.log(error)
            // console.log(variables)
            // console.log(context)

            onClose();
        }
    })

    return (
        <div>
            <form onSubmit={checkForm} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '300px', margin: 'auto' }}>
                <div>
                    <Input fullWidth type="email" variant="bordered" label="Dirección de correo" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </div>


                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button color="default" variant="ghost" onClick={() => { toast("COLA PERRO") }}>
                        Limpiar
                    </Button>
                    <Button color="primary" variant="ghost" type="submit">
                        Ingresar
                    </Button>
                </div>
            </form>
            <Modal backdrop="blur" isOpen={isOpen} size="xs">
                <ModalContent>
                    <ModalBody>
                        <Spinner label="Cargando..." />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default CodigoTemporalForm;