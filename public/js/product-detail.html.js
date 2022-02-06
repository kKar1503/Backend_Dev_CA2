const params = new URLSearchParams(document.location.search);
if (params.get('productid') == null) {
	window.location.href = `/404-not-found`;
}
const productID = params.get('productid');
console.log(productID);

function showProductDetail() {
	axios
		.get(
			// the backend api we want to hit
			`http://localhost:3000/product/${productID}`
		)
		.then((res) => {
			let product = res.data;
			// this is use db port
			let proDetailHTML = `
            <div class="col-xs-12">
            <!-- Slider of the Page -->
            <div class="slider">
                <!-- Product Slider of the Page -->
                <div class="product-slider">
                    <div class="slide">
                        <img src="http://localhost:3000/product/image/${productID}" alt="image descrption"
                            style="width:auto; max-height: 300px; margin-top: 55px;">
                    </div>
                </div>
                <!-- Product Slider of the Page end -->
            </div>
            <!-- Slider of the Page end -->
            <!-- Detail Holder of the Page -->
            <div class="detial-holder">
                <!-- Breadcrumbs of the Page -->
                <ul class="list-unstyled breadcrumbs">
                    <li><a href="#">Chairs <i class="fa fa-angle-right"></i></a></li>
                    <li>Products</li>
                </ul>
                <!-- Breadcrumbs of the Page end -->
                <h2>${product.name}</h2>
                <!-- Rank Rating of the Page -->
                <div id = 'avgRating' class="rank-rating">

                </div>
                <!-- Rank Rating of the Page end -->
                <div class="text-holder">
                    <span class="price">$ ${product.price} <span style='margin-left:50px'>${product.brand}</span><span style='margin-left:50px'>${product.categoryname}</span></span>
                </div>
                <!-- Product Form of the Page -->
                <form action="#" class="product-form" style="margin-bottom: 40px">
                    <fieldset>
                        <div class="row-val">
                            <label for="qty">qty</label>
                            <input type="number" id="qty" placeholder="1">
                        </div>
                        <div class="row-val">
                            <button type="submit">ADD TO CART</button>
                        </div>
                    </fieldset>
                </form>
                <div class="txt-wrap">
                    <p>${product.description}</p>
                </div>
            </div>
            <!-- Detail Holder of the Page end -->
        </div>
							`;

			$j('#productDetail').append(proDetailHTML);
		})
		.catch((err) => {
			// console.log(err.response.status === 404);
			if (err.response.status == 404) {
				window.location.href = `/404-not-found`;
			}
			// console.err(err);
			else {
				window.location.href = `/500-server-error`;
			}
		}); // res.data just get the data
}

function showAvgRating() {
	axios
		.get(
			// the backend api we want to hit
			`http://localhost:3000/product/${productID}/reviews`
		)
		.then((res) => {
			let ratingHTML = ``;
			let reviews = res.data;
			let numReview = res.data.length;

			let totalRating = reviews.reduce(
				(sum, reviews) => sum + reviews.rating,
				0
			);
			// console.log(reviews);
			let avgRating = Math.round(totalRating / numReview);
			for (let i = 1; i <= 5; i++) {
				if (avgRating >= i) {
					ratingHTML += `
                    <li><a href="#"><i class="fa fa-star"></i></a></li>`;
				} else {
					ratingHTML += `<li><a href="#"><i class="fa fa-star-o"></i></a></li>`;
				}
			}

			// console.log(ratingHTML);
			// this is use db port
			let avgReview = `
                <span class="total-price">Reviews (${numReview})</span>
                <ul class="list-unstyled rating-list">
                    ${ratingHTML}
                </ul>
                `;

			$j('#avgRating').append(avgReview);
			$j('#numReviews').append(
				`
					REVIEWS (${numReview})
				`
			);
		})
		.catch((err) => {
			console.log(err);
			if ((err.status = 404)) {
				let ratingHTML = ``;
				for (let i = 1; i <= 5; i++) {
					ratingHTML += `<li><a href="#"><i class="fa fa-star-o"></i></a></li>`;
				}
				let numReview = 0;
				let avgReview = `
                <span class="total-price">Reviews (${numReview})</span>
                <ul class="list-unstyled rating-list">
                    ${ratingHTML}
                </ul>
                `;

				$j('#avgRating').append(avgReview);
				$j('.numReviews').append(
					`<a href="#tab2">
                        REVIEWS (${numReview})
                    </a>`
				);
			}
		}); // res.data just get the data
}

function showBottomReview() {
	axios
		.get(
			// the backend api we want to hit
			`http://localhost:3000/product/${productID}/reviews`
		)
		.then((res) => {
			let reviews = res.data;
			// console.log(reviews);
			reviews.forEach((review) => {
				console.log(review);
				let rating = parseInt(review.rating);
				let ratingHTML = ``;

				for (let i = 1; i <= 5; i++) {
					if (rating >= i) {
						ratingHTML += `
                        <li><i class="fa fa-star"></i></li>`;
					} else {
						ratingHTML += `<li><i class="fa fa-star-o"></i></li>`;
					}
				}
				console.log(ratingHTML);
				// this is use db port
				let proReviewBottom = `
                    <div class="mt-box">
                        <div class="mt-hold">
                            <ul class="mt-star">
                                ${ratingHTML}
                            </ul>
                            <span class="name">${review.username}</span>
                            <time datetime="2016-01-01">${review.created_at}</time>
                        </div>
                        <p>
                        ${review.review}
                        </p>
                    </div>
                    `;

				$j('#reviewsDetail').before(proReviewBottom);
			});
		})
		.catch((err) => console.error(err)); // res.data just get the data
}

showProductDetail();
showAvgRating();
showBottomReview();

$j('#productReview').submit((event) => {
	let d = new Date();
	let date =
		d.getDate().toString() +
		(d.getMonth() + 1).toString() +
		d.getFullYear().toString();
	let t =
		('0' + d.getHours()).slice(-2) +
		('0' + d.getMinutes()).slice(-2) +
		('0' + d.getSeconds()).slice(-2) +
		('00' + d.getMilliseconds()).slice(-3);
	let created_at = date + ' ' + t;
	console.log(created_at);
	// # is id, . is class
	//  The submit event occurs when a form is submitted.
	//  This event can only be used on <form> elements.

	console.log('submiting');
	// prevent page reload
	event.preventDefault();
	const review = $j('#review').val();
	console.log(review);
	saveReview(2, productid, 3);
	// userid, rating, review, productid;
});

function saveReview(userid, rating, review) {
	axios
		.post(
			// the backend api we want to hit
			`http://localhost:3000/product/${productID}/review`,
			{
				userid: userid,
				rating: rating,
				review: review,
				productid: productID,
			}
		)
		.then((res) => {
			console.log(res);
			alert('Your review is sent successfully!');
		})
		.catch((err) => console.error(err)); // res.data just get the data
}
