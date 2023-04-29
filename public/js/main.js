const logoutBtn = document.querySelector('.logout-btn');
const inputMessage = document.querySelector('#msg');
const inputMessageBtn = document.querySelector('.input-message-btn');
let chatMessages = document.querySelector('.chat-messages');

const apiPrefix = 'http://localhost:3000';

window.addEventListener('DOMContentLoaded', getMessages);
logoutBtn.addEventListener('click', logoutUser);
inputMessageBtn.addEventListener('click', sendMessage);

async function sendMessage() {
	if (!localStorage.getItem('token')) {
		alert('Please login first');
		document.location.replace('/html/login.html');
	} else {
		if (inputMessage) {
			try {
				const message = inputMessage.value;
				console.log(JSON.stringify({ message }), message);
				const response = await axios.post(
					`${apiPrefix}/messages/`,
					JSON.stringify({ message }),
					{
						headers: {
							Authorization: `${localStorage.getItem('token')}`,
							'Content-Type': 'application/json',
						},
					}
				);
				let output = `<div class="message">
                                    <p class="text">
                                        ${response.data.response.message}
                                    </p>
                                </div>`;
				chatMessages.innerHTML += output;
				console.log(response);
			} catch (e) {
				console.log(e.response.statusText, e.response);
			}
		}
	}
}

async function getMessages() {
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
			response.data.response.forEach((message) => {
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
