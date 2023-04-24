import styles from './Columns.module.css'

interface Props {}

const Columns = ({}: Props): JSX.Element => {
  return (
    <div className={styles.columns}>
      <div>On/Off</div>
      <div className={styles.title}>Part</div>
      <div>Lyrics</div>
      <div>Balance</div>
      <div>Volume</div>
    </div>
  )
}

export default Columns
