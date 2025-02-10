import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/pages/home/Home";
import LandingPage from "./features/pages/landing/LandingPage";
import Authentication from "./features/auth/Authentication";
import ProtectedLayout from "./ui/ProtectedLayout";
import Jurnal from "./features/pages/home/Jurnal";

import CreateNewPage, {
  loader as weatherLoader,
} from "./features/pages/create-new-page/CreateNewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/placeholder",
    element: <Home />,
  },
  {
    path: "/authenticate",
    element: <Authentication />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/jurnal",
        element: <Jurnal />,
      },
      {
        path: "/createpage",
        element: <CreateNewPage />,
        loader: weatherLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
