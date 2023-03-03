var express = require("express");
var router = express.Router();
var chatController = require("../controllers/chatController");
var auth = require("../middleware/auth")();
router.get("/send-message", auth.authenticate(), chatController.get_post);

module.exports = router;
