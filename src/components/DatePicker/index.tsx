"use client";

import { forwardRef } from "react";
import { Calendar } from "lucide-react";
import { datePickerStyles } from "./styles";
import type { VariantProps } from "tailwind-variants";
import type { InputHTMLAttributes } from "react";

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

interface DatePickerProps extends NativeInputProps, VariantProps<typeof datePickerStyles> {
  label?: string;
  errorMessage?: string;
  className?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    const {
      label,
      className,
      errorMessage,
      ...rest
    } = props;

    const styles = datePickerStyles({ state: errorMessage ? "error" : "default" });

    return (
      <div className={styles.base({ className })}>
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type="date"
            className={styles.input()}
            {...rest}
          />
          <div className={styles.iconWrapper()}>
            <Calendar size={20} />
          </div>
        </div>

        {errorMessage && (
          <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
