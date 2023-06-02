import styles from './PartControls.module.css'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'

interface Props {
  getRefMap: () => Map<string, HTMLAudioElement>
  songId: string
  partId: string
  parts: PartData[]
}

const PartControls = ({ getRefMap, songId, partId, parts }: Props): JSX.Element => {
  const [myVolume, setMyVolume] = useState<number>(0.5)
  const [otherVolume, setOtherVolume] = useState<number>(0.5)

  const setVolume = useMemo(
    () => (partId: string, volume: number) => {
      const audio = getRefMap().get(partId)
      if (audio) audio.volume = volume
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getRefMap, parts],
  )

  const otherParts = useMemo(() => parts?.filter(({ id }) => id !== partId), [partId, parts])

  useEffect(() => {
    // My volume
    if (partId) setVolume(partId, myVolume)

    // Other parts volume
    if (otherParts?.length) otherParts.forEach(({ id }) => setVolume(id, otherVolume))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partId, getRefMap, parts, setVolume])

  const updateMyVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setMyVolume(Number(e.target.value))
    setVolume(partId, Number(e.target.value))
  }

  const updateOtherVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setOtherVolume(Number(e.target.value))
    otherParts.forEach(({ id }) => setVolume(id, Number(e.target.value)))
  }

  const myPart = parts?.find(({ id }) => id === partId)

  return (
    <div className={styles.partControls}>
      <div className={styles.row}>
        <div className={styles.title}>{myPart?.name || '(select your part)'}</div>
        <div className={styles.controls}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={myVolume}
            onChange={updateMyVolume}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.title}>Other parts</div>
        <div className={styles.controls}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={otherVolume}
            onChange={updateOtherVolume}
          />
        </div>
      </div>
    </div>
  )
}

export default PartControls
