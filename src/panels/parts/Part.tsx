import styles from './Part.module.css'

interface Props {
  title: string
  muted?: boolean
}

const Part = ({ title, muted = false }: Props): JSX.Element => {
  return (
    <div className={styles.part}>
      <div>{muted ? '🔇' : '🔊'}</div>
      <div className={styles.title}>{title}</div>
      <div>💬</div>
      <div>⚖️</div>
      <div>🎛️</div>
    </div>
  )
}

export default Part
