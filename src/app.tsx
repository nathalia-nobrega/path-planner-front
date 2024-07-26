import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from "./auth/privateRoute";
import { CreateTripPage } from "./pages/create-trip";
import { AuthProvider } from "./auth/authContext";
import LoginPage from "./pages/login-register/LoginPage";
import { TripDetailsPage } from "./pages/trip-details";
import RegisterPage from "./pages/login-register/RegisterPage";

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
      element: <LoginPage/>,
    },
    {
      path: "/auth/register",
      element: <RegisterPage />,
    },
    {
      path: "/trips/:tripId",
      element: (
        <PrivateRoute>
          <TripDetailsPage />
        </PrivateRoute>
      ),
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

