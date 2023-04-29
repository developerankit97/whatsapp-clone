"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _path = _interopRequireDefault(require("path"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _user = _interopRequireDefault(require("./models/user"));
var _chat = _interopRequireDefault(require("./models/chat"));
var _db = _interopRequireDefault(require("./utils/db"));
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));
var _chatRoutes = _interopRequireDefault(require("./routes/chatRoutes"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//Import Core Library

// Import third party libraries

dotenv.config();

// Import customs

// Import Routes

// Use third party libraries
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: 'http://localhost:3000'
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, '..', 'public')));
app.use(_bodyParser["default"].json());

// Use Routes
app.use('/users', _authRoutes["default"]);
app.use('/messages', _chatRoutes["default"]);

// Initializing Database
_user["default"].hasMany(_chat["default"]);
_chat["default"].belongsTo(_user["default"]);
_db["default"].sync().then(function () {
  return app.listen(process.env.PORT);
})["catch"](function (e) {
  return console.log(e);
});