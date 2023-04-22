import Panel from '../Panel.tsx'
import Columns from './Columns.tsx'
import Part from './Part.tsx'

interface Props {}

const PartsPanel = ({}: Props): JSX.Element => {
  return (
    <Panel title="Parts" icon={'🔸'}>
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
