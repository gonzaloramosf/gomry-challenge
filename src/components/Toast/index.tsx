"use client"

import clsx from "clsx";
import { X, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useToast } from "@/stores/ToastContext";
import { toastStyles } from "./styles";

function Toast() {
  const { toasts, remove } = useToast();

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="mt-1.5 text-green-500" />
      case "error":
        return <XCircle className="mt-1.5 text-red-500" />
      case "warning":
        return <AlertTriangle className="mt-1.5 text-yellow-500" />
      default:
        return <Info className="mt-1.5 text-blue-500" />
    }
  }

  return (
    <div className="fixed left-0 mx-4 right-0 bottom-6 sm:mx-auto sm:right-6 sm:left-auto z-50 space-y-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            toastStyles({ type: toast.type }),
            "transition-all duration-300 ease-in-out",
            toast.leaving
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0"
          )}
        >
          {getIcon(toast.type)}
          <div className="flex flex-col">
            <span className="font-semibold">{toast.title}</span>
            <span className="text-sm">{toast.message}</span>
          </div>
          <button onClick={() => remove(toast.id)} className="ml-auto">
            <X className="w-4 h-4 text-gray-400 hover:text-gray-700 cursor-pointer" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast;
