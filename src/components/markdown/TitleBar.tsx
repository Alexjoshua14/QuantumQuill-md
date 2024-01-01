import { cn } from '@/lib/utils'
import { FC, HTMLAttributes } from 'react'

interface TitleBarProps extends HTMLAttributes<HTMLDivElement> {
  title: string
}

const TitleBar: FC<TitleBarProps> = ({ title, className, ...props }) => {
  return (
    <div className={cn("w-full min-h-10 h-10 px-2 flex items-center bg-secondary cursor-pointer", className)} {...props}>
      <h2 className="app-heading-secondary pointer-events-none select-none">
        {title}
      </h2>
    </div>
  )
}

export default TitleBar