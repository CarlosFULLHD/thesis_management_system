//page.tsx
"use client";
import { ReactQueryClientProvider } from "../providers/ReactQueryClientProvider";
import LoginForm from "./components/LoginForm";
import LoginTitle from "./components/LoginTitle";

const Login = () => {
  return (
    <ReactQueryClientProvider>
      <LoginForm />
    </ReactQueryClientProvider>
  );
};

export default Login;
