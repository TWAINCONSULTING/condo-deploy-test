import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  className = '',
  asChild = false,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors active:scale-[0.98]'
  
  const variants = {
    primary: 'bg-blue-600 text-white lg:hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-gray-100 text-gray-900 lg:hover:bg-gray-200 active:bg-gray-300',
    outline: 'border border-gray-300 text-gray-700 lg:hover:bg-gray-50 active:bg-gray-100'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  const Comp = asChild ? 'span' : 'button'

  return (
    <Comp
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  )
})

Button.displayName = 'Button'