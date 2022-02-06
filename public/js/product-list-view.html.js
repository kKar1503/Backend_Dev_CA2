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

						$j('#categories').append(productCateHTML);
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
						$j('#brandFilter').append(filterBrandHTML);
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
				// this is use db port
				let productHTML = `
						<!-- product post start here -->
						<div class="product-post">
							<!-- img holder start here -->
							<div href="#" id='specProduct-${product.productid}' class="img-holder">
								<img src="http://localhost:3000/product/image/${product.productid}" alt="image description">
							</div><!-- img holder end here -->
							<!-- txt holder start here -->
							<div class="txt-holder">
								<!-- align left start here -->
								<div class="align-left"> 
									<strong class="title"><a href="http://localhost:3000/product/image/${product.productid}">${product.name}</a></strong>
									<span class="price"><i class="fa fa-dollar"></i> ${product.price}</span>
									<p>${product.description}</p>
								</div><!-- align left end here -->
								<!-- align right start here -->
								<div id='avgRating' class="align-right">
									
									<a href="#" class="btn-cart">ADD TO CART</a>
								</div><!-- align right end here -->
							</div><!-- txt holder end here -->
						</div><!-- product post end here -->
							`;

				$j('#productList').append(productHTML);
			});
		})
		.catch((err) => console.error(err)); // res.data just get the data
}

// call func to get all the categories
showProductCate();
showBrandFilter();
showProductList();

// const params = new URLSearchParams(document.location.search);
// const category = params.get('category');
// console.log(category);

$j(document).on('click', '.img-holder', function () {
	localStorage.setItem(
		'productID',
		parseInt($j(this).attr('id').substring(11))
	);
	paramObj = new Object();
	paramObj.productid = parseInt($j(this).attr('id').substring(12));
	// paramObj.brand =
	window.location.href = `/product/detail?${$.param(paramObj)}`;
});

// $j(document).on('click', '.category', function () {
// 	localStorage.setItem('productCategory', parseInt($j(this).attr('id').substring(9)));
// 	paramObj = new Object();
// 	paramObj.category = parseInt($j(this).attr('id').substring(9));
// 	// paramObj.brand =
// 	window.location.href = `/product?${$.param(paramObj)}`;
// });
