import { tv } from "tailwind-variants";

export const baseButton = tv({
  base: [
    "inline-flex items-center justify-center font-semibold select-none",
    "outline-none whitespace-nowrap align-middle relative",
  ].join(' '),
  variants: {
    size: {
      sm: "text-sm py-1 px-3",
      md: "text-base py-2 px-4",
      lg: "text-base py-3 px-6",
      full: "w-full text-base py-1.5 px-3"
    },
    rounded: {
      none: "rounded-none",
      md: "rounded-md",
      xxl: "rounded-2xl",
      full: "rounded-full",
    },
    block: {
      true: "w-full",
    },
  },
  defaultVariants: {
    size: "md",
    rounded: "md",
  },
})

export const solidButton = tv({
  extend: baseButton,
  base: "cursor-pointer",
  variants: {
    color: {
      green: "bg-green-600 text-white hover:bg-green-700",
      blue:  "bg-blue-600  text-white hover:bg-blue-700",
      gray:  "bg-gray-600  text-white hover:bg-gray-700",
    },
  },
  defaultVariants: {
    color: "blue",
  },
})

export const outlineButton = tv({
  extend: baseButton,
  base: "ring-1 cursor-pointer",
  variants: {
    color: {
      green: "ring-green-600 text-green-600 hover:bg-green-50",
      blue:  "ring-blue-600  text-blue-600  hover:bg-blue-50",
      gray:  "ring-gray-200  text-gray-600  hover:bg-gray-50",
    },
  },
  defaultVariants: {
    color: "blue",
  },
})
