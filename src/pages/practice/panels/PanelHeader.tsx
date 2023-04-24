import styles from './Panel.module.css'
import React from 'react'

interface Props {
  icon?: React.ReactNode
  title: string
}

const PanelHeader = ({ icon, title }: Props): JSX.Element => {
  return (
    <div className={styles.header}>
      {icon && <span>{icon}</span>}
      {title}
    </div>
  )
}

export default PanelHeader
