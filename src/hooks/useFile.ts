
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { setContent, setFilename, setMarkdown, setShouldSave, deleteFile as deleteFile_Redux } from '@/redux/slices/markdownSlice';

export const useFile = () => {
  const filename = useAppSelector((state) => state.markdown.filename);
  const content = useAppSelector((state) => state.markdown.content);
  const shouldSave = useAppSelector((state) => state.markdown.shouldSave);

  const dispatch = useAppDispatch();

  const initiateFileSave = useCallback(() => {
    dispatch(setShouldSave(true))
  }, [dispatch])

  // TODO: Actually save the file
  const saveFile = useCallback(({filename, content}: {filename?: string, content?: string}) => {
    if (filename && content) {
      dispatch(setMarkdown({ filename, content }))
    } else if (content) {
      dispatch(setContent(content))
    } else if (filename) {
      dispatch(setFilename(filename))
    }

    dispatch(setShouldSave(false))

  }, [dispatch])

  // TODO: Actually delete the file
  const deleteFile = useCallback(() => {
    dispatch(deleteFile_Redux())
  }, [dispatch])


  return { filename, content, shouldSave, initiateFileSave, saveFile, deleteFile };
  
}
