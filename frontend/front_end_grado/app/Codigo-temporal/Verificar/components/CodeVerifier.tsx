import React, { useState, useRef, useEffect } from "react";
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import {
  Modal,
  ModalContent,
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
  const cookies = useCookies();
  const [digits, setDigits] = useState<string[]>(new Array(6).fill(""));
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const endPointUrl = `${BASE_URL}temporal-code/code`;
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [finalCode, setFinalCode] = useState("");

  useEffect(() => {
    const unblockTime = localStorage.getItem("unblockTime");
    if (unblockTime && new Date(unblockTime) > new Date()) {
      setIsBlocked(true);
    }
  }, []);

  const handleAttemptLimit = () => {
    setAttemptCount((prev) => {
      const newAttemptCount = prev + 1;
      if (newAttemptCount >= 5) {
        setIsBlocked(true);
        const unblockTime = new Date();
        unblockTime.setHours(unblockTime.getHours() + 24);
        localStorage.setItem("unblockTime", unblockTime.toString());
      }
      return newAttemptCount;
    });
  };

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

  const clearFields = () => {
    setDigits(new Array(6).fill(""));
    inputsRef.current[0]?.focus();
  };

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
      return response.status;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Error con el servidor");
      }
      throw new Error("Error inesperado");
    }
  };

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
        cookies.set("codeVerified", "true");
        router.push("/form_docentes");
      } else {
        toast.error("Código incorrecto, intente nuevamente");
      }
    },
    onSettled: () => {
      onClose();
    },
  });

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-background-dark rounded-lg shadow-lg">
      <div className="flex justify-center gap-2 mb-4">
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
            className="w-12 h-12 text-center text-lg"
            color={"primary"}
            autoFocus={index === 0}
          />
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <Button
          color="default"
          variant="ghost"
          onClick={clearFields}
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        >
          Limpiar
        </Button>
        <Button
          variant="ghost"
          onClick={sendDigits}
          className="bg-yellow-light text-black dark:bg-yellow-dark font-bold"
        >
          Enviar
        </Button>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} size="xs">
        <ModalContent>
          <ModalBody>
            <Spinner label="Verificando..." />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CodeVerifier;
