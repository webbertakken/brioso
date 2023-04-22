import Panel from '../Panel.tsx'
import Song from './Song.tsx'

interface Props {}

const SongsPanel = ({}: Props): JSX.Element => {
  return (
    <Panel title="Songs" icon={'🎵'}>
      <Song title="Every Time I look at You - C Maj" />
      <Song title="Au Fond Du Temple Saint" />
      <Song title="Puff The Magic Dragon" />
    </Panel>
  )
}

export default SongsPanel
