"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("../utils/db"));
var _user = _interopRequireDefault(require("./user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Group = _db["default"].define('group', {
  id: {
    type: _sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  groupName: {
    type: _sequelize.Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: _sequelize.Sequelize.STRING,
    allowNull: true
  }
});
var _default = Group;
exports["default"] = _default;