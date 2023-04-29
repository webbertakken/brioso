import styles from './Song.module.css'
import { Link } from 'react-router-dom'
import cx from 'classnames'

interface Props {
  title: string
  id: string
  selected: boolean
}

const Song = ({ id, title, selected }: Props): JSX.Element => {
  return (
    <Link to={`/practice/${id}`} className={cx(styles.song, { [styles.selected]: selected })}>
      <div className={styles.icon}>🎵</div>
      <div className={styles.title}>{title}</div>
    </Link>
  )
}

export default Song
