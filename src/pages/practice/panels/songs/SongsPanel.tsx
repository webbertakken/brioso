import Panel from '../Panel.tsx'
import Song from './Song.tsx'
import { useParams } from 'react-router-dom'
import { collection } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { Inventory } from '../../../../model/inventory.ts'
import AddSong from './AddSong.tsx'

interface Props {}

const SongsPanel = ({}: Props): JSX.Element => {
  const { data: user } = useUser()
  const { songId = 'No song selected' } = useParams()

  const firestore = useFirestore()
  const songsRef = collection(firestore, Inventory.getSongsPath(user!.uid))
  const { data: songs } = useFirestoreCollectionData(songsRef)

  console.log(songs)
  return (
    <Panel title="Songs" icon={'🎵'}>
      {songs?.map(({ id, name }) => (
        <Song key={id} id={id} title={name} />
      ))}
      <AddSong />
    </Panel>
  )
}

export default SongsPanel
