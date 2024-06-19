//Recaptchacomp.tsx
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
// si les da error instalar con npm:
// npm i --save-dev @types/react-google-recaptcha
interface RecaptchacompProps {
  recaptchaRef: React.RefObject<ReCAPTCHA>;
}

const Recaptchacomp = ({ recaptchaRef }: RecaptchacompProps) => {
  const onChange = () => {
    // on captcha change
  };

  // async function submitForm(event){
  //     event.preventDefault();
  //     const captchaValue = recaptchaRef.current.getValue();
  // }

  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LchpbIpAAAAAKOduI5oXM8f5-gI62uc1N7Ngacl"
        onChange={onChange}
      />
    </>
  );
};

export default Recaptchacomp;
