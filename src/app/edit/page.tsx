import MarkdownWrapper from '@/components/markdown/MarkdownWrapper'
import { FC } from 'react'

interface EditPageProps {

}

const EditPage: FC<EditPageProps> = ({ }) => {
  return (
    <main className="flex min-h-screen py-[72px] bg-orange-500">
      <MarkdownWrapper />
    </main>
  )
}

export default EditPage