import styles from './Song.module.css'

interface Props {}

const Song = ({}: Props): JSX.Element => {
  return (
    <div className={styles.song}>
      <div className={styles.icon}>🎵</div>
      <div className={styles.title}>Every Time I look at You - C Maj</div>
    </div>
  )
}

export default Song
