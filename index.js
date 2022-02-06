const express = require('express');
const app = express();
app.use(express.static('public')); // to link the css style sheet

app.get('/', (req, res) => {
	res.sendFile('/public/index.html', { root: __dirname });
});

// Find all the products
app.get('/product', (req, res) => {
	res.sendFile('/public/product-list-view.html', { root: __dirname });
});

// Specific product detail
app.get('/product/detail', (req, res) => {
	res.sendFile('/public/product-detail.html', { root: __dirname });
});

// About-us page
app.get('/about', (req, res) => {
	res.sendFile('/public/about-us.html', { root: __dirname });
});

// About-us page
app.get('/401', (req, res) => {
	res.sendFile('/public/401.html', { root: __dirname });
});

// About-us page
app.get('/403', (req, res) => {
	res.sendFile('/public/403.html', { root: __dirname });
});

// About-us page
app.get('/404', (req, res) => {
	res.sendFile('/public/404.html', { root: __dirname });
});

// About-us page
app.get('/500', (req, res) => {
	res.sendFile('/public/500.html', { root: __dirname });
});

// app.get('/users/', (req, res) => {
// 	res.sendFile('/public/loginpage.html', { root: __dirname });
// });

// app.get('/login', (req, res) => {
// 	res.sendFile('/public/loginpage.html', { root: __dirname });
// });

// app.get('/register/', (req, res) => {
// 	res.sendFile('/public/registerpage.html', { root: __dirname });
// });

const PORT = 3001; // client side port, 3000 is db side
var hostname = 'localhost';

app.listen(PORT, hostname, () => {
	console.log(`Server started and accessible via http://${hostname}:${PORT}/`);
});
