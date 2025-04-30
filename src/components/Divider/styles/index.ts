import { tv } from "tailwind-variants";

export const dividerStyles = tv({
  base: "flex items-center my-6",
  slots: {
    line: "flex-grow h-px bg-gray-200",
    text: "mx-4 text-gray-500 text-sm whitespace-nowrap",
  },
  variants: {},
})
