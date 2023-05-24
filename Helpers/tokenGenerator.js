const jwt = require("jsonwebtoken");

const tokenGenerator = (id) => {
  const accesstoken = jwt.sign({ id }, process.env.JWT_SECRET);
  return accesstoken;
};
module.exports = tokenGenerator;
