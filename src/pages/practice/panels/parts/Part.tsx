import styles from './Part.module.css'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import { useFile } from '../../../../core/firebase/upload/hooks/useFile.tsx'
import { LoadingSpinner } from '../../../../core/firebase/auth/display/LoadingSpinner.tsx'

interface Props {
  id: string
  songId: string
  title: string
  muted?: boolean
  metadata: UploadMeta
  selected?: boolean
}

const Part = ({ id, songId, title, metadata, selected = false }: Props): JSX.Element => {
  const [mutedState, setMutedState] = useState(false)

  const { loading, file } = useFile(metadata.fullPath)
  // console.log(downloadUrl, meta)

  const toggleMuted = (e: SyntheticEvent) => {
    e.preventDefault()
    setMutedState(!mutedState)
  }

  return (
    <>
      <Link
        to={`/practice/${songId}/${id}`}
        className={cx(styles.part, { [styles.selected]: selected })}
      >
        <span onClick={toggleMuted}>{mutedState ? '🔇' : '🔊'}</span>
        <span className={styles.title}>{title}</span>
        <span>💬</span>
        <span>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div style={{ display: 'table-cell', columnSpan: 'all', width: '100%' }}>
              <audio src={file.downloadUrl} muted={mutedState} controls />
            </div>
          )}
        </span>
        <span>🎛️</span>
      </Link>
    </>
  )
}

export default Part
