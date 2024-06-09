import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import { ErrorPage } from "../components/pages/ErrorPage";
import { GatchaPage } from "../components/pages/GatchaPage";
import { fetchData, fetchSingleData } from "../api/loaders";
import { Home } from "../components/pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: fetchData,
      },
      {
        path: "/gatcha",
        element: <GatchaPage />,
      },
    ],
  },
]);
