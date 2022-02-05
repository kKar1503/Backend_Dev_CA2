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

function showProductList() {
	axios
		.get(
			// the backend api we want to hit
			'http://localhost:3000/product'
		)
		.then((res) => {
			let products = res.data;
			products.forEach((product) => {
				let productHTML = `
						<!-- product post start here -->
						<div class="product-post">
							<!-- img holder start here -->
							<div class="img-holder">
								<img src="product/${product.image_file_name}" alt="image description">
							</div><!-- img holder end here -->
							<!-- txt holder start here -->
							<div class="txt-holder">
								<!-- align left start here -->
								<div class="align-left">
									<strong class="title"><a href="product-detail.html">${product.name}</a></strong>
									<span class="price"><i class="fa fa-eur"></i> ${product.price}</span>
									<p>${product.description}</p>
								</div><!-- align left end here -->
								<!-- align right start here -->
								<div class="align-right">
									<ul class="list-unstyled rating-list">
										<li class="active"><a href="#"><i class="fa fa-star"></i></a></li>
										<li class="active"><a href="#"><i class="fa fa-star"></i></a></li>
										<li class="active"><a href="#"><i class="fa fa-star"></i></a></li>
										<li><a href="#"><i class="fa fa-star-o"></i></a></li>
										<li>Reviews (12)</li>
									</ul>
									<a href="#" class="btn-cart">ADD TO CART</a>
									<ul class="list-unstyled nav">
										<li><a href="#"><i class="fa fa-heart"></i> ADD TO WISHLIST</a></li>
										<li><a href="#"><i class="fa fa-exchange"></i> COMPARE</a></li>
									</ul>
								</div><!-- align right end here -->
							</div><!-- txt holder end here -->
						</div><!-- product post end here -->
							`;

				$('#productList').append(productHTML);
			});
		})
		.catch((err) => console.error(err)); // res.data just get the data
}

// call func to get all the categories
showProductCate();
showBrandFilter();
showProductList();
// // Event listeners
// document.getElementById('categories').innerHTML(getCates());

// const params = new URLSearchParams(document.location.search);
// const category = params.get('category');
// console.log(category);
