import styles from './SharedControls.module.css'
import { useEffect, useState } from 'react'
import { useNotify } from '../../../../core/notifications/hooks/useNotify.tsx'

interface Props {
  getRefMap: () => Map<string, HTMLAudioElement> | null
  partId: string
  parts: PartData[]
  songId: string
}

export const SharedControls = ({ getRefMap, songId, parts, partId }: Props): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false)
  const notify = useNotify()

  const setSharedIsPlaying = (newIsPlayingState: boolean) => {
    setIsPlaying(newIsPlayingState)
    Promise.all(
      parts
        .map(({ id }) => getRefMap()?.get(id))
        .filter(Boolean)
        .map((audio) => {
          return newIsPlayingState ? audio?.play() : audio?.pause()
        }),
    ).catch((err) => notify.error('Failed to play a track'))
  }

  useEffect(() => {
    if (parts?.length) setSharedIsPlaying(isPlaying)
  })

  return (
    <div className={styles.globalControls}>
      {parts?.length && (
        <button className={styles.button} onClick={() => setSharedIsPlaying(!isPlaying)}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      )}
    </div>
  )
}
