const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const { use } = require("../Routes/UserRoutes");
const tokenGenerator = require("./tokenGenerator");

const createUser = async (res, user) => {
  try {
    const saltRound = parseInt(process.env.SALT_ROUND);
    const salt = await bcrypt.genSalt(saltRound);
    user.password = await bcrypt.hashSync(user.password, salt);
    const loginToken = tokenGenerator(user.email);
    user.token = loginToken;
    const myData = new User(user);
    await myData.save();

    return res
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        pic: user.pic,
        email: user.email,
        message: "user created",
        token: loginToken,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = createUser;
