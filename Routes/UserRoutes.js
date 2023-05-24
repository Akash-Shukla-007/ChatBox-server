const express = require("express");
const { forgotPassword, allusers } = require("../Controllers/userControllers");
const { loginUser } = require("../Controllers/userControllers");
const { registerUser } = require("../Controllers/userControllers");
const { protect } = require("../middlewares/authmiddleware");

const router = express.Router();

// router.post("/", registerUser);
router.route("/").post(registerUser).get(protect, allusers);
router.post("/login", loginUser);
router.post("/forgot", forgotPassword);
// router.get("/", allusers);

module.exports = router;
