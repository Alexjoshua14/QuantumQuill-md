import { FC } from 'react'
import FileTitle from '../documentControl/FileTitle'

interface FileListProps {

}

interface File {
  createdAt: string
  name: string
  content: string
}

const FileList: FC<FileListProps> = ({ }) => {
  const files = require('@/data/data.json')

  return (
    <ul className="flex flex-col gap-4">
      {
        files.map((file: File) => (
          <li key={`${file.name}-${file.createdAt}`}>
            <button
              className="group ">
              <FileTitle docName={file.name} content={file.content} variant='secondary' />
            </button>
          </li>
        ))
      }
    </ul>
  )
}

export default FileList