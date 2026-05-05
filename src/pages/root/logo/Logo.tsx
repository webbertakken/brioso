import { ReactComponent as LogoSvg } from '../../../assets/logo.svg'
import styles from './Logo.module.css'

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
