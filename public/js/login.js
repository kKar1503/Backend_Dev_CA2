// Event Listener on Login Button
$j(document).on('click', '#btn-login', function (e) {
	e.preventDefault();
	const [username, password, remember] = retrieveLoginInfo();
	axios
		.post('http://localhost:4000/login', { username: username, password: password, remember: remember })
		.then((res) => localStorage.setItem('accessToken', res.data.accessToken))
		.catch((err) => console.error(err));
});

/**
 *  Function to return username, password & rememberme
 *  @returns {*[]} Username, Password & Remember Me
 */
function retrieveLoginInfo() {
	const username = $j('#username').val();
	const password = $j('#password').val();
	const remember = $j('#check1').is(':checked');
	return [username, password, remember];
}
