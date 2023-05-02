"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _path = _interopRequireDefault(require("path"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _socket = _interopRequireDefault(require("socket.io"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _db = _interopRequireDefault(require("./utils/db"));
var _user = _interopRequireDefault(require("./models/user"));
var _chat = _interopRequireDefault(require("./models/chat"));
var _group = _interopRequireDefault(require("./models/group"));
var _room = _interopRequireDefault(require("./models/room"));
var _userGroup = _interopRequireDefault(require("./models/userGroup"));
var _groupAdmin = _interopRequireDefault(require("./models/groupAdmin"));
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));
var _chatRoutes = _interopRequireDefault(require("./routes/chatRoutes"));
var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));
var _groupRoutes = _interopRequireDefault(require("./routes/groupRoutes"));
var _helpers = require("./utils/helpers");
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
app.use('/auth', _authRoutes["default"]);
app.use('/users', _userRoutes["default"]);
app.use('/groups', _groupRoutes["default"]);
app.use('/messages', _chatRoutes["default"]);
_user["default"].belongsToMany(_group["default"], {
  through: _userGroup["default"],
  as: 'groups'
});
_group["default"].belongsToMany(_user["default"], {
  through: _userGroup["default"],
  as: 'members'
});
_user["default"].belongsToMany(_group["default"], {
  through: _groupAdmin["default"],
  as: 'adminGroups'
});
_group["default"].belongsToMany(_user["default"], {
  through: _groupAdmin["default"],
  as: 'admins'
});
_user["default"].hasMany(_chat["default"], {
  foreignKey: 'senderId',
  as: 'sentMessages'
});
_user["default"].hasMany(_chat["default"], {
  foreignKey: 'receiverId',
  as: 'receivedMessages'
});
_group["default"].hasMany(_chat["default"], {
  foreignKey: 'groupId',
  as: 'messages'
});
_db["default"].sync().then(function () {})["catch"](function (e) {
  return console.log(e);
});
app.listen(process.env.PORT);

// const io = socketio(server);

// // Run when client connects
// io.on('connection', (socket) => {
// 	console.log('a user is connected', socket.id);
// 	console.log('a user is connected', socket.id);
// 	console.log('a user is connected', socket.id);

// 	socket.on('joinRoom', async (room) => {
// 		console.log(room);

// 		//const user = await User.findOne({ where: { id: chatWith } });
// 		//console.log(user.fullName);
// 		// socket.emit('message', 'Welcome to Chat App');

// 		socket.join(room);

// 		socket.broadcast
// 			.to(room)
// 			.emit('message', `A ${room} is connected to the chat`);
// 	});
// 	socket.on('chatMessage', (message) => {
// 		console.log(message);
// 		console.log(formatMessage(message));
// 		io.to(formatMessage(message).room).emit(
// 			'message',
// 			formatMessage(message)
// 		);
// 	});
// 	socket.on('disconnect', () => {
// 		// io.emit('message', 'A user is disconnected from the chat');
// 	});
// });