// Event Listener on Login Button
$j(document).on('click', '#btn-login', function (e) {
	e.preventDefault();
	const [username, password] = retrieveLoginInfo();
	axios.post('http://localhost:3000/');
});

/**
 *  Function to return username and password
 *  @returns {string[]} username and Password
 */
function retrieveLoginInfo() {
	const username = $j('#username').val();
	const password = $j('#password').val();
	return [username, password];
}
