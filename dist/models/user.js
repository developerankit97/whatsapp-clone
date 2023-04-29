"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _db = _interopRequireDefault(require("../utils/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var User = _db["default"].define('user', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  fullName: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  email: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  phoneNumber: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  password: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  isLoggedIn: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  }
});
var _default = User;
exports["default"] = _default;