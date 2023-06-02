import Panel from '../Panel.tsx'
import Part from './Part.tsx'
import PartControls from './PartControls.tsx'
import PanelHeader from '../PanelHeader.tsx'
import Dropzone from './upload/Dropzone.tsx'
import ErrorBoundary from '../../../../core/react/display/ErrorBoundary.tsx'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { useParams } from 'react-router-dom'
import Parts from './Parts.tsx'
import { collection, CollectionReference } from 'firebase/firestore'
import { Inventory } from '../../../../model/inventory.ts'
import { useRef } from 'react'
import { SharedControls } from './SharedControls.tsx'

interface Props {}

const PartsPanel = ({}: Props): JSX.Element => {
  const { data: user } = useUser()
  const { songId = 'No song selected', partId = '' } = useParams()

  const firestore = useFirestore()
  const partsCollectionRef = collection(
    firestore,
    Inventory.getPartsPath(user!.uid, songId),
  ) as CollectionReference<PartData>
  const { data: parts } = useFirestoreCollectionData(partsCollectionRef)

  /**
   * A map of part IDs to their audio elements.
   * @see https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback
   */
  const partsRef = useRef<Map<string, HTMLAudioElement> | null>(null)
  const getRefMap = () => {
    if (!partsRef.current) partsRef.current = new Map()

    return partsRef.current
  }

  return (
    <Panel title="Controls" icon={'🔸'}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <PartControls getRefMap={getRefMap} songId={songId} partId={partId} parts={parts} />
        <SharedControls getRefMap={getRefMap} songId={songId} partId={partId} parts={parts} />
      </div>

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
          .map(({ id, name, metadata, isKnownPart }) => (
            <Part
              key={id}
              getRefMap={getRefMap}
              id={id}
              songId={songId}
              selected={id === partId}
              muted={!isKnownPart}
              title={name}
              metadata={metadata}
            />
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
