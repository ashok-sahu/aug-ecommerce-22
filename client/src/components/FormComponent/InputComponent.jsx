import React, { Fragment } from "react";

const InputComponent = ({ title, type, placeholder, value, handleChange }) => {
  return (
    <Fragment>
      <label
        htmlFor={`form-${title}`}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      >
        {title}
      </label>
      <input
        type={type}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-light focus:outline-none focus:bg-white"
        id={`form-${title}`}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        // required
      />
    </Fragment>
  );
};

export default InputComponent;
