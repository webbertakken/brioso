import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import RootLayout from '../../layout/RootLayout.tsx'

export default function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <RootLayout>
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
      </RootLayout>
    )
  }

  if (error instanceof Error) {
    return (
      <div id="error-page">
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    )
  }

  return (
    <div id="error-page">
      <h1>Oops! Uncaught Error</h1>
      <p>
        Uncaught error. This was not expected. Please drop a line to maintainers@brio.so and let us
        know how you got here.
      </p>
    </div>
  )
}
