import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ButtonComponent } from "../index";
import Navitem from "./NavItems";
import { logout } from "../../config/reducers/authReducer";

const NavList = ({ history, logout, isAuth }) => {
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

      {isAuth && (
        <ButtonComponent
          title="Logout"
          moreStyle="hover:text-primary"
          action={() => logout()}
        />
      )}
      {!isAuth && (
        <>
        <ButtonComponent
          title="Login"
          moreStyle="hover:text-primary"
          isButton={false}
          href="/login"
        />
        <ButtonComponent
          title="Register"
          moreStyle="hover:text-primary"
          isButton={false}
          href="/register"
        />
        </>
      )}
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

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuthenticated,
})

export default connect(mapStateToProps , { logout })(withRouter(NavList));
