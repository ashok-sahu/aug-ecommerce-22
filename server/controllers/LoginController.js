const User = require("../models/Auth/LoginModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

exports.Login = async (req, res) => {
  //get name,email,password from request
  const { name, email, password } = req.body;
  try {
    //check if user already exists
    let user = await User.findOne({ email });
    //if user exists
    if (user) {
      return res.status(400).json({
          status:"failed",
        errors: [
          {
            message: "User already exists",
          },
        ],
      });
    }

    //if not exists
    //get image from gravatar
    const avatar = gravatar.url(email, {
      s: "200", //size
      r: "pg", //rating
      d: "mm",
    });

    //create user object
    user = new User({
      name,
      email,
      avatar,
      password,
    });

    //encrypt password
    const salt = await bcrypt.genSalt(10); //generate salt contains 10
    //save password
    user.password = await bcrypt.hash(password, salt); //use user password and salt to hash password
    //save user in database
    await user.save();

    //payload to generate token
    const payload = {
      user: {
        id: user.is,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000, //for development for production it is 3600
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};
