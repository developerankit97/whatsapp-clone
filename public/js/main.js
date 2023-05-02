const logoutBtn = document.querySelector('.logout-btn');
const inputMessage = document.querySelector('#msg');
const inputMessageBtn = document.querySelector('.input-message-btn');
let users = document.querySelector('#users');
let chatMessages = document.querySelector('.chat-messages');
let userStatus = document.querySelector('#user-status');

const apiPrefix = 'http://localhost:3000';

window.addEventListener('DOMContentLoaded', getUsersAndGroups);
logoutBtn.addEventListener('click', logoutUser);
inputMessageBtn.addEventListener('click', sendMessage);
users.addEventListener('click', updateChatMessages);

// function sendMessage(e) {
// 	e.preventDefault();
// 	const message = inputMessage.value;
// 	console.log(message);
// 	const token = localStorage.getItem('token');
// 	inputMessage.value = '';
// }

function outputMessage(messageObj) {
	console.log(messageObj);
	const output = `<div class="message">
		<p class="meta">${messageObj.username} ,<span>${messageObj.timestamp}</span></p>
        <p class="text">
            ${messageObj.message}
        </p>
    </div>`;
	chatMessages.innerHTML += output;
}

async function sendMessage(e) {
	e.preventDefault();
	if (!localStorage.getItem('token')) {
		alert('Please login first');
		document.location.replace('/html/login.html');
	} else {
		if (chatMessages.dataset.user) {
			try {
				const msg = inputMessage.value;
				console.log(JSON.stringify({ msg }), msg);
				const response = await axios.post(
					`${apiPrefix}/messages/`,
					JSON.stringify({
						msg,
						receiverId: chatMessages.dataset.user,
					}),
					{
						headers: {
							Authorization: `${localStorage.getItem('token')}`,
							'Content-Type': 'application/json',
						},
					}
				);
				console.log(response.data.response.msgResponse);
				let data = response.data.response.msgResponse;
				let output = `<div class="message">
							<p class="meta">${data.senderId} , <span>${data.createdAt}</span></p>
							<p class="text">
								${data.message}
							</p>
						</div>`;
				chatMessages.innerHTML += output;
				console.log(response);
			} catch (e) {
				console.log(e.response.statusText, e.response, e);
			}
		}
	}
}

async function updateChatMessages(e) {
	e.preventDefault();
	clearInterval(fetchNewData);
	const receiverId = e.target.getAttribute('id');
	chatMessages.dataset.user = receiverId;
	console.log(chatMessages.dataset.user);
	chatMessages.innerHTML = '';
	try {
		const response = await axios.get(
			`${apiPrefix}/messages/${receiverId}`,
			{
				headers: {
					Authorization: `${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			}
		);
		console.log(response.data);

		response.data.response.forEach((message) => {
			let output = `<div class="message">
							<p class="meta">${message.senderId} , <span>${message.createdAt}</span></p>
							<p class="text">
								${message.message}
							</p>
						</div>`;
			chatMessages.innerHTML += output;
		});
		var fetchNewData = setInterval(async () => {
			console.log('working');
			const response = await axios.get(
				`${apiPrefix}/messages/${receiverId}`,
				{
					headers: {
						Authorization: `${localStorage.getItem('token')}`,
						'Content-Type': 'application/json',
					},
				}
			);
			console.log(response.data);
			chatMessages.innerHTML = '';
			response.data.response.forEach((message) => {
				let output = `<div class="message">
							<p class="meta">${message.senderId} , <span>${message.createdAt}</span></p>
							<p class="text">
								${message.message}
							</p>
						</div>`;
				chatMessages.innerHTML += output;
			});
		}, 2000);
	} catch (e) {
		console.log(e);
	}
}

async function getMessagesAndUsers() {
	if (!localStorage.getItem('token')) {
		alert('Please login first');
		document.location.replace('/html/login.html');
	} else {
		try {
			const response = await axios.get(`${apiPrefix}/messages/`, {
				headers: {
					Authorization: `${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			});

			response.data.response.users.forEach((user) => {
				users.innerHTML += `<li><button class="btn logout-btn" id="${user.id}">${user.fullName}</button></li>`;
			});
			response.data.response.messages.forEach((message) => {
				let output = `<div class="message">
                                    <p class="text">
                                        ${message.message}
                                    </p>
                                </div>`;
				chatMessages.innerHTML += output;
			});
			console.log(response.data);
		} catch (e) {
			if (e.response.status == 404) {
				alert('You have been logged out. please log in first');
				localStorage.removeItem('token');
				window.location.href = '../html/login.html';
			}
			if (e.response.status == 401) {
				alert('Not valid user. Please try login again');
				localStorage.removeItem('token');
				window.location.href = '../html/login.html';
			}
			console.log(e.response.status, e.response.data.statusText.message);
		}
	}
}

async function getUsers() {
	if (!localStorage.getItem('token')) {
		alert('Please login first');
		document.location.replace('/html/login.html');
	} else {
		try {
			const response = await axios.get(`${apiPrefix}/users/`, {
				headers: {
					Authorization: `${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			});
			response.data.response.forEach((user) => {
				users.innerHTML += `<li><button class="btn logout-btn" id="${user.id}">${user.fullName}</button></li>`;
			});
			// response.data.response.messages.forEach((message) => {
			// 	let output = `<div class="message">
			//                         <p class="text">
			//                             ${message.message}
			//                         </p>
			//                     </div>`;
			// 	chatMessages.innerHTML += output;
			// });
			console.log(response.data);
		} catch (e) {
			if (e.response.status == 404) {
				alert('You have been logged out. please log in first');
				localStorage.removeItem('token');
				window.location.href = '../html/login.html';
			}
			if (e.response.status == 401) {
				alert('Not valid user. Please try login again');
				localStorage.removeItem('token');
				window.location.href = '../html/login.html';
			}
			console.log(e.response.status, e.response.data.statusText.message);
		}
	}
}

async function getUsersAndGroups() {
	if (!localStorage.getItem('token')) {
		alert('Please login first');
		document.location.replace('/html/login.html');
	} else {
		try {
			const userResponse = axios.get(`${apiPrefix}/users/`, {
				headers: {
					Authorization: `${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			});
			const groupResponse = axios.get(`${apiPrefix}/groups/`, {
				headers: {
					Authorization: `${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			});
			let response = await Promise.all([userResponse, groupResponse]);
			response[1].data.response.forEach((group) => {
				users.innerHTML += `<li><button class="btn logout-btn" id="${group.id}">#${group.groupName}</button></li>`;
			});
			response[0].data.response.forEach((user) => {
				users.innerHTML += `<li><button class="btn logout-btn" id="${user.id}">${user.fullName}</button></li>`;
			});
			// response.data.response.messages.forEach((message) => {
			// 	let output = `<div class="message">
			//                         <p class="text">
			//                             ${message.message}
			//                         </p>
			//                     </div>`;
			// 	chatMessages.innerHTML += output;
			// });
		} catch (e) {
			if (e.response.status == 404) {
				alert('You have been logged out. please log in first');
				localStorage.removeItem('token');
				window.location.href = '../html/login.html';
			}
			if (e.response.status == 401) {
				alert('Not valid user. Please try login again');
				localStorage.removeItem('token');
				window.location.href = '../html/login.html';
			}
			console.log(e.response.status, e.response.data.statusText.message);
		}
	}
}

async function logoutUser(e) {
	e.preventDefault();
	let token;
	if (localStorage.getItem('token')) {
		token = localStorage.getItem('token');
		try {
			const response = await axios.post(`${apiPrefix}/users/logout`, {
				headers: {
					Authorization: `${token}`,
				},
			});
			if (response.status == 200) {
				localStorage.removeItem('token');
				window.location.href = 'html/login.html';
			}
		} catch (e) {
			console.log(e.response.status, e.response.data.statusText);
		}
	}
}
