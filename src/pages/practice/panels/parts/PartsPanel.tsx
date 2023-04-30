import Panel from '../Panel.tsx'
import Part from './Part.tsx'
import PartControls from './PartControls.tsx'
import PanelHeader from '../PanelHeader.tsx'
import Dropzone from './upload/Dropzone.tsx'
import ErrorBoundary from '../../../../core/react/display/ErrorBoundary.tsx'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { useParams } from 'react-router-dom'
import Parts from './Parts.tsx'
import { collection } from 'firebase/firestore'
import { Inventory } from '../../../../model/inventory.ts'
import { CollectionReference } from 'firebase/firestore'

interface Props {}

const PartsPanel = ({}: Props): JSX.Element => {
  const { data: user } = useUser()
  const { songId = 'No song selected', partId = '' } = useParams()

  const firestore = useFirestore()
  const partsRef = collection(
    firestore,
    Inventory.getPartsPath(user!.uid, songId),
  ) as CollectionReference<PartData>
  const { data: parts } = useFirestoreCollectionData(partsRef)

  return (
    <Panel title="Controls" icon={'🔸'}>
      <PartControls />

      <PanelHeader title="Parts" icon={'🔸'} />
      <Parts>
        {parts
          // Sort by name
          ?.sort(({ name: a }, { name: b }) => a.localeCompare(b))
          // Vocals before instruments
          .sort(({ isInstrument: a }, { isInstrument: b }) => (a === b ? 0 : a ? 1 : -1))
          // Known parts after unidentified parts
          .sort(({ isKnownPart: a }, { isKnownPart: b }) => (a === b ? 0 : a ? 1 : -1))
          // Render
          .map(({ id, name }) => (
            <Part key={id} id={id} songId={songId} selected={id === partId} title={name} />
          ))}
      </Parts>

      {user && (
        <ErrorBoundary>
          <Dropzone />
        </ErrorBoundary>
      )}
    </Panel>
  )
}

export default PartsPanel
