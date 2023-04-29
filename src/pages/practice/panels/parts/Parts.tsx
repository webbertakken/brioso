import styles from './Parts.module.css'
import Columns from './Columns.tsx'
import { PropsWithChildren } from 'react'
import { useUser } from 'reactfire'
import { useParams } from 'react-router-dom'

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
