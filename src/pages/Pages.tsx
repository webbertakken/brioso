import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './root/RootLayout.tsx'
import ErrorPage from './error/ErrorPage.tsx'
import Practice from './practice/Practice.tsx'
import { Authentication } from '../core/Authentication.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Authentication />,
      },
      {
        path: '/practice',
        element: <Practice />,
      },
    ],
  },
])

const Pages = (): JSX.Element => <RouterProvider router={router} />

export default Pages
