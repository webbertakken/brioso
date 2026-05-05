import { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import PageViewLogger from '../../core/firebase/tracking/PageViewLogger.tsx'
import ErrorBoundary from '../../core/react/display/ErrorBoundary.tsx'
import Logo from './logo/Logo.tsx'
import Menu from './Menu.tsx'
import styles from './RootLayout.module.css'

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
