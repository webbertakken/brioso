import Header from './panels/header/Header.tsx'
import Panels from './panels/Panels.tsx'
import SongsPanel from './panels/songs/SongsPanel.tsx'
import PartsPanel from './panels/parts/PartsPanel.tsx'

interface Props {}

const Practice = ({}: Props): JSX.Element => {
  return (
    <>
      <Header />
      <Panels>
        <SongsPanel />
        <PartsPanel />
      </Panels>
    </>
  )
}

export default Practice
