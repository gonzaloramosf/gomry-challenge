import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { User as FirebaseUser } from "firebase/auth";
import { User } from "@/types/User";

export async function sendVerificationCode(email: string): Promise<void> {
  const res = await fetch("/api/auth/send-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to send verification code");
  }
}

export async function verifyCode(email: string, code: string): Promise<{ token: string }> {
  const res = await fetch("/api/auth/verify-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to verify code");
  }

  return res.json();
}

export async function sendSessionCookie(idToken: string): Promise<void> {
  const res = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to create session cookie");
  }
}

export interface VerifySessionResponse {
  completedKyc: boolean;
}

export async function verifySession( origin: string, cookieHeader: string ): Promise<VerifySessionResponse> {
  const res = await fetch(`${origin}/api/auth/verify-session`, {
    headers: { cookie: cookieHeader },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`verifySession failed: ${err}`);
  }

  return res.json();
}

export async function createUserIfNotExists(user: FirebaseUser | null | undefined): Promise<void> {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    await setDoc(userDocRef, {
      uid: user.uid,
      completedKyc: false,
      country: "",
      dateOfBirth: "",
      email: user.email || "",
      firstName: "",
      fullAddress: "",
      governmentId: "",
      lastName: "",
    });
  }
}

export async function updateUser(uid: string, data: Partial<User>): Promise<void> {
  const userDocRef = doc(db, "users", uid);
  await updateDoc(userDocRef, {
    ...data,
    completedKyc: true
  });
}

export async function logoutSession(): Promise<void> {
  await auth.signOut();
  await fetch("/api/auth/logout", { method: "POST" });
}
