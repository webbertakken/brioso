import styles from './Header.module.css'

interface Props {}

const Header = ({}: Props): JSX.Element => {
  return (
    <div className={styles.header}>
      <div>metronome</div>
      <div>time signature</div>
      <div>tempo</div>
      <div>controls</div>
    </div>
  )
}

export default Header
