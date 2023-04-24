import styles from './PartControls.module.css'

interface Props {}

const PartControls = ({}: Props): JSX.Element => {
  return (
    <div className={styles.partControls}>
      <div className={styles.row}>
        <div className={styles.title}>My part</div>
        <div className={styles.controls}>(placeholder for slider)</div>
      </div>
      <div className={styles.row}>
        <div className={styles.title}>Other parts</div>
        <div className={styles.controls}>(placeholder for slider)</div>
      </div>
    </div>
  )
}

export default PartControls
