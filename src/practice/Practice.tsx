import styles from './Practice.module.css'
import Logo from './panels/logo/Logo.tsx'
import Header from './panels/header/Header.tsx'
import Panels from './panels/Panels.tsx'
import SongsPanel from './panels/songs/SongsPanel.tsx'
import PartsPanel from './panels/parts/PartsPanel.tsx'

interface Props {}

const Practice = ({}: Props): JSX.Element => {
  return (
    <div className={styles.practice}>
      <Logo />
      <Header />
      <Panels>
        <SongsPanel />
        <PartsPanel />
      </Panels>
    </div>
  )
}

export default Practice
