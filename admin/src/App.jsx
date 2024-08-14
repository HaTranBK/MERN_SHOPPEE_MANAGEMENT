import { useState } from "react";
import "./App.css";
import useRouterCustom from "./hooks/useRouterCustom";

function Admin() {
  const routes = useRouterCustom();
  return routes;
}

export default Admin;
