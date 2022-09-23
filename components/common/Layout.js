import React from "react";
import MainHead from "./MainHead";
import NavBarComponent from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <MainHead />
      <NavBarComponent />
      {children}
    </>
  );
}
