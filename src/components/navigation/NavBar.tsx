import { FC, Suspense } from 'react'
import SideBar from './SideBar'
import { Separator } from '../ui/separator'
import FileTitle from '../documentControl/FileTitle'
import FileDelete from '../documentControl/FileDelete'
import { PlaceholderFileSave } from '../documentControl/FileSave'
import FileList from './FileList'
import dynamic from 'next/dynamic'

interface NavBarProps {

}

const NavBar: FC<NavBarProps> = ({ }) => {

  const DynamicSaveButton =
    dynamic(
      () => import('../documentControl/FileSave'),
      {
        ssr: false,
        loading: () => <PlaceholderFileSave />
      })

  return (
    <div className="fixed top-0 left-0 w-full h-[72px] pr-4 flex items-center gap-6 bg-gray-700">
      <SideBar>
        <FileList />
      </SideBar>
      <div className="w-full h-full py-4 flex items-center justify-between">
        <div className="h-full flex items-center gap-6">
          <h4 className="hidden sm:block text-white font-normal tracking-[0.2em]">QuantumQuill</h4>
          <Separator orientation='vertical' className='hidden sm:block' />
          <FileTitle docName='welcome.md' variant='main' />
        </div>
        <div className="min-w-fit h-full flex items-center gap-6">
          <FileDelete />

          <DynamicSaveButton />

        </div>
      </div>
    </div>
  )
}

export default NavBar