"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("../utils/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Chat = _db["default"].define('chat', {
  id: {
    type: _sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  message: {
    type: _sequelize.Sequelize.STRING,
    allowNull: false
  }
});
var _default = Message;
exports["default"] = _default;