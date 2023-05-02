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
var UserGroup = _db["default"].define('usergroup', {
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
var _default = UserGroup;
exports["default"] = _default;