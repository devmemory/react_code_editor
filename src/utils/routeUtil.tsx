import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "src/routes/main";

const Editor = lazy(() => import("src/routes/editor"));
const Test = lazy(() => import("src/routes/test"));

export const routeName = {
  main: "/",
  editor: "/editor",
  test: "/test",
};

export const router = createBrowserRouter([
  { path: routeName.main, element: <Main /> },
  { path: routeName.editor, element: <Editor /> },
  { path: routeName.test, element: <Test /> },
]);
