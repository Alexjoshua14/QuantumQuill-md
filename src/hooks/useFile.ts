
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { setContent, setFilename, setMarkdown, setShouldSave } from '@/redux/slices/markdownSlice';

export const useFile = () => {
  const filename = useAppSelector((state) => state.markdown.filename);
  const content = useAppSelector((state) => state.markdown.content);
  const shouldSave = useAppSelector((state) => state.markdown.shouldSave);

  const dispatch = useAppDispatch();

  const initiateFileSave = () => {
    dispatch(setShouldSave(true))
  }

  // TODO: Actually save the file
  const saveFile = ({filename, content}: {filename?: string, content?: string}) => {
    console.log("Saving file...")

    if (filename && content) {
      dispatch(setMarkdown({ filename, content }))
    } else if (content) {
      dispatch(setContent(content))
    } else if (filename) {
      dispatch(setFilename(filename))
    }

    dispatch(setShouldSave(false))
  }

  // TODO: Actually delete the file
  const deleteFile = () => {
    dispatch(setMarkdown({ filename: '', content: '' }))
  }


  return { filename, content, shouldSave, initiateFileSave, saveFile, deleteFile };
  
}
