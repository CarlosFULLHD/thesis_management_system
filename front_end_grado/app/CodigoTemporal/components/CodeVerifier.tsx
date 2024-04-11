import React, { useState, useRef, useEffect } from "react";
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Spinner,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface TemporalCodeResponse {
  idTemporal: number;
  temporalCode: string;
  createdAt: string;
  dueDate: string;
  isUsed: number;
}

const CodeVerifier: React.FC = () => {
  const router = useRouter();
  // State for the digits
  const [digits, setDigits] = useState<string[]>(new Array(6).fill(""));
  // State for the final code
  const [finalCode, setFinalCode] = useState("");
  // State for modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // change focus
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  // Create temporal code url
  const endPointUrl = `${BASE_URL}temporal-code/code`;
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  // Usado para evitar más de 3 intentos de acceso
  useEffect(() => {
    const unblockTime = localStorage.getItem("unblockTime");
    if (unblockTime && new Date(unblockTime) > new Date()) {
      setIsBlocked(true);
    }
  }, []);

  const handleAttemptLimit = () => {
    setAttemptCount((prev) => {
      // Si el número de intentos alcanza 5, bloquea al usuario, esto se hace por medio de
      // Local Storage, asi que será por navegador
      const newAttemptCount = prev + 1;
      if (newAttemptCount >= 5) {
        setIsBlocked(true);
        const unblockTime = new Date();
        unblockTime.setHours(unblockTime.getHours() + 24); // bloqueo por 24 horas
        localStorage.setItem("unblockTime", unblockTime.toString());
      }

      return newAttemptCount;
    });
  };

  // Change state
  const handleInput =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDigits = [...digits];
      newDigits[index] = e.target.value;
      setDigits(newDigits);

      const nextIndex = index + 1;
      if (
        nextIndex < inputsRef.current.length &&
        inputsRef.current[nextIndex]
      ) {
        const nextInput = inputsRef.current[nextIndex] as HTMLInputElement;
        nextInput.focus();
        nextInput.select();
      }
    };

  // Clear inputs
  const clearFields = () => {
    setDigits(new Array(6).fill(""));
    inputsRef.current[0]?.focus();
  };

  // Back end request
  const sendDigits = () => {
    const code = digits.join("");
    if (code.length === 6) {
      onOpen();
      mutation.mutate(code);
    } else {
      toast.error("Código debe tener 6 dígitos");
    }
  };

  const checkCode = async (code: string): Promise<number> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (isBlocked) {
      toast.error("Acceso bloqueado temporalmente");
      return 0;
    }
    if (code.length !== 6) {
      toast.error("El código debe tener 6 dígitos");
      handleAttemptLimit();
      return 0;
    }
    setFinalCode(code);
    try {
      const response = await axios.get<number>(
        `${endPointUrl}?temporalCode=${code}`
      );
      console.log(response.status);
      return response.status;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Error con el servidor");
      }
      throw new Error("Error inesperado");
    }
  };

  // Mutation function
  const mutation = useMutation({
    mutationFn: checkCode,
    onMutate: () => {
      onOpen();
    },
    onError: (error) => {
      toast.error(error.message);
      onClose();
      handleAttemptLimit();
    },
    onSuccess: (data) => {
      onClose();
      if (data >= 200 && data < 300) {
        toast.success("Bienvenido Docente, por favor registre sus datos");
        // Redireccion al formulario del docente
        router.push("/form_docentes");
      } else {
        //Se puede decir Codigo equivocado, erroneo, a usado, etc, pero no daremos esa info por seguridad
        toast.error("Código incorrecto, intente nuevamente");
      }
    },
    onSettled: () => {
      onClose();
    },
  });

  return (
    <div>
      <div className="flex justify-center gap-2">
        {[...Array(6)].map((_, index) => (
          <Input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
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
        <Button color="default" variant="ghost" onClick={clearFields}>
          Limpiar
        </Button>
        <Button color="primary" variant="ghost" onClick={sendDigits}>
          Enviar
        </Button>
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
