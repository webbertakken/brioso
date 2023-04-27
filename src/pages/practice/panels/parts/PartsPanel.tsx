import Panel from '../Panel.tsx'
import Columns from './Columns.tsx'
import Part from './Part.tsx'
import PartControls from './PartControls.tsx'
import PanelHeader from '../PanelHeader.tsx'
import Dropzone from '../../upload/Dropzone.tsx'
import ErrorBoundary from '../../../../core/react/display/ErrorBoundary.tsx'
import { useUser } from 'reactfire'

interface Props {}

const PartsPanel = ({}: Props): JSX.Element => {
  const { data: user } = useUser()

  return (
    <Panel title="Controls" icon={'🔸'}>
      <PartControls />

      <PanelHeader title="Parts" icon={'🔸'} />
      <div style={{ display: 'table' }}>
        <Columns />
        <Part title={'voice 1'} />
        <Part
          title={
            'voice 2 Et harum quidem rerum facilis est et expedita distinctio nam libero tempore'
          }
          muted
        />
        <Part title={'voice 3'} />
        <Part title={'piano'} />
      </div>

      {user && (
        <ErrorBoundary>
          <Dropzone />
        </ErrorBoundary>
      )}
    </Panel>
  )
}

export default PartsPanel
