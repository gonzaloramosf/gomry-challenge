"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { verifyCode, sendSessionCookie, createUserIfNotExists, sendVerificationCode } from "@/services/Users";
import CodeInput from "@/components/CodeInput";
import Button from "@/components/Button";

interface VerificationStepProps {
  email: string;
}

function VerificationStep({ email }: VerificationStepProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [isSendingCode, setIsSendingCode] = useState(false);

  async function handleVerify(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (code.length !== 6) return;

    try {
      setIsLoading(true);

      const verificationFlow = (async () => {
        const { token } = await verifyCode(email, code);
        await signInWithCustomToken(auth, token);

        const user = auth.currentUser;
        if (user) {
          await createUserIfNotExists(user);

          const idToken = await user.getIdToken(true);
          await sendSessionCookie(idToken);

          router.replace("/kyc");
        }
      })();

      const minimumDelay = new Promise((resolve) => setTimeout(resolve, 200));
      await Promise.all([verificationFlow, minimumDelay]);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setVerificationError(err.message);
      } else {
        setVerificationError("Something went wrong");
      }
      setIsLoading(false);
    }
  }

  async function handleReSendCode(): Promise<void> {
    if (resendTimer > 0) return;
    setIsSendingCode(true);
    try {
      await sendVerificationCode(email);
      setResendTimer(60);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setVerificationError(err.message);
      } else {
        setVerificationError(String(err));
      }
    } finally {
      setIsSendingCode(false)
    }
  }

  useEffect(() => {
    if (resendTimer === 0) return;

    const id = setInterval(() => {
      setResendTimer((sec) => sec - 1);
    }, 1_000);

    return () => clearInterval(id);
  }, [resendTimer]);

  useEffect(() => {
    if (verificationError) {
      setVerificationError(null);
    }
  }, [code]);

  return (
    <>
      <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-600"> Confirmation </h2>
      <span className="block w-11/12 mt-2 mx-auto text-center text-md tracking-tight text-gray-600">
        Enter the 6-digit code sent to <span className="font-bold"> {email} </span>
      </span>

      <div className="mt-5 mb-8 mx-8">
        <form onSubmit={handleVerify}>
          <CodeInput
            length={6}
            isLoading={isLoading}
            className="justify-center"
            onChange={setCode}
          />

          {verificationError && (
            <span className="block w-full mt-4 text-center text-sm text-red-500">
              { verificationError }
            </span>
          )}

          <div className="mt-3 text-center">
            <span
              className={`text-sm ${
                resendTimer === 0
                  ? "text-blue-600 hover:text-blue-500 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleReSendCode}
            >
              {isSendingCode ? (
                <span className="inline-flex items-center gap-1">
                  Sending
                  <span className="flex">
                    <span className="animate-bounce [animation-delay:0s]">.</span>
                    <span className="animate-bounce [animation-delay:0.1s]">.</span>
                    <span className="animate-bounce [animation-delay:0.2s]">.</span>
                  </span>
                </span>
              ) : resendTimer === 0 ? (
                "Re-Send Code"
              ) : (
                `Re-Send in ${resendTimer}s`
              )}
            </span>
          </div>

          <Button
            type="submit"
            styles={{ size: "full", color: "green", rounded: "xxl" }}
            isLoading={isLoading}
            disabled={code.length < 6 || isLoading}
            className="mt-6"
          >
            Verify
          </Button>
        </form>
      </div>
    </>
  )
}

export default VerificationStep;
