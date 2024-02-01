import React from 'react'
import App from './App.jsx'
import * as ReactDOM from "react-dom/client";
import ErrorPage from './ErrorPage.jsx'
import Admin from './components/admin/Admin'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
