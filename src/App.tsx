import { Toaster } from 'react-hot-toast'
import { FirebaseAppProvider } from 'reactfire'
import FirebaseComponents from './core/firebase/FirebaseComponents.tsx'
import config from './config.tsx'
import Pages from './pages/Pages.tsx'
import ErrorBoundary from './core/react/display/ErrorBoundary.tsx'
import PageViewLogger from './core/firebase/tracking/PageViewLogger.tsx'
// import PageViewLogger from './core/firebase/tracking/PageViewLogger.tsx'

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

        <ErrorBoundary>
          <PageViewLogger />
        </ErrorBoundary>
      </FirebaseComponents>
    </FirebaseAppProvider>
  )
}

export default App
