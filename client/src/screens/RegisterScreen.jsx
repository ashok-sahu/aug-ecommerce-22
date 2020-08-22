import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Container } from "../components/index";
import { register } from "../config/reducers/authReducer";
import { FormInput, ButtonComponent } from "../components/index";

const Register = ({ register }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = data;
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password do not match");
    } else {
      register({ name, email, password });
    //   toast.success("login Successful");
    }
  };
  return (
    <Container>
      <form
        action=""
        className="bg-white rounded-lg overflow-hidden shadow-2xl p-5 my-16 md:w-1/2 lg:w-1/3 mx-auto"
        onSubmit={onSubmit}
      >
        <h2 className="font-bold text-3xl text-center mb-5">Register</h2>
        <FormInput
          title="Name"
          placeholder="Type Your Name Here.."
          value={name}
          handleChange={handleChange("name")}
          type="text"
        />
        <FormInput
          title="Email"
          placeholder="Type Your Email Here.."
          value={email}
          handleChange={handleChange("email")}
          type="email"
        />
        <FormInput
          title="Password"
          placeholder="Type Your Password Here.."
          value={password}
          handleChange={handleChange("password")}
          type="password"
        />
        <FormInput
          title="Confirm Password"
          placeholder="Re-enter password Here.."
          value={confirmPassword}
          handleChange={handleChange("confirmPassword")}
          type="password"
        />
        <ButtonComponent
          title="SignUp"
          moreStyle="bg-primary text-white w-full mb-3"
          type="submit"
        />
      </form>
    </Container>
  );
};

export default connect(null, { register })(Register);
