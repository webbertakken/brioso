import songStyles from './Song.module.css'
import styles from './AddSong.module.css'
import cx from 'classnames'
import { useFirestore, useUser } from 'reactfire'
import { collection, doc, DocumentReference, getDoc, setDoc } from 'firebase/firestore'
import { Inventory } from '../../../../model/inventory.ts'
import { SyntheticEvent, useCallback, useState } from 'react'
import { slugify } from '../../../../core/utils/slugify.ts'
import { useNotify } from '../../../../core/notifications/hooks/useNotify.tsx'

interface Props {}

const AddSong = ({}: Props): JSX.Element => {
  const notify = useNotify()
  const firestore = useFirestore()
  const { data: user } = useUser()
  const songsRef = collection(firestore, Inventory.getSongsPath(user!.uid))
  const [songName, setSongName] = useState('')

  const addSong = useCallback(
    async (name: string) => {
      const id = slugify(name)

      const createIfNotExists = async () => {
        const path = Inventory.getSongsPath(user!.uid)
        const documentReference = doc(firestore, path, id) as DocumentReference<SongData>
        const document = await getDoc(documentReference)

        if (document.exists()) throw new Error('Song already exists.')

        await setDoc(documentReference, { id, name })
      }

      await notify.promise(createIfNotExists(), {
        loading: 'Saving...',
        error: (error) => {
          console.error(error, error.stack)
          return `${error.message}`
        },
        success: `New song added.`,
      })
    },
    [firestore, notify, user],
  )

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    await addSong(songName)
    setSongName('')
  }

  return (
    <form className={cx(songStyles.song, styles.addSong)} target="" onSubmit={onSubmit}>
      <label htmlFor="songName" className={styles.icon}>
        ➕
      </label>
      <div className={styles.title}>
        <input
          className={styles.input}
          id="songName"
          placeholder="Add Song"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
      </div>
    </form>
  )
}

export default AddSong
