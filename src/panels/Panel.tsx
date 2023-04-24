import React from 'react'
import styles from './Panel.module.css'
import PanelHeader from './PanelHeader.tsx'

interface Props {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

const Panel = ({ icon, title, children }: Props): JSX.Element => {
  return (
    <div className={styles.panel}>
      <PanelHeader icon={icon} title={title} />
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default Panel
