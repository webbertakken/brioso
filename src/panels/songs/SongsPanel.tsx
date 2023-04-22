import Panel from '../Panel.tsx'
import Song from './Song.tsx'

interface Props {}

const SongsPanel = ({}: Props): JSX.Element => {
  return (
    <Panel title="Songs" icon={'🎵'}>
      <Song />
      <Song />
      <Song />
    </Panel>
  )
}

export default SongsPanel
