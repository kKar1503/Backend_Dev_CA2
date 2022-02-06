const params = new URLSearchParams(document.location.search);
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
                            style="margin-top: 55px;">
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
                    <span class="price">$ ${product.price} <span style='margin-left:100px'>${product.brand}</span></span>
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
		.catch((err) => console.error(err)); // res.data just get the data
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
				`<a href="#tab2" class=''>
					REVIEWS (${numReview})
				</a>`
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
				$j('#numReviews').append(
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
                    </div>;
                    `;

				$j('#reviewsDetail').append(proReviewBottom);
			});
		})
		.catch((err) => console.error(err)); // res.data just get the data
}

showProductDetail();
showAvgRating();
showBottomReview();
