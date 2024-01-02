import MarkdownWrapper from '@/components/markdown/EditorWrapper'
import { FC } from 'react'

interface EditPageProps {

}

const EditPage: FC<EditPageProps> = ({ }) => {
  return (
    <main className="min-h-dvh pt-[72px]">
      <MarkdownWrapper />
    </main>
  )
}

export default EditPage