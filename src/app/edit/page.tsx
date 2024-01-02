
import dynamic from 'next/dynamic'
import { FC } from 'react'

interface EditPageProps {

}

const EditPage: FC<EditPageProps> = ({ }) => {
  const EditorWrapper = dynamic(() => import('@/components/markdown/EditorWrapper'), { ssr: false })

  return (
    <main className="min-h-dvh pt-[72px]">
      <EditorWrapper />
    </main>
  )
}

export default EditPage