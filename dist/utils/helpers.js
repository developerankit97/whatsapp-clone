"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMessage = formatMessage;
exports.sendError = sendError;
exports.sendResponse = sendResponse;
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function sendResponse(res, code, message, response) {
  res.status(code).json({
    statusText: message,
    response: response
  });
}
function sendError(res, code, message) {
  res.status(code).json({
    statusText: message
  });
}
function formatMessage(rawMessageObj) {
  var room = [rawMessageObj.senderId, rawMessageObj.receiverId].sort().join('');
  var username = rawMessageObj.senderId;
  var message = rawMessageObj.message;
  var timestamp = (0, _moment["default"])(rawMessageObj.createdAt).format('DD MMM hh:mm a');
  return {
    room: room,
    username: username,
    message: message,
    timestamp: timestamp
  };
}