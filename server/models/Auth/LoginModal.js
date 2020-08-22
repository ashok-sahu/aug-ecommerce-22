const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "username required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is requierd"],
  },
  avatar: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
  history: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
