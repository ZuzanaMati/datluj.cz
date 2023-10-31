import { createRoot } from "react-dom/client";
import React from "react";
import Stage from "./components/Stage";
import "./style.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Modal from "react-modal";
import Practice from "./components/Practice";
import Results from "./components/Results";
import { Outlet } from "react-router-dom";
import StartPage from "./components/FrontPage";

const App = () => {
  return (
    <>
      <div className="container">
        <main>
          <Outlet />
        </main>
        <footer>
        <p className="footer">Zuzana Matiašková</p>
      </footer>
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <StartPage />,
      },
      {
        path: "/datlovani",
        element: <Stage />,
      },
      {
        path: "/trenink",
        element: <Practice />,
      },
      {
        path: "/results",
        element: <Results />,
      },
    ],
  },
  // {
  //   path: "/datlovani",
  //   element: <Stage />,
  // },
  // {
  //   path: "/trenink",
  //   element: <Practice />,
  // },
  // {
  //   path: "/results",
  //   element: <Results />,
  // },
]);

Modal.setAppElement("#app");

createRoot(document.querySelector("#app")).render(
  <RouterProvider router={router} />
);
