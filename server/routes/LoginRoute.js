const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");
const validator = require("../validators/AuthValidators");

//@route POST api/user/register
//@desc Register User
//@access public
router.post(
  "/user/register",
  validator.validateRegisterRequest,
  validator.isRequestValidated,
  LoginController.Login
);

module.exports = router;
