import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from "./auth/privateRoute";
import { CreateTripPage } from "./pages/create-trip";
import { AuthProvider } from "./auth/authContext";

export function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <CreateTripPage />
        </PrivateRoute>
      ),
    },
    {
      path: "/auth/login",
      element: (
        <div>
          <h1>esta eh a pagina de loginnnn</h1>
        </div>
      ),
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

