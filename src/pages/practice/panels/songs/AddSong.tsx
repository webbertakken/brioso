import songStyles from './Song.module.css'
import styles from './AddSong.module.css'
import cx from 'classnames'

interface Props {}

const AddSong = ({}: Props): JSX.Element => {
  return (
    <div className={cx(songStyles.song, styles.addSong)}>
      <label htmlFor="songName" className={styles.icon}>
        ➕
      </label>
      <div className={styles.title}>
        <input className={styles.input} id="songName" placeholder="Add Song" />
      </div>
    </div>
  )
}

export default AddSong
