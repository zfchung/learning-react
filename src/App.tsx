import { FC, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";

export const App: FC = () => {
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/characters",
        async lazy() {
          const { Characters } = await import("./pages/characters");
          return { Component: Characters };
        },
      }
    ]);
  }, [])

  return <RouterProvider router={router}/>;
}

