"use client"

import React, { useState } from "react";
import Image from "next/image";
import EmailStep from "@/app/login/components/EmailStep";
import VerificationStep from "@/app/login/components/VerificationStep";
import { ChevronLeft } from "lucide-react";

function Login() {
  const [step, setStep] = useState<"email" | "verify">("email");
  const [email, setEmail] = useState("");

  function handleSubmit(submittedEmail: string): void {
    setEmail(submittedEmail);
    setStep("verify");
  }

  function handleBack(): void {
    setStep("email");
  }

  return (
    <div className="h-screen flex bg-blue-950 bg-[url('/pattern.png')] bg-no-repeat bg-contain bg-center">
      <div className="bg-white relative max-[350px]:w-full w-11/12 my-auto mx-auto md:w-full md:max-w-md rounded-2xl shadow-md">
        { step === "verify" ?
          <ChevronLeft
            size={28}
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-500 cursor-pointer"
            onClick={handleBack}
          /> : <></>
        }

        <Image
          src="/logo.png"
          width={96}
          height={96}
          className="mt-4 mx-auto"
          alt="Logo"
        />

        { step === "email" && <EmailStep onNextAction={handleSubmit} /> }
        { step === "verify" && <VerificationStep email={email} /> }
      </div>
    </div>
  )
}

export default Login;
