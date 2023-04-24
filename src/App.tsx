import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/error/ErrorPage.tsx'
import RootLayout from './pages/root/RootLayout.tsx'
import Practice from './pages/practice/Practice.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <div>Login first</div>,
      },
      {
        path: '/practice',
        element: <Practice />,
      },
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
