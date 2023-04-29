import Header from './panels/header/Header.tsx'
import Panels from './panels/Panels.tsx'
import SongsPanel from './panels/songs/SongsPanel.tsx'
import PartsPanel from './panels/parts/PartsPanel.tsx'
import { useUser } from 'reactfire'

interface Props {}

const Practice = ({}: Props): JSX.Element => {
  const { data: user } = useUser()

  if (!user) return <>must be logged in</>

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
