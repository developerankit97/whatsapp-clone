"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("../utils/db"));
var _user = _interopRequireDefault(require("./user"));
var _group = _interopRequireDefault(require("./group"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var GroupAdmin = _db["default"].define('GroupAdmin', {
  id: {
    type: _sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: _sequelize.Sequelize.INTEGER,
    references: {
      model: _user["default"],
      key: 'id'
    }
  },
  groupId: {
    type: _sequelize.Sequelize.INTEGER,
    references: {
      model: _group["default"],
      key: 'id'
    }
  }
});
var _default = GroupAdmin;
exports["default"] = _default;