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

interface Upload {
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
