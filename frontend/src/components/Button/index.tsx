import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
}

export function Button({
  label,
  variant = "primary",
  type = "button",
  className = "",
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={`action-button action-button-${variant} ${className}`}
      type={type}
      {...buttonProps}
    >
      {label}
    </button>
  );
}
