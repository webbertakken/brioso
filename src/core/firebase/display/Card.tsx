import * as React from 'react'
import styles from './Card.module.css'
import cx from 'classnames'

export const Card = ({
  children,
  title,
  centerAlign,
}: React.PropsWithChildren<{ title: string; centerAlign?: boolean }>) => {
  return (
    <div className={cx(styles.card, { [styles.centerAlign]: centerAlign })}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export const CardSection = ({ children, title }: React.PropsWithChildren<{ title: string }>) => {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3>{title}</h3>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </div>
  )
}
