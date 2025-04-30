import { tv } from "tailwind-variants";

export const codeInputStyles = tv({
  base: "flex gap-2 relative",
  slots: {
    input: "w-10 h-12 text-center text-2xl border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:opacity-50",
    clearButton: "text-gray-500 hover:text-red-500 text-2xl absolute -right-8 top-2",
  },
})
