import React from 'react'
import styles from './Panel.module.css'

interface Props {
  title: string
  children: React.ReactNode
}

const Panel = ({ title, children }: Props): JSX.Element => {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span>🎵</span>
        {title}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default Panel
