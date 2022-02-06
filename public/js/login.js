// Event Listener on Login Button
$j(document).on('click', '#btn-login', function (e) {
	e.preventDefault();
	const [username, password, remember] = retrieveLoginInfo();
	axios
		.post('http://localhost:4000/login', { username: username, password: password, remember: remember })
		.then((res) => {
			console.log(res);
			localStorage.setItem('accessToken', res.data.accessToken);
			localStorage.setItem('refreshToken', res.data.refreshToken);
			$j('#not-logged-in').hide();
			$j('#logged-in-name-field').text(username);
			$j('#logged-in').show();
		})
		.catch((err) => {
			console.error(err);
			alert('Somethig went wrong, please try again!');
		});
});

// Event Listener on Signup Button
$j(document).on('click', '#btn-signup', function (e) {
	e.preventDefault();
	const [username, email, contact, password, password2, picUrl, type] = retrieveSignupInfo();
	if (password !== password2) {
		alert('Password mismatch!');
	} else if (!validateEmail) {
		alert('Please check the format of your email!');
	} else if (isNaN(contact)) {
		alert('Please enter only number for your contact number!');
	} else {
		axios
			.post('http://localhost:3000/users', {
				username: username,
				email: email,
				contact: contact,
				password: password,
				type: type,
				profile_pic_url: picUrl,
			})
			.then(() => {
				clearSignupInfo();
				alert('New account is created!');
			})
			.catch((err) => {
				console.error(err);
				alert('Somethig went wrong, please try again!');
			});
	}
});

$j(document).on('click', '#btn-logout', function (e) {
	e.preventDefault();
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('accessToken');
	$j('#not-logged-in').show();
	$j('#logged-in').hide();
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

/**
 *  Function to get signup information
 *  @returns {*[]} Signup Info
 */
function retrieveSignupInfo() {
	const username = $j('#suUsername').val();
	const email = $j('#suEmail').val();
	const contact = $j('#suContact').val();
	const password = $j('#suPassword').val();
	const password2 = $j('#suPassword2').val();
	const picUrl = `https://www.profilepic.com/${username}.jpg`;
	const type = 'Customer';

	return [username, email, contact, password, password2, picUrl, type];
}

/**
 *  Function to clear signup information
 */
function clearSignupInfo() {
	$j('#suUsername').val('');
	$j('#suEmail').val('');
	$j('#suContact').val('');
	$j('#suPassword').val('');
	$j('#suPassword2').val('');
}

/**
 *
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
	const re =
		/^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

	return re.test(email);
}
