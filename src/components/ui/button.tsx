import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-brand-primary text-brand-dark hover:bg-brand-secondary focus-visible:ring-brand-dark': variant === 'primary',
            'bg-brand-dark text-brand-light hover:bg-brand-dark-75 focus-visible:ring-brand-dark': variant === 'secondary',
            'border border-brand-dark bg-transparent hover:bg-brand-dark hover:text-brand-light focus-visible:ring-brand-dark': variant === 'outline',
            'hover:bg-brand-dark-25 hover:text-brand-dark focus-visible:ring-brand-dark': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-10 px-6 text-base': size === 'md',
            'h-11 px-8 text-lg': size === 'lg'
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }