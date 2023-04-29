"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _authController = require("../controllers/authController");
var router = (0, _express.Router)();
router.post('/signup', _authController.postCreateUser);
router.post('/login', _authController.postLoginUser);
var _default = router;
exports["default"] = _default;