import styles from './Song.module.css'

interface Props {
  title: string
}

const Song = ({ title }: Props): JSX.Element => {
  return (
    <div className={styles.song}>
      <div className={styles.icon}>🎵</div>
      <div className={styles.title}>{title}</div>
    </div>
  )
}

export default Song
