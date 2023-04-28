// noinspection DuplicatedCode

import { useEffect, useMemo, useReducer } from 'react'
import { useDropzone } from 'react-dropzone'
import cx from 'classnames'
import {
  FileUpload,
  useFirebaseDrop,
} from '../../../core/firebase/upload/hooks/useFirebaseDrop.tsx'
import AudioPart from '../panels/songs/AudioPart.tsx'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Inventory } from '../../../model/inventory.ts'
import { useParams } from 'react-router-dom'
import { useUser } from 'reactfire'

const initialState: FileUpload[] = []

const fileUploadSlice = createSlice({
  name: 'fileUploads',
  initialState,
  reducers: {
    acceptFiles: (state, action: PayloadAction<Array<FileUpload>>) => {
      state.push(...action.payload.map((member) => Object.assign(member, { uploaded: false })))
    },
    // uploadComplete: (state, action: PayloadAction<FileUpload>) => {
    //   return state.map((member) => {
    //     if (member.name === action.payload) {
    //       delete member.uploadTask;
    //       member.uploaded = true;
    //     }
    //     return member;
    //   });
    // },
    uploadRegistered: (state, action: PayloadAction<File>) => {
      return state.filter((member) => member.name !== action.payload.name)
    },
    uploadFailed: (state, action: PayloadAction<File>) => {
      // We could show errors, but for now just silently remove them.
      return state.filter((member) => member.name !== action.payload.name)
    },
  },
})

const { acceptFiles, uploadRegistered, uploadFailed } = fileUploadSlice.actions

interface Props {
  className?: string
  dropAreaClassName?: string
  previewsClassName?: string
}

const Dropzone = ({ className, dropAreaClassName, previewsClassName }: Props) => {
  const [files, dispatch] = useReducer(fileUploadSlice.reducer, initialState)
  const { data: user } = useUser()
  const { songId } = useParams()

  const onDrop = useFirebaseDrop(
    Inventory.getPartsFilesPath(user!.uid, songId!),
    Inventory.getPartsDatabasePath(user!.uid, songId!),
    (x) => dispatch(acceptFiles(x)),
    (x) => dispatch(uploadRegistered(x)),
    (x) => dispatch(uploadFailed(x)),
  )

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: ['image/*', 'video/*', 'audio/*'],
    onDrop,
  })

  const previews = useMemo(
    () =>
      files.length > 0 ? (
        <aside
          className={cx(
            'p-1 grid grid-cols-1 gap-1 justify-items-stretch transition-all',
            previewsClassName,
          )}
        >
          {files.map((file, index) => {
            const { type, name, preview, uploaded } = file

            if (type.startsWith('audio') || type.startsWith('video')) {
              return <AudioPart key={index} uploaded={uploaded} displayAs={'upload'} file={file} />
            }

            return (
              <div className="preview" key={index}>
                <img alt={name} src={preview} />
              </div>
            )
          })}
        </aside>
      ) : null,
    [files, previewsClassName],
  )

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      for (const file of files) URL.revokeObjectURL(file.preview)
    },
    [files],
  )

  return (
    <section className={className}>
      <div
        {...getRootProps()}
        className={cx(dropAreaClassName, 'flex flex-grow flex-col text-center transition-all', {
          'border-[#2196f3] border-opacity-100 bg-white bg-opacity-5': isDragActive,
          'border-[#00e676] border-opacity-100 bg-green bg-opacity-5': isDragAccept,
          // Todo - update so it's not always set to true
          // 'border-[#ff1744] border-opacity-100 bg-red bg-opacity-5': isDragReject,
        })}
      >
        <input {...getInputProps()} />
        <p>Drag and drop to upload. Click to browse.</p>
      </div>

      {previews}
    </section>
  )
}

export default Dropzone
