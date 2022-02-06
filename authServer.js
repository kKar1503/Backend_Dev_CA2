//----------------------------------------
// BackEnd Web Development Assignment 1
// Students:        Li Kehan & Yam Kar Lok
// Admission No:    P2111575 & P2123181
// Class:           DIT/FT/1B/04
// Filename:        authServer.js
//----------------------------------------

//----------------------------------------
// Imports
//----------------------------------------
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const port = 4000;
const hostname = 'localhost';
const Login = require('./model/login.js');
const cors = require('cors');
app.use(cors());

app.use(express.json());

//----------------------------------------
// Configurations for bodyParser
//----------------------------------------
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//----------------------------------------
// MF Configurations
//----------------------------------------
app.use(urlencodedParser); // Attach body-parser middleware
app.use(jsonParser); // Parse JSON data

//----------------------------------------
// Start of Login/API Key Endpoints

// GET Token [Done]
// http://localhost:4000/login

app.post('/login', function (req, res) {
	let userData = {
		user: req.body.username,
		pass: req.body.password,
	};
	let remember = req.body.remember;
	Login.authenticate(userData, function (err, result) {
		if (err) {
			res.status(500).send('Internal Server Error!');
		} else if (result.length == 0) {
			res.status(401).send('User does not exist!');
		} else if (result[0].password !== userData.pass) {
			res.status(401).send('Invalid Password!');
		} else if (result[0].type === 'Customer') {
			res.status(403).send('You are not allowed to access Admin API Keys.');
		} else {
			delete userData.pass;
			userData.type = result[0].type;
			userData.userid = result[0].userid;
			let accessToken = generateAccessToken(userData);
			if (remember) {
				let refreshToken = generateRefreshToken(userData);
				Login.addRefreshToken(refreshToken, userData.userid, function (err, result) {
					if (err) {
						console.log(err);
						res.status(500).send('Internal Server Error!');
					} else {
						res.status(201).json({ accessToken: accessToken });
					}
				});
			} else {
				res.status(200).json({ accessToken: accessToken });
			}
		}
	});
});

// Generate new Access Token [Done]
// http://localhost:4000/token

app.post('/token', function (req, res) {
	const userid = req.body.userid;
	Login.getRefreshToken(userid, function (err, result) {
		if (err) {
			console.log('1');
			console.log(err);
			res.sendStatus(500);
		} else if (result.refresh_token == null) {
			console.log('2');
			console.log(result);
			res.sendStatus(401);
		} else {
			console.log('3');
			console.log(result);
			jwt.verify(result.refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
				if (err) return res.sendStatus(403);
				const accessToken = generateAccessToken({ userid: user.userid, user: user.user, type: user.type });
				res.json({ accessToken: accessToken });
			});
		}
	});
});

// DELETE Refresh Token [Done]
// http://localhost:4000/token

app.delete('/logout', function (req, res) {
	const refreshToken = req.body.token;
	if (refreshToken == null) return res.sendStatus(401);
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		const accessToken = generateAccessToken({ userid: user.userid, user: user.user, type: user.type });
		res.json({ accessToken: accessToken });
	});
});

// End of Login/API Key Endpoints
//----------------------------------------

/**
 *
 *  @param {object} user User Object
 *  @returns {string} Access Token
 */
function generateAccessToken(user) {
	let accessToken;
	if (user.type === 'SuperAdmin') {
		accessToken = jwt.sign(user, process.env.SECRET_KEY);
	} else {
		accessToken = jwt.sign(user, process.env.SECRET_KEY, {
			expiresIn: process.env.TOKEN_EXPIRY,
		});
	}
	return accessToken;
}

/**
 *
 *  @param {object} user User Object
 *  @returns {string} Refresh Token
 */
function generateRefreshToken(user) {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1m' });
}

app.listen(port, hostname, () => {
	console.log(`Authentication server started and accessible via http://${hostname}:${port}/`);
});
