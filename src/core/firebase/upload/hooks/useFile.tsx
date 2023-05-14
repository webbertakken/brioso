import { useStorage } from 'reactfire'
import { ref, getDownloadURL, getMetadata, FullMetadata } from 'firebase/storage'
import { useEffect, useState } from 'react'

export function useFile(fileUploadFullPath: string) {
  const storage = useStorage()
  const storageRef = ref(storage, `${fileUploadFullPath}`)

  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<{ downloadUrl: string; meta: FullMetadata }>({
    downloadUrl: '',
    meta: {} as FullMetadata,
  })

  useEffect(() => {
    const loadFile = async () => {
      setLoading(true)
      const [downloadUrl, meta] = await Promise.all([
        getDownloadURL(storageRef),
        getMetadata(storageRef),
      ])
      setFile({ downloadUrl, meta })
    }

    loadFile()
      .catch(console.log)
      .finally(() => setLoading(false))

    // the ref changes during the lifetime of the component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUploadFullPath])

  return { loading, file }
}
