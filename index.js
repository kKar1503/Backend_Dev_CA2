const express = require('express');
const app = express();
app.use(express.static('public')); // to link the css style sheet

app.get('/', (req, res) => {
	res.sendFile('/public/homepage.html', { root: __dirname });
});

app.get('/users/:id', (req, res) => {
	res.sendFile('/public/loginpage.html', { root: __dirname });
});

app.get('/users/', (req, res) => {
	res.sendFile('/public/loginpage.html', { root: __dirname });
});

app.get('/login/', (req, res) => {
	res.sendFile('/public/loginpage.html', { root: __dirname });
});

app.get('/register/', (req, res) => {
	res.sendFile('/public/registerpage.html', { root: __dirname });
});

const PORT = 3001; // client side port, 3000 is db side
var hostname = 'localhost';

app.listen(PORT, hostname, () => {
	console.log(`Server started and accessible via http://${hostname}:${PORT}/`);
});