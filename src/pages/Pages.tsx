import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error/ErrorPage.tsx'
import Practice from './practice/Practice.tsx'
import { Authentication } from '../core/firebase/auth/Authentication.tsx'
import RootLayout2 from './root/RootLayout2.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout2 />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Authentication />,
      },
      {
        path: 'practice',
        element: <Practice />,
        children: [
          {
            path: ':songId',
            children: [
              {
                path: ':partId',
              },
            ],
          },
        ],
      },
    ],
  },
])

const Pages = (): JSX.Element => <RouterProvider router={router} />

export default Pages
