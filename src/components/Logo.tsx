import { Link } from 'react-router-dom'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-brand-light' : 'text-brand-dark'
  const textSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }[size]

  return (
    <Link to="/" className={`font-display font-bold ${textColor} ${textSize} flex items-center gap-2`}>
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <rect width="32" height="32" rx="8" fill="#f3cf23"/>
        <path d="M8 8H24V12H8V8Z" fill={variant === 'light' ? '#ffffff' : '#000000'}/>
        <path d="M12 14H20V18H12V14Z" fill={variant === 'light' ? '#ffffff' : '#000000'}/>
        <path d="M16 20H24V24H16V20Z" fill={variant === 'light' ? '#ffffff' : '#000000'}/>
      </svg>
      <span>Bayero Education</span>
    </Link>
  )
}