import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { Navigate } from "react-router";

import Root from "./pages/Root";
import Flashcards from "./pages/Flashcards";
import Exercise from "./pages/Exercise";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

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
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/content",
    element: <Root />,
    children: [
      {
        path: "flashcards",
        element: <ProtectedRoute><Flashcards /></ProtectedRoute>
      },
      {
        path: "exercise",
        element: <ProtectedRoute><Exercise /></ProtectedRoute>
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
