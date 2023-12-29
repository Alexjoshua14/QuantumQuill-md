import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: {
    src: string
    alt: string
  }
}

const Button: FC<ButtonProps> = ({ text, icon, className, ...props }) => {
  return (
    <button className={cn(`px-4 py-2 rounded bg-orange-500 hover:bg-orange-300 text-white`, className)} {...props}>
      {icon && <Image src={icon.src} alt={icon.alt} className="mr-2" />}
      {text}
    </button>
  )
}

export default Button