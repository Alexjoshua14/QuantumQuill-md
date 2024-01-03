
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { setContent, setFilename, setMarkdown, setShouldSave, deleteFile as deleteFile_Redux } from '@/redux/slices/markdownSlice';
import { useSession } from 'next-auth/react';

interface File {
  updatedAt: string,
  filename: string,
  content: string
}


export const useFile = (docName?: string) => {
  // Check if user is logged in, if so their files should be synced with the database
  const { status } = useSession()


  const filename = useAppSelector((state) => state.markdown.filename);
  const content = useAppSelector((state) => state.markdown.content);
  const shouldSave = useAppSelector((state) => state.markdown.shouldSave);

  const dispatch = useAppDispatch();

  const initiateFileSave = useCallback(() => {
    dispatch(setShouldSave(true))
  }, [dispatch])

  // TODO: Actually save the file
  const saveFile = useCallback(({filename, content}: {filename?: string, content?: string}) => {
  // Can update logic in here to only save content if docName === filename
    if (docName === filename) {
      if (filename && content) {
        dispatch(setMarkdown({ filename, content }))
      } else if (content) {
        dispatch(setContent(content))
      } else if (filename) {
        dispatch(setFilename(filename))
      }

      dispatch(setShouldSave(false))
    }

    // If user is logged in, save file to database
    if (status === 'authenticated') {
      console.log("Would be saving file to database")
    }

  }, [dispatch, status, docName])

  const updateFileTitle = useCallback(({updatedFilename}: {updatedFilename: string}) => {
    if (docName === filename)
      dispatch(setFilename(updatedFilename))

    // If user is logged in, update file title in database
    if (status === 'authenticated') {
      console.log("Would be updating file title in database")
    }
    
  }, [dispatch, docName, filename,  status])

  // TODO: Actually delete the file
  const deleteFile = useCallback(() => {
    dispatch(deleteFile_Redux())

    // If user is logged in, delete file from database
    if (status === 'authenticated') {
      console.log("Would be deleting file from database")
    }
  }, [dispatch, status])

  const fetchFiles = useCallback(() => {
    // If user is logged in, fetch files from database
    if (status === 'authenticated') {
      console.log("Would be fetching files from database")
    }

  }, [status])

  const openFile = useCallback((filename: string, text?: string) => {
    // If user is logged in, fetch file from database
    if (status === 'authenticated') {
      console.log("Would be fetching file from database")
    }

    dispatch(setMarkdown({ filename, content: text}))
  }, [dispatch, status])


  return { filename, content, shouldSave, initiateFileSave, saveFile, deleteFile, fetchFiles, openFile };
  
}
