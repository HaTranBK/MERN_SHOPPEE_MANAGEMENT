import React from "react";
import { Breadcrumb } from "antd";
const BreadCrum = () => (
  <Breadcrumb
    separator=">"
    items={[
      {
        title: "Home",
      },
      {
        title: "Application Center",
        href: "",
      },
      {
        title: "Application List",
        href: "",
      },
      {
        title: "An Application",
      },
    ]}
  />
);
export default BreadCrum;
