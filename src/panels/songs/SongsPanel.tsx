import Panel from '../Panel.tsx'

interface Props {}

const SongsPanel = ({}: Props): JSX.Element => {
  return (
    <Panel title="Songs">
      <div>buttons</div>
      <ul>
        <li>song 1</li>
        <li>song 2</li>
        <li>song 3</li>
      </ul>
    </Panel>
  )
}

export default SongsPanel
