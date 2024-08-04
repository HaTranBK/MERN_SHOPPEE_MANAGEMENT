import { useState } from "react";
import "./App.css";
import useRouterCustom from "./hooks/useRouterCustom";

function App() {
  const routes = useRouterCustom();
  return routes;
}

export default App;
