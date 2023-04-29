import styles from './Part.module.css'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'

interface Props {
  id: string
  songId: string
  title: string
  muted?: boolean
  selected?: boolean
}

const Part = ({ id, songId, title, selected = false }: Props): JSX.Element => {
  const [mutedState, setMutedState] = useState(false)

  const toggleMuted = (e: SyntheticEvent) => {
    e.preventDefault()
    setMutedState(!mutedState)
  }

  return (
    <Link
      to={`/practice/${songId}/${id}`}
      className={cx(styles.part, { [styles.selected]: selected })}
    >
      <div onClick={toggleMuted}>{mutedState ? '🔇' : '🔊'}</div>
      <div className={styles.title}>{title}</div>
      <div>💬</div>
      <div>⚖️</div>
      <div>🎛️</div>
    </Link>
  )
}

export default Part
