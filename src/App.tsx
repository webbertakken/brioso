import { Toaster } from 'react-hot-toast'
import { FirebaseAppProvider } from 'reactfire'
import config from './config.tsx'
import FirebaseComponents from './core/firebase/FirebaseComponents.tsx'
import ErrorBoundary from './core/react/display/ErrorBoundary.tsx'
import Pages from './pages/Pages.tsx'

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={config.firebase}>
      <FirebaseComponents>
        <ErrorBoundary>
          <Toaster />
        </ErrorBoundary>

        <ErrorBoundary>
          <Pages />
        </ErrorBoundary>
      </FirebaseComponents>
    </FirebaseAppProvider>
  )
}

export default App
