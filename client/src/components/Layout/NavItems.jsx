import React from "react";
import { Link } from "react-router-dom";

const NavItems = ({ link, linkStyle, name }) => {
  return (
    <li
      className={`hover:text-primary animate px-3 py-2 rounded-md ${linkStyle}`}
    >
      <Link to={link}>
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default NavItems;
