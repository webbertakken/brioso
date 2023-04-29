import styles from './Song.module.css'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { useFirestore, useUser } from 'reactfire'
import { Inventory } from '../../../../model/inventory.ts'
import { doc, deleteDoc } from 'firebase/firestore'
import { useNotify } from '../../../../core/notifications/hooks/useNotify.tsx'
import { SyntheticEvent } from 'react'

interface Props {
  title: string
  id: string
  selected: boolean
}

const Song = ({ id, title, selected }: Props): JSX.Element => {
  const { data: user } = useUser()
  const firestore = useFirestore()
  const songRef = doc(firestore, Inventory.getSongDocPath(user!.uid, id))
  const notify = useNotify()

  const deleteSong = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (window.confirm(`This will permanently delete ${title} and all its parts. Are you sure?`)) {
      await notify.promise(deleteDoc(songRef), {
        loading: `deleting ${title}...`,
        error: (error) => `${error}`,
        success: `${title} was successfully deleted`,
      })
    }
  }

  return (
    <Link to={`/practice/${id}`} className={cx(styles.song, { [styles.selected]: selected })}>
      <div className={styles.icon}>🎵</div>
      <div className={styles.title}>{title}</div>
      <div className={cx(styles.icon, styles.delete)} onClick={deleteSong}>
        ❌
      </div>
    </Link>
  )
}

export default Song
