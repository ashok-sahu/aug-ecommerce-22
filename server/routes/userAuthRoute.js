const express = require("express");
const router = express.Router();
const authController = require("../controllers/userAuthController");
const validator = require("../validators/AuthValidators");
const auth = require("../middlewares/authMiddleware");

//@route POST api/user/register
//@desc Register User
//@access public
router
  .get("/", auth, authController.userAuth)
  .post(
    "/register",
    validator.validateUserRegisterRequest,
    validator.isRequestValidated,
    authController.userRegister
  );

router.post(
  "/login",
  validator.validateUserSignInRequest,
  validator.isRequestValidated,
  authController.userLogin
);

module.exports = router;
