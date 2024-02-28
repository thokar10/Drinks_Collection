import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";

import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SingleDrinks from "./Component/SIngleDrinks";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:drinks_id",
    element: <SingleDrinks />,
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
