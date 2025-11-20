import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { Navigate } from "react-router";

import Root from "./pages/Root";
import Flashcards from "./pages/Flashcards";
import Exercise from "./pages/Exercise";
import Login from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/content",
    element: <Root />,
    children: [
      {
        path: "flashcards",
        element: <Flashcards />
      },
      {
        path: "exercise",
        element: <Exercise />
      }
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
