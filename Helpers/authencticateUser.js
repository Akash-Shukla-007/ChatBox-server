const bcrypt = require("bcrypt");
const tokenGenerator = require("./tokenGenerator");

const authenticateUser = async (user, password, res) => {
  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        pic: user.pic,
        email: user.email,
        message: "correct email and pass",
        token: tokenGenerator(user.id),
      });
    } else {
      res.status(404).json({ message: " Invalid Email and Password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = authenticateUser;
