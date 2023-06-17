import Placeholder from './Placeholder.tsx'
import { slugify } from '../core/utils/slugify.ts'
import { PropsWithChildren } from 'react'
import * as classNames from 'classnames'

interface Props extends PropsWithChildren {
  title: string
  span?: number
  unstyled?: boolean
}

const Column = ({ title, span = 3, children, unstyled = false }: Props): JSX.Element => {
  return (
    <div
      className={classNames('grid grid-cols-1 gap-4', {
        'lg:col-span-1': span === 1,
        'lg:col-span-2': span === 2,
        'lg:col-span-3': span === 3,
      })}
    >
      <section aria-labelledby={slugify(title)}>
        <h2 className="sr-only" id={slugify(title)}>
          {title}
        </h2>
        <div
          className={classNames('h-full overflow-hidden rounded-lg', {
            'bg-white shadow': !unstyled,
          })}
        >
          <div className={classNames('h-full', { 'p-6': !unstyled })}>
            {children || <Placeholder />}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Column
