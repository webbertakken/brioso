import Panel from '../Panel.tsx'
import Columns from './Columns.tsx'
import Part from './Part.tsx'
import PartControls from './PartControls.tsx'
import PanelHeader from '../PanelHeader.tsx'

interface Props {}

const PartsPanel = ({}: Props): JSX.Element => {
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
    </Panel>
  )
}

export default PartsPanel
