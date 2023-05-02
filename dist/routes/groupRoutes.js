"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _authMiddleware = require("../middlewares/authMiddleware");
var _groupController = require("../controllers/groupController");
var router = (0, _express.Router)();
router.get('/', _authMiddleware.authenticateUser, _groupController.getGroups);
router.get('/:groupId', _authMiddleware.authenticateUser, _groupController.getGroup);
var _default = router;
exports["default"] = _default;