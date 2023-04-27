import styles from './RootLayout.module.css'
import { Outlet } from 'react-router-dom'
import Logo from './logo/Logo.tsx'
import Menu from './Menu.tsx'
import ErrorBoundary from '../../core/react/display/ErrorBoundary.tsx'

interface Props {
  children?: React.ReactNode
}

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <div className={styles.rootLayout}>
      <ErrorBoundary>
        <Logo />
        <Menu />
        {children || <Outlet />}
      </ErrorBoundary>
    </div>
  )
}

export default RootLayout
