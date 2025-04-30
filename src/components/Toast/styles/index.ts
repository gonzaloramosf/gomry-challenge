import { tv } from "tailwind-variants";

export const toastStyles = tv({
  base: "rounded-lg p-4 flex gap-3 w-full max-w-md shadow-lg",
  variants: {
    type: {
      success: "bg-green-50 text-green-800",
      error: "bg-red-50 text-red-800",
      warning: "bg-yellow-50 text-yellow-800",
      info: "bg-blue-50 text-blue-800",
    },
  },
  defaultVariants: {
    type: "info",
  },
})
