import { JSX } from 'react'

interface Props {}

export const Copyright = (): JSX.Element => (
  <p className="mt-8 text-center text-base text-gray-400">
    Made with{' '}
    <span role="img" aria-label="love">
      ❤️
    </span>{' '}
    by{' '}
    <a
      className="inline-flex items-center text-blue-600 hover:underline dark:text-blue-500"
      target="_blank"
      href="https://github.com/Fiztban"
    >
      Fiztban
    </a>{' '}
    and{' '}
    <a
      className="inline-flex items-center text-blue-600 hover:underline dark:text-blue-500"
      target="_blank"
      href="https://github.com/webbertakken"
    >
      Webber
    </a>
    .
  </p>
)
