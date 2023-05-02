"use strict";

var _db = _interopRequireDefault(require("../utils/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Group = require('./group');
Group.create({
  groupName: 'Fun',
  description: 'Entertainment'
}).then(function (response) {
  return console.log(response.dataValues);
});