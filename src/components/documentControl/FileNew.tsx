import { FC } from 'react'
import Button from '../Button'
import { useFile } from '@/hooks/useFile'

interface FileNewProps {

}

const FileNew: FC<FileNewProps> = ({ }) => {
  const { openFile } = useFile()

  const handleNewFile = () => {
    openFile("untitled-1.md", "")
  }

  return (
    <Button className="w-full grid place-content-center" text="+ New Document" onClick={handleNewFile} />
  )
}

export default FileNew