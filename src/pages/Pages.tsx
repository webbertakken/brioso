import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error/ErrorPage.tsx'
import Practice from './practice/Practice.tsx'
import { Authentication } from '../core/firebase/auth/Authentication.tsx'
import { Layout } from '../layout/Layout.tsx'
import { Components } from './components/Components.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Authentication />,
      },
      {
        path: '/components',
        element: <Components />,
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
