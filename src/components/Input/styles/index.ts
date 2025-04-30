import { tv } from "tailwind-variants";

export const inputStyles = tv({
  base: "block w-full rounded-md shadow-sm focus:outline-none disabled:opacity-50",
  variants: {
    size: {
      sm: "px-2 py-1 text-sm",
      md: "px-3 py-1.5 text-base",
      lg: "px-6 py-3 text-lg",
    },
    variant: {
      default: "border border-gray-300 focus:ring-2 focus:ring-blue-500",
      error: "border border-red-500 focus:ring-2 focus:ring-red-400",
      success: "border border-green-500 focus:ring-2 focus:ring-green-400",
    },
    rounded: {
      none: "rounded-none",
      md: "rounded-md",
      full: "rounded-full",
    },
    block: {
      true: "w-full",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    rounded: "md",
  },
})
