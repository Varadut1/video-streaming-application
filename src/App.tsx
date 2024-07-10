import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./pages/Root"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProtectedPage from "./pages/ProtectedPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/Signup',
        element: <LoginPage term={'signup'}/>
      },
      {
        path: '/Signin',
        element: <LoginPage term={'signin'}/>
      },
      {
        path: '/protected',
        element: <ProtectedPage />
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
