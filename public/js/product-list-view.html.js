// GET all categories
function getCates() {
	// axios({
	// 	method: 'get',
	// 	// the backend api we want to hit
	// 	url: 'https://jsonplaceholder.typicode.com/todos',
	// 	params: {
	// 		_limit: 5, // only get 5 back on html
	// 	},
	// })
	// 	.then((res) => showOutput(res)) // res.data just get the data
	// 	.catch((err) => console.error(err));

	axios
		.get(
			// the backend api we want to hit
			'http://localhost:3000/category'
		)
		.then((res) => showProductCate(res)) // res.data just get the data
		.catch((err) => console.error(err));
}

// Show output in browser
function showProductCate() {
	axios
		.get(
			// the backend api we want to hit
			'http://localhost:3000/category'
		)
		.then((res) => {
			let categories = res.data;
			categories.forEach((category) => {
				axios
					.get(
						// the backend api we want to hit
						`http://localhost:3000/product/category/${category.categoryid}`
					)
					.then((res2) => {
						let numProducts = res2.data.length;

						let productCateHTML = `
							<li>
								<a href="#">
									<span class="name">${category.category}</span>
									<span class="num">${numProducts}</span>
								</a>
							</li>
							`;

						$('#categories').append(productCateHTML);
					})
					.catch((err) => console.error(err));
			});
		}) // res.data just get the data
		.catch((err) => console.error(err));
}

function showBrandFilter() {
	axios
		.get(
			// the backend api we want to hit
			'http://localhost:3000/products/distinctBrand'
		)
		.then((res) => {
			let brands = res.data;
			brands.forEach((brand, index) => {
				axios
					.get(
						// the backend api we want to hit
						`http://localhost:3000/product/brand/${brand.brand}`
					)
					.then((res2) => {
						let numProducts = res2.data.length;
						let filterBrandHTML = `
						<li>
							<label for="check-${index + 1}">
								<input id="check-${index + 1}" type="checkbox">
								<span class="fake-input"></span>
								<span class="fake-label">${brand.brand}</span>
							</label>
							<span class="num">${numProducts}</span>
						</li>
							`;
						// console.log(filterBrandHTML);
						$('#brandFilter').append(filterBrandHTML);
					})
					.catch((err) => console.error(err));
			});
		}) // res.data just get the data
		.catch((err) => console.error(err));
}

// call func to get all the categories
showProductCate();
showBrandFilter();
// // Event listeners
// document.getElementById('categories').innerHTML(getCates());
