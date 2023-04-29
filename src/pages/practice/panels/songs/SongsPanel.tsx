import Panel from '../Panel.tsx'
import Song from './Song.tsx'
import { useParams } from 'react-router-dom'
import { collection } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { Inventory } from '../../../../model/inventory.ts'
import AddSong from './AddSong.tsx'
import { CollectionReference } from 'firebase/firestore'

interface Props {}

const SongsPanel = ({}: Props): JSX.Element => {
  const { data: user } = useUser()
  const { songId = 'No song selected' } = useParams()

  const firestore = useFirestore()
  const path = Inventory.getSongsPath(user!.uid)
  const songsRef = collection(firestore, path) as CollectionReference<SongData>
  const { data: songs } = useFirestoreCollectionData(songsRef)

  return (
    <Panel title="Songs" icon={'🎵'}>
      {songs?.map(({ id, name }) => (
        <Song key={id} id={id} selected={id === songId} title={name} />
      ))}
      <AddSong />
    </Panel>
  )
}

export default SongsPanel
