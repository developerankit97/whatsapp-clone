"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _authMiddleware = require("../middlewares/authMiddleware");
var _chatController = require("../controllers/chatController");
var router = (0, _express.Router)();
router.get('/', _authMiddleware.authenticateUser, _chatController.getMessages);
router.post('/', _authMiddleware.authenticateUser, _chatController.postSendMessage);
var _default = router;
exports["default"] = _default;