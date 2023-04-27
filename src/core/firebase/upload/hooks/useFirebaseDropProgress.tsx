import { useStorageTask } from 'reactfire'
import { StorageReference, UploadTask, UploadTaskSnapshot } from '@firebase/storage'

export function useFirebaseDropProgress(
  uploadTask: UploadTask,
  storageRef: StorageReference,
): number {
  const { data: uploadProgress } = useStorageTask(uploadTask, storageRef)

  // Todo - This means the file has not started uploading at all.
  if (!uploadProgress) return 0

  const { bytesTransferred, totalBytes } = uploadProgress as UploadTaskSnapshot

  const percentComplete = Math.round(100 * (bytesTransferred / totalBytes))

  return percentComplete
}
