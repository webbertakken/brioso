import styles from './Logo.module.css'

// @ts-expect-error
import LogoSvg from '../../assets/logo.svg?react'

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
