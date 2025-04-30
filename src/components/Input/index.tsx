import React, { forwardRef, InputHTMLAttributes } from "react";
import { inputStyles } from "./styles";
import type { VariantProps } from "tailwind-variants";

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size">

interface InputProps extends NativeInputProps, VariantProps<typeof inputStyles> {
  label?: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    errorMessage,
    size,
    variant,
    rounded,
    block,
    className,
    ...rest
  } = props;

  const computedClassName = inputStyles({
    size,
    variant: errorMessage ? "error" : variant,
    rounded,
    block,
    className,
  });

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-600">
          { label }
        </label>
      )}
      <input ref={ref} className={computedClassName} {...rest} />
      {errorMessage && (
        <p className="text-xs text-red-500 mt-1"> { errorMessage } </p>
      )}
    </div>
  )
})

Input.displayName = "Input";

export default Input;
