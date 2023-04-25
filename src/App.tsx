import { Toaster } from 'react-hot-toast'
import { FirebaseAppProvider } from 'reactfire'
import FirebaseComponents from './core/firebase/FirebaseComponents.tsx'
import config from './config.tsx'
import Pages from './pages/Pages.tsx'

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={config.firebase}>
      <FirebaseComponents>
        <Toaster />
        <Pages />
      </FirebaseComponents>
    </FirebaseAppProvider>
  )
}

export default App
