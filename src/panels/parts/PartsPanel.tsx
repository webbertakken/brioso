import Panel from '../Panel.tsx'

interface Props {}

const PartsPanel = ({}: Props): JSX.Element => {
  return (
    <Panel title="Parts" icon={'🔸'}>
      <ul>
        <li>Part 1</li>
        <li>Part 2</li>
        <li>Part 3</li>
        <li>Part 4</li>
      </ul>
    </Panel>
  )
}

export default PartsPanel
