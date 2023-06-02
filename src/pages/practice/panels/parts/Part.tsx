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
  getRefMap: () => Map<string, HTMLAudioElement>
}

const Part = ({
  id,
  songId,
  title,
  metadata,
  selected = false,
  getRefMap,
  muted,
}: Props): JSX.Element => {
  const [mutedState, setMutedState] = useState(muted)
  const { loading, file } = useFile(metadata.fullPath)

  const parentRefIndex = (node: HTMLAudioElement | null) => {
    node ? getRefMap().set(id, node) : getRefMap().delete(id)
  }

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
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <span>💬</span>
            <span>
              ⚖️
              <div style={{ display: 'table-cell', columnSpan: 'all', width: '100%' }}>
                <audio
                  ref={parentRefIndex}
                  src={file.downloadUrl}
                  muted={mutedState} /*controls*/
                />
              </div>
            </span>
            <span>🎛️</span>
          </>
        )}
      </Link>
    </>
  )
}

export default Part
