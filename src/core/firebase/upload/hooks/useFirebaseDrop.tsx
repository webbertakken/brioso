import { DropEvent, FileRejection } from 'react-dropzone'
import { useFirestore, useStorage, useUser } from 'reactfire'
import { useCallback } from 'react'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { useNotification } from '../../../notifications/hooks/useNotification.tsx'
import { slugify } from '../../../utils/slugify'
import { doc, DocumentReference, getDoc, setDoc } from 'firebase/firestore'
import { UploadTaskSnapshot, UploadTask, StorageReference } from '@firebase/storage'
import { isDevelopment } from '../../../utils/isProduction.tsx'

interface UploadMeta {
  bucket: string
  cacheControl?: string
  contentDisposition: string
  contentEncoding: string
  contentLanguage?: string
  contentType: string
  customMetadata?: never
  fullPath: string
  generation: string
  md5Hash: string
  metageneration: string
  name: string
  size: number
  timeCreated: string
  updated: string
}

export interface Upload {
  id: string
  name: string
  slug: string
  path: string
  lastModified: number
  size: number
  type: string
  metadata: UploadMeta
  state: string
  totalBytes: number
  url?: string
}

export type FileUpload = File & {
  preview: string
  storageRef: StorageReference
  uploadTask: UploadTask
  uploaded: boolean
}
/**
 * Handles the firebase side of uploads and saving the meta information.
 *
 * Example usage:
 *   import { useDropzone } from 'react-dropzone';
 *
 *   const onDrop = useFirebaseDrop(
 *     'questions/question1',
 *     'users/user1/questions/question1',
 *     (x) => dispatch(filesAccepted(x)),
 *     (x) => dispatch(uploadRegistered(x)),
 *     (x) => dispatch(uploadFailed(x)),
 *   );
 *
 *  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
 *    accept: ['image/*', 'video/*', 'audio/*'],
 *    onDrop,
 *  });
 */
export function useFirebaseDrop(
  fileUploadPath: string,
  databaseCollectionPath: string,
  acceptFilesCallback: (files: FileUpload[]) => void,
  uploadCompleteCallback: (file: File) => void,
  uploadFailedCallback: (file: File) => void,
) {
  const storage = useStorage()
  const { data: user } = useUser()
  const firestore = useFirestore()
  const notify = useNotification()

  const saveFileMeta = useCallback(
    async (file: File, uploadResult: UploadTaskSnapshot) => {
      const slug = slugify(uploadResult.metadata.name)

      const createIfNotExists = async () => {
        const documentReference = doc(
          firestore,
          databaseCollectionPath,
          slug,
        ) as DocumentReference<Upload>
        const document = await getDoc(documentReference)

        if (document.exists()) {
          throw new Error('File already exists.')
        }

        // Todo - check if path is set at all
        // @ts-ignore
        const { path, lastModified, name, size, type } = file
        const { metadata, state, totalBytes } = uploadResult

        const {
          bucket,
          // cacheControl,?
          contentDisposition = 'unknown',
          contentEncoding = 'unknown',
          // contentLanguage,?
          contentType = 'unknown',
          // customMetadata,?
          fullPath,
          generation,
          md5Hash = 'no-hash',
          metageneration,
          name: metaName,
          size: metaSize,
          timeCreated,
          // type: metaType,
          updated,
        } = metadata

        await setDoc(documentReference, {
          id: slug,
          slug,
          path,
          lastModified,
          name,
          size,
          type,
          metadata: {
            bucket,
            contentDisposition,
            contentEncoding,
            contentType,
            fullPath,
            generation,
            md5Hash,
            metageneration,
            name: metaName,
            size: metaSize,
            timeCreated,
            updated,
          },
          state,
          totalBytes,
        })
      }

      await notify.promise(createIfNotExists(), {
        loading: 'Uploading...',
        error: (error) => {
          console.error(error, error.stack)
          return `An error occurred. ${error.message}`
        },
        success: `Upload complete.`,
      })
    },
    [databaseCollectionPath, firestore, notify],
  )

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent): void => {
      if (isDevelopment()) console.log('drop event', event)

      fileRejections.map((rejection) =>
        console.error(
          `failed to upload: ${rejection.file.name}. ${rejection.errors
            .map((error) => error.message)
            .join(', ')}`,
        ),
      )

      acceptFilesCallback(
        acceptedFiles.map((file) => {
          const preview = URL.createObjectURL(file)

          const storageRef = ref(storage, `${fileUploadPath}/${file.name}`)
          const uploadTask = uploadBytesResumable(storageRef, file)
          const enhancedFile: FileUpload = Object.assign(file, {
            preview,
            uploadTask,
            storageRef,
            uploaded: false,
          })

          uploadTask.then(
            async (uploadResult) => {
              try {
                await saveFileMeta(file, uploadResult)
                await uploadCompleteCallback(file)
              } catch {
                await uploadFailedCallback(file)
              }
            },
            (error) => console.error(error),
          )

          return enhancedFile
        }),
      )
    },
    [
      storage,
      saveFileMeta,
      fileUploadPath,
      acceptFilesCallback,
      uploadCompleteCallback,
      uploadFailedCallback,
    ],
  )

  if (!user) throw new Error('User not logged in.')

  return onDrop
}
