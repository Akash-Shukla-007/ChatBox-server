const express = require("express");
const { protect } = require("../middlewares/authmiddleware");
const {
  accesschat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../Controllers/chatContoller");

const router = express.Router();

router.route("/").post(protect, accesschat);
router.route("/").get(protect, fetchChat);
router.post("/group", protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupadd").put(protect, addToGroup);
router.route("/groupremove").put(protect, removeFromGroup);

module.exports = router;
