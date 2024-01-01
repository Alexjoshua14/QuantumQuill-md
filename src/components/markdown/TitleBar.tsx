import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'

interface TitleBarProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  toggleShowPreview?: () => void
}

const TitleBar: FC<TitleBarProps> = ({ title, toggleShowPreview, className, ...props }) => {
  return (
    <div className={cn("w-full min-h-10 h-10 px-2 flex items-center bg-secondary cursor-pointer", className)} {...props}>
      <h2 className="app-heading-secondary pointer-events-none select-none">
        {title}
      </h2>
      {
        toggleShowPreview &&
        <Image
          src={`/assets/icon-${title === "Preview" ? 'hide' : 'show'}-preview.svg`}
          alt="Show Preview"
          width={24}
          height={24}
          onClick={toggleShowPreview}
          className="h-auto ml-auto object-contain" />
      }
    </div>
  )
}

export default TitleBar