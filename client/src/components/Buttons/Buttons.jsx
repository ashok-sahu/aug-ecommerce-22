import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Buttons = ({ isButton = true, title = "", action, href, moreStyle ,type}) => {
  const style = `font-bold rounded-md px-3 py-2 text-base cursor-pointer animate focus:outline-none ${moreStyle}`;
  return (
    <Fragment>
      {isButton ? (
        <button className={style} type={type} onClick={action}>{title}</button>
      ) : (
        <Link to={href} className={style}>
          {title}
        </Link>
      )}
    </Fragment>
  );
};

export default Buttons;
