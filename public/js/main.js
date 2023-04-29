const logoutBtn = document.querySelector('.logout-btn');

const apiPrefix = 'http://localhost:3000';

window.addEventListener('DOMContentLoaded', getDetails);
logoutBtn.addEventListener('click', logoutUser);

async function getDetails() {
	if (!localStorage.getItem('token')) {
		alert('Please login first');
		window.location.href = 'html/login.html';
	}
}

async function logoutUser() {
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
