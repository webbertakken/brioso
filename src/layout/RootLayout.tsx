import styles from './RootLayout.module.css'
import { Outlet } from 'react-router-dom'
import Logo from './logo/Logo.tsx'
import Menu from './Menu.tsx'
import ErrorBoundary from '../core/react/display/ErrorBoundary.tsx'
import PageViewLogger from '../core/firebase/tracking/PageViewLogger.tsx'
import { PropsWithChildren } from 'react'

const RootLayout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <div className={styles.rootLayout}>
      <ErrorBoundary>
        <Logo />
        <Menu />
        {children || <Outlet />}
      </ErrorBoundary>

      <ErrorBoundary>
        <PageViewLogger />
      </ErrorBoundary>
    </div>
  )
}

export default RootLayout
