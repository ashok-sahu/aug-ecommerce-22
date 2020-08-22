const User = require("../models/Auth/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

exports.userRegister = async (req, res) => {
  //get name,email,password from request
  const { name, email, password } = req.body;
  try {
    //check if user already exists
    let user = await User.findOne({ email });
    //if user exists
    if (user) {
      return res.status(400).json({
        status: "failed",
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
        id: user.id,
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
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //find user from database
    let user = await User.findOne({
      email,
    });

    //if user found from the database
    if (!user) {
      res.status(400).json({
        errors: [
          {
            msg: "invalid credential",
          },
        ],
      });
    }

    //know user founded by email lets compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    //password don't match
    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: "invalid credentials",
          },
        ],
      });
    }

    //payload for jwt
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error;
        res.json({
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.userAuth = async (req,res,next)=>{
  try{
    const user = await User.findById(req.user.id).select('-password')
    if(user){
      res.status(200).json({
        status:'success',
        message:user
      })
    }
  }catch(error){
    console.log(error)
    res.status(400).json({
      message:'token required'
    })
  }
}
