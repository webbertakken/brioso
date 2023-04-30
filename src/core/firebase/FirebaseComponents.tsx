import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import {
  AppCheckProvider,
  FirestoreProvider,
  AuthProvider,
  useFirebaseApp,
  StorageProvider,
  useInitPerformance,
  AnalyticsProvider,
} from 'reactfire'
import config from '../../config.tsx'
import { isProduction } from '../utils/isProduction.tsx'
import { FirebaseApp } from '@firebase/app'
import { PropsWithChildren } from 'react'

const ProductionOnlyAppCheck = ({ children, app }: PropsWithChildren<{ app: FirebaseApp }>) =>
  isProduction() ? (
    <AppCheckProvider
      sdk={initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(config.captchaKey),
        isTokenAutoRefreshEnabled: true,
      })}
    >
      {children}
    </AppCheckProvider>
  ) : (
    <>{children}</>
  )

function FirebaseComponents({ children }: PropsWithChildren) {
  // a parent component contains a `FirebaseAppProvider`
  const app = useFirebaseApp()

  // initialize with the normal Firebase SDK functions
  const firestore = getFirestore(app)
  const auth = getAuth(app)
  const storage = getStorage(app)
  const analytics = getAnalytics(app)

  // use emulator in development
  if (process.env.NODE_ENV !== 'production') {
    connectFirestoreEmulator(firestore, 'localhost', 8080)
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectStorageEmulator(storage, 'localhost', 9199)
  }

  useInitPerformance(
    async (app) => {
      const { getPerformance } = await import('firebase/performance')
      return getPerformance(app)
    },
    { suspense: false }, // false because we don't want to stop render while we wait for perf
  )

  // any child components will be able to use `useUser`, `useDatabaseObjectData`, etc
  return (
    <ProductionOnlyAppCheck app={app}>
      <AnalyticsProvider sdk={analytics}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestore}>
            <StorageProvider sdk={storage}>{children}</StorageProvider>
          </FirestoreProvider>
        </AuthProvider>
      </AnalyticsProvider>
    </ProductionOnlyAppCheck>
  )
}

export default FirebaseComponents
