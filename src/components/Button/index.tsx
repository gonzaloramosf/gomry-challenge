import React, { forwardRef, useMemo } from "react";
import type { VariantProps } from "tailwind-variants";
import { LoaderCircle } from "lucide-react";
import { solidButton, outlineButton } from "./styles";

type ButtonVariants = VariantProps<typeof solidButton> & VariantProps<typeof outlineButton>;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  isLoading?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  styles?: ButtonVariants;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = "solid",
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    className,
    styles,
    disabled,
    ...rest
  } = props;

  const isDisabled = disabled || isLoading;

  function getClassName(): string {
    const baseClass = variant === "outline"
      ? outlineButton({ ...styles, className })
      : solidButton({ ...styles, className })

    return `${baseClass} ${isDisabled ? "opacity-50 cursor-not-allowed hover:bg-none hover:ring-0" : ""}`
  }


  const { icon, placement } = useMemo(() => {
    let iconEl = rightIcon || leftIcon;

    if (isLoading)
      iconEl = <LoaderCircle className="animate-spin text-base" />;

    return {
      icon: iconEl,
      placement: rightIcon ? "right" : "left",
    }
  }, [isLoading, leftIcon, rightIcon])

  return (
    <button
      ref={ref}
      className={getClassName()}
      disabled={isDisabled}
      {...rest}
    >
      {icon && placement === "left" && <span className="mr-2">{icon}</span>}
      {!isLoading && children}
      {icon && placement === "right" && <span className="ml-2">{icon}</span>}
    </button>
  )
})

Button.displayName = "Button";

export default Button;
