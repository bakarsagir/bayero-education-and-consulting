import { Link } from 'react-router-dom'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  useAlternative?: boolean
}

export function Logo({ variant = 'dark', size = 'md', useAlternative = false }: LogoProps) {
  const textColor = variant === 'light' ? 'text-brand-white' : 'text-brand-black'
  const textSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }[size]

  const imageSize = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  }[size]

  return (
    <Link to="/" className={`font-montserrat font-bold ${textColor} ${textSize} flex items-center gap-2`}>
      <img 
        src={useAlternative ? '/images/Logo2.png' : '/images/Logo1.png'} 
        alt="Bayero Education & Consulting Logo" 
        className={`${imageSize} w-auto`}
      />
      <span className="sr-only">Bayero Education & Consulting</span>
    </Link>
  )
}