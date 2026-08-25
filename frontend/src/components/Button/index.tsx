import type { ButtonHTMLAttributes, ReactNode } from "react";

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
  disabled,
  ...buttonProps
}: ButtonProps) {
  const baseClasses =
    "inline-block no-underline border-0 rounded-full py-[13px] px-[20px] font-bold transition-all duration-180";

  const cursorClasses = disabled
    ? "cursor-not-allowed opacity-75 bg-[#e2e8f0] text-[#64748b] border-[#cbd5e1] shadow-none"
    : "cursor-pointer hover:-translate-y-[1px]";

  const variantClasses = {
    primary:
      "text-white bg-gradient-to-br from-[#ff8c1a] to-[#ff6b2f] shadow-[0_12px_24px_rgba(255,111,31,0.3)]",
    secondary:
      "text-[#10233b] bg-[#f0f4f8] border border-[rgba(82,143,191,0.15)] hover:bg-[#e1eaf2] hover:shadow-[0_8px_16px_rgba(16,35,59,0.08)]",
    ghost:
      "text-inherit bg-transparent hover:bg-[rgba(255,255,255,0.1)]",
  };

  return (
    <button
      className={`${baseClasses} ${disabled ? cursorClasses : `${variantClasses[variant]} cursor-pointer hover:-translate-y-[1px]`} ${className}`}
      type={type}
      disabled={disabled}
      {...buttonProps}
    >
      {label}
    </button>
  );
}

