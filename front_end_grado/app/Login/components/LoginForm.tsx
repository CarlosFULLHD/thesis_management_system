//LoginForm.tsx
"use client";
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
import { Logo } from "@/components/icons";
import LoginTitle from "./LoginTitle";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
      mutation.mutate(undefined);
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
    <div className="flex justify-center items-center">
      <div className="px-6 max-w-sm w-full bg-white rounded-xl border border-gray-200 shadow-md dark:bg-black-50  dark:border-gray-700 text-black">
        <form onSubmit={checkFormAndCaptcha} className="flex flex-col gap-4">
          <LoginTitle />
          <div className="mx-auto">
            <Logo className="rounded-xl" />
          </div>

          <Input
            fullWidth
            type="text"
            variant="bordered"
            label="E-mail"
            value={account}
            onChange={(event) => setAccount(event.target.value)}
            required
            tabIndex={1}
          />

          <Input
            fullWidth
            variant="bordered"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            tabIndex={2}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />

          <Recaptchacomp recaptchaRef={recaptchaRef} tabIndex={3} />

          <Button
            className="mt-2 bg-yellow-light dark:bg-yellow-dark dark:text-black"
            type="submit"
            tabIndex={4}
          >
            Iniciar Sesión
          </Button>
          <Button
            color="default"
            variant="ghost"
            className="mt-4 text-black"
            tabIndex={5}
            onClick={(e) => {
              e.preventDefault();
              setAccount("");
              setPassword("");
              toast.info("Formulario limpiado.");
            }}
          >
            Limpiar
          </Button>

          <a
            href="#forgot-password"
            className="mt-2 text-sm text-center text-blue-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              // Implementa la lógica de olvido de contraseña
            }}
          >
            ¿Olvidaste tu contraseña?
          </a>

          <a
            href="#create-account"
            className="mt-4 text-sm text-center text-blue-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              // Redirige a crear cuenta
            }}
          >
            Crear una cuenta
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
