import styles from './RootLayout.module.css'
import { Outlet } from 'react-router-dom'
import Logo from './logo/Logo.tsx'
import Menu from './Menu.tsx'

interface Props {
  children?: React.ReactNode
}

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <div className={styles.rootLayout}>
      <Logo />
      <Menu />
      {children || <Outlet />}
    </div>
  )
}

export default RootLayout
