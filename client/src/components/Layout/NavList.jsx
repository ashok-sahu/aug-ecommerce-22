import React from "react";
import Navitem from "./NavItems";
import { withRouter } from "react-router-dom";
import { ButtonComponent } from "../index";

const NavList = ({ history }) => {
  //make active navitem with text primary
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return "text-primary";
    } else {
      return "";
    }
  };
  return (
    <ul className="font-bold flex-wrap flex md:mr-5 flex-col md:flex-row text-center">
      <Navitem link="/" name="Home" linkStyle={isActive(history, "/")} />
      <Navitem
        link="/shop"
        name="Shop"
        linkStyle={isActive(history, "/shop")}
      />
      <Navitem
        link="/dashboard"
        name="Dashboard"
        linkStyle={isActive(history, "/dashboard")}
      />
      <ButtonComponent
        title="Signout"
        moreStyle="hover:text-primary"
        action={() => console.log("signout")}
      />
      <ButtonComponent
        title="Cart"
        isButton={false}
        href="/cart"
        moreStyle="bg-primary text-white uppercase w-24 md:ml-6"
        action={() => console.log("signout")}
      />
    </ul>
  );
};

export default withRouter(NavList);
