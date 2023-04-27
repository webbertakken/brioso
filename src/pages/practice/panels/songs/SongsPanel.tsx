import Panel from '../Panel.tsx'
import Song from './Song.tsx'
import { Link, useParams } from 'react-router-dom'

interface Props {}

const SongsPanel = ({}: Props): JSX.Element => {
  const { songId = 'No song selected' } = useParams()

  return (
    <Panel title="Songs" icon={'🎵'}>
      <p>{songId}</p>
      <Link to={'/practice/every-time'}>
        <Song title="Every Time I look at You - C Maj" />
      </Link>
      <Link to={'/practice/au-fond'}>
        <Song title="Au Fond Du Temple Saint" />
      </Link>
      <Link to={'/practice/magic-dragon'}>
        <Song title="Puff The Magic Dragon" />
      </Link>
    </Panel>
  )
}

export default SongsPanel
