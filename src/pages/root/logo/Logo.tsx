import styles from './Logo.module.css'
import { ReactComponent as LogoSvg } from '../../../assets/logo.svg'

const Logo = (): JSX.Element => {
  return (
    <div className={styles.logo}>
      <div>
        <LogoSvg height={54} />
      </div>
      <div>Brioso</div>
    </div>
  )
}

export default Logo
