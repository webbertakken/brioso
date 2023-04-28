import styles from './Song.module.css'
import { Link } from 'react-router-dom'

interface Props {
  title: string
  id: string
}

const Song = ({ id, title }: Props): JSX.Element => {
  return (
    <Link to={`/practice/${id}`} className={styles.song}>
      <div className={styles.icon}>🎵</div>
      <div className={styles.title}>{title}</div>
    </Link>
  )
}

export default Song
