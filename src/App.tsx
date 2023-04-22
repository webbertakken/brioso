import './App.css'
import Header from './panels/header/Header.tsx'
import SongsPanel from './panels/songs/SongsPanel.tsx'
import Panels from './panels/Panels.tsx'
import Logo from './panels/logo/Logo.tsx'

function App() {
  return (
    <>
      <Logo />
      <Header />
      <Panels>
        <SongsPanel />
        <SongsPanel />
        <SongsPanel />
        <SongsPanel />
      </Panels>
    </>
  )
}

export default App
