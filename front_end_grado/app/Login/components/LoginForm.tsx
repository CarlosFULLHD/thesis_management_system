//LoginForm.tsx
import Recaptchacomp from "./Recaptchacomp";
import { useState } from "react";
import React from "react";
import { BASE_URL } from "@/config/globals";
import axios from "axios";
import { toast } from "react-toastify";
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
import { useRouter } from "next/navigation";
import { useSession } from "@/app/providers/SessionProvider";

const LoginForm = () => {
  const { login } = useSession();
  const router = useRouter();
  // Recaptcha value
  const recaptchaRef: any = React.createRef();
  // State for account field
  const [account, setAccount] = useState("");
  // State for password field
  const [password, setPassword] = useState("");
  // State for modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // Urls for captcha and login end points
  const captchaUrl = `${BASE_URL}reCaptcha/`;
  const loginUrl = `${BASE_URL}users/log-in`;

  // Check if form if okay to be send
  const checkFormAndCaptcha = async (event: any): Promise<void> => {
    event.preventDefault();
    onOpen();
    const captchaValue = recaptchaRef.current.getValue();
    recaptchaRef.current.reset();
    if (!captchaValue) {
      toast.info("Verifica que eres humano");
      onClose();
      return;
    }
    if (account == "" || password == "") {
      toast.warning("Completa el formulario");
      onClose();
      return;
    }
    recaptchaRef.current.reset();
    const captchaResponse = await doCaptcha(captchaValue);
    if (captchaResponse) {
      mutation.mutate();
    }
    onClose();
  };

  // Make request to check captcha puzzle
  const doCaptcha = async (captchaValue: any): Promise<boolean> => {
    const data = {
      captchaValue: captchaValue,
    };
    const response = await axios.post(captchaUrl, data);
    return response.data.success;
  };

  // Make log in request
  const doLogin = async (): Promise<number> => {
    const data = {
      username: account,
      password: password,
    };
    try {
      const response = await axios.post(loginUrl, data, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000, // Timeout of 10 seconds
      });
      // Update context with new token
      if (response.data.jwt) {
        login(response.data.jwt);
      }
      return response.data.status == 1 ? 1 : 0;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Type guard to check if it's an AxiosError
        if (error.response) {
          // The server responded with a status code that falls out of the range of 2xx
          console.error("Error response:", error.response);
          toast.error("Error al iniciar sesión. Verifica tus credenciales.");
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request made, no response:", error.request);
          toast.error(
            "Problemas de conexión. No se recibió respuesta del servidor."
          );
        } else {
          // Something happened in setting up the request and triggered an Error
          console.error("Non-Axios error:", error);
          toast.error("Error al configurar la solicitud de inicio de sesión.");
        }
      } else {
        // Generic error handling if the error is not from Axios
        toast.error(
          "Se produjo un error inesperado. Por favor intenta de nuevo."
        );
      }
      console.error("Login error:", error);
      return 0;
    }
  };

  const mutation = useMutation({
    mutationFn: doLogin,
    onMutate: (variables: any) => {
      onOpen();
      // console.log(variables)
    },
    onError: (error: any, variables: any, context: any) => {
      // console.log(error)
      // console.log(variables)
      // console.log(context)
      toast.error(
        "Error al conectar con el servidor o tiempo de espera excedido."
      );
      onClose();
    },
    onSuccess: (data: number, variables: any, context: any) => {
      console.log(`EXITO ${data}`);
      if (data == 1) {
        toast.success("Bienvenido");

        // Redireccion al main
        router.push("/");
      } else {
        //toast.error("Credenciales incorrectos");
      }
      onClose();
    },
    onSettled: (data: any, error: any, variables: any, context: any) => {
      // console.log(data)
      // console.log(error)
      // console.log(variables)
      // console.log(context)

      onClose();
    },
  });

  return (
    <div>
      <form
        onSubmit={checkFormAndCaptcha}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "300px",
          margin: "auto",
        }}
      >
        <div>
          <Input
            fullWidth
            type="text"
            variant="bordered"
            label="Nombre de cuenta"
            value={account}
            onChange={(event) => setAccount(event.target.value)}
            required
          />
        </div>
        <div>
          <Input
            fullWidth
            type="password"
            variant="bordered"
            label="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <Recaptchacomp recaptchaRef={recaptchaRef} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="default"
            variant="ghost"
            onClick={() => {
              setAccount("");
              setPassword("");
              toast.info("Formulario limpiado.");
            }}
          >
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
};

export default LoginForm;
