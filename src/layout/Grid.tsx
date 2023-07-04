import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {}

export const Grid = ({ children }: Props): JSX.Element => {
  return (
    <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-8">{children}</div>
  )
}
