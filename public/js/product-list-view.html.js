const params = new URLSearchParams(document.location.search);
if (params.get('pageNum') == null) {
	window.location.href = `./product?pageNum=1`; //default go to page 1
}
const pageNum = params.get('pageNum');
console.log(pageNum); // check which page

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
								<input id="check-${index + 1}" type="checkbox" class="choosedBrand">
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
			// one page contain 7 products
			for (let i = 0 + 7 * (pageNum - 1); i < 7 * pageNum && i < products.length; i++) {
				let productHTML = `
						<!-- product post start here -->
						<div class="product-post">
							<!-- img holder start here -->
							<div href="#" id='specProduct-${products[i].productid}' class="img-holder">
								<img src="http://localhost:3000/product/image/${products[i].productid}" alt="image description" style='width: auto; height:200px'>
							</div><!-- img holder end here -->
							<!-- txt holder start here -->
							<div class="txt-holder">
								<!-- align left start here -->
								<div class="align-left">
									<strong class="title"><a href="http://localhost:3001/product/detail?productid=${products[i].productid}">${products[i].name}</a></strong>
									<span class="price"><i class="fa fa-dollar"></i> ${products[i].price}</span>
									<p>${products[i].description}</p>
								</div><!-- align left end here -->
								<!-- align right start here -->
									<a href="#" class="btn-cart">ADD TO CART</a>
							</div><!-- txt holder end here -->
						</div><!-- product post end here -->
							`;

				$j('#productList').append(productHTML);
			}
		})
		.catch((err) => console.error(err)); // res.data just get the data
}

function searchByProduct(productName) {
	axios
		.get(
			// the backend api we want to hit
			`http://localhost:3000/product/name/${productName}`
		)
		.then((res) => {
			let product = res.data;

			console.log(product);
			let productHTML = `
					<!-- product post start here -->
					<div class="product-post">
						<!-- img holder start here -->
						<div href="#" id='specProduct-${product.productid}' class="img-holder">
							<img src="http://localhost:3000/product/image/${product.productid}" alt="image description" style='width: auto; height:200px'>
						</div><!-- img holder end here -->
						<!-- txt holder start here -->
						<div class="txt-holder">
							<!-- align left start here -->
							<div class="align-left">
								<strong class="title"><a href="http://localhost:3001/product/detail?productid=${product.productid}">${productName}</a></strong>
								<span class="price"><i class="fa fa-dollar"></i> ${product.price}</span>
								<p>${product.description}</p>
							</div><!-- align left end here -->
							<!-- align right start here -->
								<a href="#" class="btn-cart">ADD TO CART</a>
						</div><!-- txt holder end here -->
					</div><!-- product post end here -->
						`;
			// $j('#productList').append(productHTML);
			// $j{'productHTML'}.replaceAll('#productList');
			$('#productList').replaceWith(productHTML);
		})
		.catch((err) => {
			console.log(err);
			console.log(err.response.status === 404);
			if (err.response.status == 404) {
				window.location.href = `/404`;
			}
			// console.err(err);
			else {
				window.location.href = `/500`;
			}
		}); // res.data just get the data
}

function getProByBrand() {
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
						console.log('helllooooooooooo');
						console.log(res2.data);
						let products = res2.data;
						//used for products of each specific brand

						$(`#check-${index + 1}`).change(function () {
							if (this.checked) {
								let productHTML;
								products.forEach((product) => {
									console.log('?????????????????');

									productHTML += `
											<!-- product post start here -->
											<div class="product-post">
												<!-- img holder start here -->
												<div href="#" id='specProduct-${product.productid}' class="img-holder">
													<img src="http://localhost:3000/product/image/${product.productid}" alt="image description" style='width: auto; height:200px'>
												</div><!-- img holder end here -->
												<!-- txt holder start here -->
												<div class="txt-holder">
													<!-- align left start here -->
													<div class="align-left">
														<strong class="title"><a href="http://localhost:3001/product/detail?productid=${product.productid}">${product.name}</a></strong>
														<span class="price"><i class="fa fa-dollar"></i> ${product.price}</span>
														<p>${product.description}</p>
													</div><!-- align left end here -->
													<!-- align right start here -->
														<a href="#" class="btn-cart">ADD TO CART</a>
												</div><!-- txt holder end here -->
											</div><!-- product post end here -->
												`;
									// $j('#productList').append(productHTML);
									// $j{'productHTML'}.replaceAll('#productList');
								});
								$('#productList').replaceWith(productHTML);
							}
						});
					})
					.catch((err) => console.error(err));
			});
		}) // res.data just get the data
		.catch((err) => console.error(err));
}
// call func to get all the categories
showProductCate();
showBrandFilter();
showProductList();
// getProByBrand();
// const params = new URLSearchParams(document.location.search);
// const category = params.get('category');
// console.log(category);

$j(document).on('click', '.img-holder', function () {
	localStorage.setItem('productID', parseInt($j(this).attr('id').substring(11)));
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

$j('#searchProduct').submit((event) => {
	// # is id, . is class
	//  The submit event occurs when a form is submitted.
	//  This event can only be used on <form> elements.

	console.log('submiting');
	// prevent page reload
	event.preventDefault();
	const productName = $j('#productName').val();
	console.log(productName);
	searchByProduct(productName);
});

// <strong class="title"><a href="http://localhost:3001/product/detail?productid=${product.productid}">${product.name}</a></strong>
// /product/detail?${$.param(paramObj)}

//-------------------------------------------------------------------------
// $j(document).on('click', '.choosedBrand', function () {
// 	axios
// 		.get(
// 			// the backend api we want to hit
// 			'http://localhost:3000/products/distinctBrand'
// 		)
// 		.then((res) => {
// 			let brands = res.data;
// 			brands.forEach((brand, index) => {
// 				axios
// 					.get(
// 						// the backend api we want to hit
// 						`http://localhost:3000/product/brand/${brand.brand}`
// 					)
// 					.then((res2) => {
// 						console.log('helllooooooooooo');
// 						console.log(res2.data);
// 						let products = res2.data;
// 						//used for products of each specific brand

// 						$(`#check-${index + 1}`).change(function () {
// 							if (this.checked) {
// 								let productHTML;
// 								products.forEach((product) => {
// 									console.log('?????????????????');

// 									productHTML += `
// 											<!-- product post start here -->
// 											<div class="product-post">
// 												<!-- img holder start here -->
// 												<div href="#" id='specProduct-${product.productid}' class="img-holder">
// 													<img src="http://localhost:3000/product/image/${product.productid}" alt="image description" style='width: auto; height:200px'>
// 												</div><!-- img holder end here -->
// 												<!-- txt holder start here -->
// 												<div class="txt-holder">
// 													<!-- align left start here -->
// 													<div class="align-left">
// 														<strong class="title"><a href="http://localhost:3001/product/detail?productid=${product.productid}">${product.name}</a></strong>
// 														<span class="price"><i class="fa fa-dollar"></i> ${product.price}</span>
// 														<p>${product.description}</p>
// 													</div><!-- align left end here -->
// 													<!-- align right start here -->
// 														<a href="#" class="btn-cart">ADD TO CART</a>
// 												</div><!-- txt holder end here -->
// 											</div><!-- product post end here -->
// 												`;
// 									// $j('#productList').append(productHTML);
// 									// $j{'productHTML'}.replaceAll('#productList');
// 								});
// 								$('#productList').replaceWith(productHTML);
// 							}
// 						});
// 					})
// 					.catch((err) => console.error(err));
// 			});
// 		}) // res.data just get the data
// 		.catch((err) => console.error(err));

// 	// totalStars = parseInt($j(this).attr('id').substring(5));
// 	// // console.log(totalStars);
// 	// for (i = 1; i <= 5; i++) {
// 	// 	if (i <= totalStars) {
// 	// 		console.log(`i is less than totalStars`);
// 	// 		if ($j(`#star-${i}`).hasClass('fa-star-o')) {
// 	// 			$j(`#star-${i}`).toggleClass('fa-star-o fa-star');
// 	// 			console.log(`star-${i} has fa-star-o`);
// 	// 		}
// 	// 	} else {
// 	// 		console.log(`i is more than totalStars`);
// 	// 		if ($j(`#star-${i}`).hasClass('fa-star')) {
// 	// 			$j(`#star-${i}`).toggleClass('fa-star fa-star-o');
// 	// 			console.log(`star-${i} has fa-star`);
// 	// 		}
// 	// 	}
// 	// }
// });

$j(document).on('click', '.choosedBrand', async function () {
	let checked = parseInt($j(this).attr('id').substring(6)); // the distinct brand be selected
	let allBrands;
	let brandsName = [];
	let selectedBrandName;
	await axios
		.get(
			// the backend api we want to hit
			'http://localhost:3000/products/distinctBrand' //get all brand first
		)
		.then((res) => {
			allBrands = res.data;
			selectedBrandName = allBrands[checked - 1];
			// allBrands.forEach((brand, index) => {
			// 	brandsName.push(brand.brand);
			// });
			console.log(selectedBrandName);

			let products = [];
			// console.log('hhhhh');
			// for (let i = 0; i < brandsName.length; i++) {
			// 	console.log('????');

			axios
				.get(
					// the backend api we want to hit
					`http://localhost:3000/product/brand/${selectedBrandName}`
				)
				.then((res2) => {
					console.log('helllooooooooooo');
					console.log(res2.data);
					products.push(res2.data);
					//used for products of each specific brand
				})
				.catch((err) => console.error(err));

			console.log(products);
			let productHTML = ``;
			products.forEach((product) => {
				console.log('?????????????????');

				productHTML += `
						<!-- product post start here -->
						<div class="product-post">
							<!-- img holder start here -->
							<div href="#" id='specProduct-${product.productid}' class="img-holder">
								<img src="http://localhost:3000/product/image/${product.productid}" alt="image description" style='width: auto; height:200px'>
							</div><!-- img holder end here -->
							<!-- txt holder start here -->
							<div class="txt-holder">
								<!-- align left start here -->
								<div class="align-left">
									<strong class="title"><a href="http://localhost:3001/product/detail?productid=${product.productid}">${product.name}</a></strong>
									<span class="price"><i class="fa fa-dollar"></i> ${product.price}</span>
									<p>${product.description}</p>
								</div><!-- align left end here -->
								<!-- align right start here -->
									<a href="#" class="btn-cart">ADD TO CART</a>
							</div><!-- txt holder end here -->
							</div><!-- product post end here -->
							`;
			});
			// }

			$('#productList').append(productHTML);
		}) // res.data just get the data
		.catch((err) => console.error(err));
	// $j('#productList').append(productHTML);
	// $j{'productHTML'}.replaceAll('#productList');
});

// $j(document).on('click', '.clickable-stars', function () {
// 	totalStars = parseInt($j(this).attr('id').substring(5));
// 	// console.log(totalStars);
// 	for (i = 1; i <= 5; i++) {
// 		if (i <= totalStars) {
// 			console.log(`i is less than totalStars`);
// 			if ($j(`#star-${i}`).hasClass('fa-star-o')) {
// 				$j(`#star-${i}`).toggleClass('fa-star-o fa-star');
// 				console.log(`star-${i} has fa-star-o`);
// 			}
// 		} else {
// 			console.log(`i is more than totalStars`);
// 			if ($j(`#star-${i}`).hasClass('fa-star')) {
// 				$j(`#star-${i}`).toggleClass('fa-star fa-star-o');
// 				console.log(`star-${i} has fa-star`);
// 			}
// 		}
// 	}
// });

// <ul id="brandFilter" class="list-unstyled nice-form">
// 						<li>
// 							<label for="check-1">
// 								<input id="check-1" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Microsoft</span>
// 							</label>
// 							<span class="num">3</span>
// 						</li>

// 						<li>
// 							<label for="check-3">
// 								<input id="check-3" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Lenovo</span>
// 							</label>
// 							<span class="num">1</span>
// 						</li>

// 						<li>
// 							<label for="check-4">
// 								<input id="check-4" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Acer</span>
// 							</label>
// 							<span class="num">1</span>
// 						</li>

// 						<li>
// 							<label for="check-5">
// 								<input id="check-5" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Apple</span>
// 							</label>
// 							<span class="num">5</span>
// 						</li>

// 						<li>
// 							<label for="check-6">
// 								<input id="check-6" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Google</span>
// 							</label>
// 							<span class="num">1</span>
// 						</li>

// 						<li>
// 							<label for="check-7">
// 								<input id="check-7" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Corsair</span>
// 							</label>
// 							<span class="num">2</span>
// 						</li>

// 						<li>
// 							<label for="check-8">
// 								<input id="check-8" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Logitech</span>
// 							</label>
// 							<span class="num">2</span>
// 						</li>

// 						<li>
// 							<label for="check-2">
// 								<input id="check-2" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">SAMSUNG</span>
// 							</label>
// 							<span class="num">6</span>
// 						</li>

// 						<li>
// 							<label for="check-9">
// 								<input id="check-9" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Seagate</span>
// 							</label>
// 							<span class="num">3</span>
// 						</li>

// 						<li>
// 							<label for="check-10">
// 								<input id="check-10" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Western Digital</span>
// 							</label>
// 							<span class="num">2</span>
// 						</li>

// 						<li>
// 							<label for="check-11">
// 								<input id="check-11" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Bose</span>
// 							</label>
// 							<span class="num">2</span>
// 						</li>

// 						<li>
// 							<label for="check-12">
// 								<input id="check-12" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Sony</span>
// 							</label>
// 							<span class="num">1</span>
// 						</li>

// 						<li>
// 							<label for="check-13">
// 								<input id="check-13" type="checkbox" class="choosedBrand">
// 								<span class="fake-input"></span>
// 								<span class="fake-label">Jabra</span>
// 							</label>
// 							<span class="num">1</span>
// 						</li>
// 							</ul>
