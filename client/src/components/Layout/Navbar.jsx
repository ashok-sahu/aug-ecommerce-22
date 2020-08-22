import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../index";
import NavList from "./NavList";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const menuState = () => {
    setActive(!active);
  };
  return (
    <nav className="navbar">
      <div className="flex justify-between w-full md:w-12 items-center">
        <Link to="/" className="logo w-16 animate">
          <img src={require("../../assets/images/logo.jpg")} alt="logo" />
        </Link>
        <Sidebar active={active} menuState={menuState} />
      </div>
      <div className={`${active ? "flex" : "hidden"} md:flex`}>
        <NavList />
      </div>
    </nav>
  );
};

export default Navbar;
