import { FC } from 'react'
import SideBar from './SideBar'
import { Separator } from '../ui/separator'
import FileRename from '../documentControl/FileRename'
import FileDelete from '../documentControl/FileDelete'
import FileSave from '../documentControl/FileSave'

interface NavBarProps {

}

const NavBar: FC<NavBarProps> = ({ }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-[72px] pr-4 flex items-center gap-6 bg-gray-700">
      <SideBar />
      <div className="w-full h-full py-4 flex items-center justify-between">
        <div className="h-full flex items-center gap-6">
          <h4 className="text-white font-normal tracking-[0.2em]">QuantumQuill</h4>
          <Separator orientation='vertical' />
          <FileRename docName='welcome.md' />
        </div>
        <div className="min-w-fit h-full flex items-center gap-6">
          <FileDelete />
          <FileSave />
        </div>
      </div>
    </div>
  )
}

export default NavBar