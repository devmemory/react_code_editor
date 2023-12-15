import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./utils/routeUtil";

const App = () => {
  return (
    <Suspense fallback={<div />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
