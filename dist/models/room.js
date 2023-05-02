"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("../utils/db"));
var _user = _interopRequireDefault(require("./user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import Group from './group';

var Room = _db["default"].define('room', {
  id: {
    type: _sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  senderId: {
    type: _sequelize.Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: _user["default"],
      key: 'id'
    }
  },
  receiverId: {
    type: _sequelize.Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: _user["default"],
      key: 'id'
    }
  }
});
var _default = Room;
exports["default"] = _default;