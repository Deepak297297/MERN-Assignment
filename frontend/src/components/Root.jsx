import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function Root() {
  return (
    <div className="h-screen">
      <Nav />
      <Outlet />
    </div>
  );
}
