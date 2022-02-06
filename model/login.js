//----------------------------------------
// BackEnd Web Development Assignment 1
// Students:        Li Kehan & Yam Kar Lok
// Admission No:    P2111575 & P2123181
// Class:           DIT/FT/1B/04
// Filename:        login.js
//----------------------------------------

//----------------------------------------
// Imports
//----------------------------------------
const db = require('./databaseConfig.js');

//----------------------------------------
// Main Code Implementations
//----------------------------------------
let Login = {
	authenticate: function (loginData, callback) {
		var dbConn = db.getConnection();
		dbConn.connect(function (err) {
			if (err) {
				return callback(err, null);
			} else {
				const sql = `SELECT userid, password, type FROM user WHERE username = ?`;
				dbConn.query(sql, loginData.user, (err, result) => {
					dbConn.end();
					if (err) {
						return callback(err, null);
					}
					return callback(null, result);
				});
			}
		});
	},
	addRefreshToken: function (refreshToken, uid, callback) {
		var dbConn = db.getConnection();
		dbConn.connect(function (err) {
			if (err) {
				return callback(err, null);
			} else {
				const sql = `UPDATE
								user
							SET
								refresh_token = ?
							WHERE
								userid = ?`;
				dbConn.query(sql, [refreshToken, uid], (err, result) => {
					dbConn.end();
					if (err) {
						return callback(err, null);
					}
					return callback(null, result);
				});
			}
		});
	},
	getRefreshToken: function (uid, callback) {
		var dbConn = db.getConnection();
		dbConn.connect(function (err) {
			if (err) {
				return callback(err, null);
			} else {
				const sql = `SELECT refresh_token FROM user WHERE userid = ?`;
				dbConn.query(sql, uid, (err, result) => {
					dbConn.end();
					if (err) {
						return callback(err, null);
					}
					return callback(null, result);
				});
			}
		});
	},
	deleteRefreshToken: function (uid, callback) {
		var dbConn = db.getConnection();
		dbConn.connect(function (err) {
			if (err) {
				return callback(err, null);
			} else {
				const sql = `UPDATE
								user
							SET
								refresh_token = null
							WHERE
								userid = ?`;
				dbConn.query(sql, uid, (err, result) => {
					dbConn.end();
					if (err) {
						return callback(err, null);
					}
					return callback(null, result);
				});
			}
		});
	},
};

//----------------------------------------
// Module Export
//----------------------------------------
module.exports = Login;
