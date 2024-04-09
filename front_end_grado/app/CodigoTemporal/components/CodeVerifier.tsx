import React, { useState, useRef } from 'react';
import { BASE_URL } from '@/config/globals';
import axios from 'axios';
import { useMutation } from "@tanstack/react-query";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Spinner } from "@nextui-org/react";
import { toast } from 'react-toastify';

interface TemporalCodeResponse {
    idTemporal: number,
    temporalCode: string,
    createdAt: string,
    dueDate: string,
    isUsed: number
}

const CodeVerifier: React.FC = () => {

    // State for the digits
    const [digits, setDigits] = useState<string[]>(new Array(6).fill(''));
    // State for the final code
    const [finalCode, setFinalCode] =  useState('');
     // State for modal
     const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    // change focus
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    // Create temporal code url
    const endPointUrl = `${BASE_URL}temporal-code/code`;

    // Change state
    const handleInput = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDigits = [...digits];
        newDigits[index] = e.target.value;
        setDigits(newDigits);

        const nextIndex = index + 1;
        if (nextIndex < inputsRef.current.length && inputsRef.current[nextIndex]) {
            const nextInput = inputsRef.current[nextIndex] as HTMLInputElement;
            nextInput.focus();
            nextInput.select();
        }
    };

    // Clear inputs
    const clearFields = () => {
        setDigits(new Array(6).fill(''));
        inputsRef.current[0]?.focus();
    };

    // Back end request
    const sendDigits = () => {
        onOpen();
        const code = digits.join('');
        if (code.length == 6) {
            setFinalCode(code);
            mutation.mutate();
        } else {
            toast.error("Código debe tener 6 dígitos");
            onClose()
        }
    };

    const checkCode = async() : Promise<number> => {
        try{
            const response = await axios.get<number>(`${endPointUrl}?temporalCode=${finalCode}`)
            console.log(response.status)
            return response.status;
        } catch (error){
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || "Error con el servidor");
            }
            throw new Error("Error inesperado");
        }
    }

     // Mutation function
     const mutation = useMutation({
        mutationFn: checkCode,
        onMutate: (variables) => {
            onOpen();
            // console.log(variables)
        },
        onError: (error, variables, context) => {
            // console.log(error)
            // console.log(variables)
            // console.log(context)
            toast.error(`Codigo incorrecto intente de nuevo`)
            onClose();
        },
        onSuccess: (data, variables, context) => {
            if (data >= 200 || data < 400){
                toast.success(`Código temporal correcto`)
            } else {
                toast.success("Codigo temporal ya utilizado")
            }
            // if (data == 1) {
            //     toast.success(`Código temporal enviado a ${email}`)
            // } else {
            //     toast.error("Error al crear código temporal")
            // }
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
            <div className="flex justify-center gap-2">
                {[...Array(6)].map((_, index) => (
                    <Input
                        key={index}
                        ref={(el) => inputsRef.current[index] = el}
                        isRequired
                        type="text"
                        maxLength={1}
                        pattern="[0-9]*"
                        value={digits[index]}
                        onChange={handleInput(index)}
                        className="w-12 h-12 text-center"
                    />
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <Button  color="default" variant="ghost" onClick={clearFields}>Limpiar</Button>
                <Button color="primary" variant="ghost" onClick={sendDigits}>Enviar</Button>
            </div>
            <Modal backdrop="blur" isOpen={isOpen} size="xs">
                <ModalContent>
                    <ModalBody>
                        <Spinner label="Cargando..." />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CodeVerifier;
