"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendError = sendError;
exports.sendResponse = sendResponse;
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