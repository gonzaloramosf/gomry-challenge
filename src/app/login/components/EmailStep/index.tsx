"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { sendVerificationCode, sendSessionCookie, createUserIfNotExists } from "@/services/Users";
import { EMAIL_REGEX } from "@/utils/constants";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Divider from "@/components/Divider";

interface EmailStepProps {
  onNextAction: (email: string) => void;
}

function EmailStep({ onNextAction }: EmailStepProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogleSingIn, setIsLoadingGoogleSingIn] = useState(false);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (!email || !EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (email === "alreadytaken@gmail.com") {
      setEmailError("Email is already taken.");
      return;
    }

    try {
      setIsLoading(true);

      const sendCodePromise = sendVerificationCode(email);
      const minimumDelay = new Promise((resolve) => setTimeout(resolve, 200));

      await Promise.all([sendCodePromise, minimumDelay]);
      onNextAction(email);

    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  async function handleSignInWithGoogle() {
    const provider = new GoogleAuthProvider();
    setIsLoadingGoogleSingIn(true);

    try {
      const { user } = await signInWithPopup(auth, provider);

      await createUserIfNotExists(user);

      const idToken = await user.getIdToken(true);
      await sendSessionCookie(idToken);

      router.replace("/kyc");

    } catch(err) {
      console.error(err);
      setIsLoadingGoogleSingIn(false);
    }
  }

  useEffect(() => {
    if (emailError) {
      setEmailError("");
    }
  }, [email]);

  return (
    <>
      <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-600"> Welcome Back! </h2>

      <div className="m-8 mt-5">
        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Email Address"
            type="email"
            value={email}
            errorMessage={emailError}
            disabled={isLoading || isLoadingGoogleSingIn}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            styles={{ size: "full", color: "blue", rounded: "xxl" }}
            isLoading={isLoading}
            disabled={isLoading || isLoadingGoogleSingIn}
            className="mt-4"
          >
            Next
          </Button>
        </form>

        <Divider className="my-6"/>

        <Button
          type="button"
          variant="outline"
          styles={{ size: "full", color: "gray", rounded: "xxl" }}
          isLoading={isLoadingGoogleSingIn}
          disabled={isLoading || isLoadingGoogleSingIn}
          onClick={handleSignInWithGoogle}
        >
          <Image
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            height={20}
            width={20}
            className="me-2"
          />
          Google
        </Button>
      </div>
    </>
  )
}

export default EmailStep;
