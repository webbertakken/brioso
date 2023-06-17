import { PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
  title: Exclude<ReactNode, boolean | null | undefined>
}

const Page = ({ title, children }: Props): JSX.Element => {
  return (
    <>
      <h1 className="sr-only">{title}</h1>

      {children}
    </>
  )
}

export default Page
