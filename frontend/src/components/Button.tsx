import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode
  variant?: ButtonVariant
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ label, variant = 'primary', type = 'button', ...buttonProps }: ButtonProps) {
  return (
    <button className={`action-button action-button-${variant}`} type={type} {...buttonProps}>
      {label}
    </button>
  )
}