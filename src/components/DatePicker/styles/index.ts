import { tv } from "tailwind-variants";

export const datePickerStyles = tv({
  base: "relative w-full",
  variants: {
    state: {
      default: "",
      error: "border-red-500 focus:ring-red-400",
    },
  },
  defaultVariants: {
    state: "default",
  },
  slots: {
    input: "w-full rounded-md border border-gray-300 px-4 py-2 text-base text-gray-700 shadow-sm focus:outline-none focus:ring-2",
    iconWrapper: "absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400",
  },
})
