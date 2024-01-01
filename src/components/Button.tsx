import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
}

const Button: FC<ButtonProps> = ({ text, icon, className, ...props }) => {
  return (
    <button className={cn(`px-3 py-2 rounded flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-300 text-white font-light`, className)} {...props}>
      {icon && <Image src={icon.src} alt={icon.alt} width={icon.width ?? 16} height={icon.height ?? 16} className="object-contain" />}
      {text}
    </button>
  )
}

export default Button