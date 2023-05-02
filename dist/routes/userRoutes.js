"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _authMiddleware = require("../middlewares/authMiddleware");
var _userController = require("../controllers/userController");
var router = (0, _express.Router)();
router.get('/', _authMiddleware.authenticateUser, _userController.getUsers);
router.get('/:userId', _authMiddleware.authenticateUser, _userController.getUser);
var _default = router;
exports["default"] = _default;