"use client";

import React, { createContext, useContext, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  leaving?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  show: (toast: Omit<Toast, "id">) => void;
  remove: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function show(toast: Omit<Toast, 'id'>): void {
    const id = Math.random().toString(36).slice(2, 11);

    setToasts(prev => [...prev, { id, leaving: true, ...toast }]);

    requestAnimationFrame(() =>
      setToasts(prev => prev.map(t =>
        t.id === id ? { ...t, leaving: false } : t
      ))
    );

    setTimeout(() => remove(id), 5000);
  }

  function remove(id: string): void {
    setToasts(prev => prev.map(t =>
      t.id === id ? { ...t, leaving: true } : t
    ));

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300)
  }

  return (
    <ToastContext.Provider value={{ toasts, show, remove }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("Error: useToast must be used within ToastProvider");
  return ctx;
}
