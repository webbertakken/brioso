import React from 'react'
import styles from './Panels.module.css'

interface Props {
  children: React.ReactNode
}

const Panels = ({ children }: Props): JSX.Element => {
  return <div className={styles.panels}>{children}</div>
}

export default Panels
