import React from 'react'
import styles from './Panel.module.css'

interface Props {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

const Panel = ({ icon, title, children }: Props): JSX.Element => {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        {icon && <span>{icon}</span>}
        {title}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default Panel
