import { tv } from "tailwind-variants";

export const selectStyles = tv({
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
    button: "flex items-center justify-between w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-gray-700 shadow-sm focus:outline-none focus:ring-2",
    optionsWrapper: "absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5 max-h-60 overflow-auto",
    option: "cursor-pointer select-none relative py-2 pl-3 pr-4 text-gray-900 hover:bg-blue-100 hover:text-blue-900",
    selectedOption: "bg-gray-100 font-semibold text-blue-600",
    iconWrapper: "absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400",
    leftIconWrapper: "flex items-center gap-2",
  },
});
