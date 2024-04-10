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

const LoginForm = () => {
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
      });
      return response.data.status == 1 ? 1 : 0;
    } catch (error) {
      console.error("Login error:", error);
      return 0;
    }
  };

  const mutation = useMutation({
    mutationFn: doLogin,
    onMutate: (variables) => {
      onOpen();
      // console.log(variables)
    },
    onError: (error, variables, context) => {
      // console.log(error)
      // console.log(variables)
      // console.log(context)
      toast.error("Error en con el servidor");
      onClose();
    },
    onSuccess: (data, variables, context) => {
      console.log(`EXITO ${data}`);
      if (data == 1) {
        toast.success("Bienvenido");
        // Redireccion al main
        router.push("/");
      } else {
        toast.error("Credenciales incorrectos");
      }
      onClose();
    },
    onSettled: (data, error, variables, context) => {
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
              toast("COLA PERRO");
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
