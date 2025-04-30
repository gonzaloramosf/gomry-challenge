import React from "react";
import { UserProvider } from "@/stores/UserContext";
import { ToastProvider } from "@/stores/ToastContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }: { children: React.ReactNode; }) {
  return (
    <ToastProvider>
      <UserProvider>
        <NavBar />
        {children}
        <Footer />
      </UserProvider>
      <Toast />
    </ToastProvider>
  )
}
