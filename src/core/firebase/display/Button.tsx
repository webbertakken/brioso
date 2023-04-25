import React from 'react'
import styles from './Button.module.css'
import cx from 'classnames'

interface Props {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  danger?: boolean
  primary?: boolean
  disabled?: boolean
}

export const WideButton = ({ label, onClick, danger, primary, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      className={cx(styles.button, { [styles.danger]: danger, [styles.primary]: primary })}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
