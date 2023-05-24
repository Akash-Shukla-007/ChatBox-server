const authenticateUser = require("../Helpers/authencticateUser");
const createUser = require("../Helpers/createUser");
const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");

// registration
const registerUser = async (req, res) => {
  const user = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    pic: req.body.pic,
  };
  try {
    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      return res.status(409).json({ message: "User Already exists" });
    }
    createUser(res, user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// login

const loginUser = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const userExists = await User.findOne({ email: user.email });
  if (userExists) {
    authenticateUser(userExists, user.password, res);
  } else {
    res.status(400).json({ message: "User not found" });
  }
};

//Forgot

const forgotPassword = async (req, res) => {
  console.log("run");
};

// search user

const allusers = asyncHandler(async (req, res) => {
  const keyboard = req.query.search
    ? {
        $or: [
          {
            name: { $regex: req.query.search, $options: "i" },
          },
          {
            email: { $regex: req.query.search, $options: "i" },
          },
        ],
      }
    : {};

  const user = await User.find(keyboard).find({ _id: { $ne: req.user._id } });
  res.send(user);
});

module.exports = { loginUser, forgotPassword, registerUser, allusers };
