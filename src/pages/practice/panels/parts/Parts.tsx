import { PropsWithChildren } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from 'reactfire'
import Columns from './Columns.tsx'
import styles from './Parts.module.css'

const Parts = ({ children }: PropsWithChildren): JSX.Element => {
  const { data: user } = useUser()
  const { songId = 'No song selected' } = useParams()

  return (
    <div className={styles.parts}>
      <Columns />
      {children}
    </div>
  )
}

export default Parts
