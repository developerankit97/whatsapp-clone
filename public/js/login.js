const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const loginBtn = document.querySelector('.login-btn');

loginBtn.addEventListener('click', loginUser);

async function loginUser(e) {
	e.preventDefault();
	const email = loginEmail.value;
	const password = loginPassword.value;
	try {
		const response = await axios.post(
			'http://localhost:3000/users/login',
			JSON.stringify({ email, password }),
			{ headers: { 'Content-Type': 'application/json' } }
		);
		if (response.status == 200) {
			alert('login successful');
			localStorage.setItem('token', response.data.token);
			document.location.replace('/html/main.html');
		} else {
			alert(response.statusText);
		}
		loginEmail.value = '';
		loginPassword.value = '';
	} catch (e) {
		if (e.response.status == 404) {
			alert('You are not existing user please signup first');
			setTimeout(() => {
				window.location.replace('/html/signup.html');
			}, 1000);
		} else if (e.response.status == 401) {
			alert('Invalid credentials');
		} else {
			alert(e.response.data.message);
		}
	}
}
