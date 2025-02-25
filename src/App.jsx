import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/pages/home/Home";
import LandingPage from "./features/pages/landing/LandingPage";
import Authentication from "./features/auth/Authentication";
import ProtectedLayout from "./ui/ProtectedLayout";
import Jurnal, { loader as jurnalLoader } from "./features/pages/jurnal/Jurnal";

import CreateNewPage, {
  loader as weatherLoader,
} from "./features/pages/create-new-page/CreateNewPage";
import JurnalEntry from "./features/pages/entry/JurnalEntry";
import Setting from "./features/pages/settings/Setting";
// import TestSidebar from "../src/ui/test_sidebar/TestSidebar";
// import Sidebar from "./ui/sidebar/Sidebar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
        path: "/createpage",
        element: <CreateNewPage />,
        loader: weatherLoader,
      },
      {
        path: "/jurnal",
        element: <Jurnal />,
        loader: jurnalLoader,
      },
      {
        path: "/jurnal/entry/:uid",
        element: <JurnalEntry />,
      },
      {
        path: "/settings",
        element: <Setting />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
