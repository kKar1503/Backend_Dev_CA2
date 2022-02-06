// Render initial number on interest icon
renderInterestIcon();

// Render interest
renderInterest();

// Event Listener on interest remove click
$j(document).on('click', '.remove-interest', async function () {
	const categoryId = parseInt($j(this).attr('id').substring(9));
	await axios.delete(`http://localhost:3000/interest/3/${categoryId}`);
	$j(`#heart-${categoryId}`).toggleClass('fa-heart fa-heart-o');
	renderInterest();
	renderInterestIcon();
});

/**
 * Function to return categories data
 * @returns {Promise} Category data
 */
function queryCategories() {
	return new Promise((resolve, reject) => {
		axios
			.get('http://localhost:3000/category')
			.then((categories) => {
				resolve(categories.data);
			})
			.catch((err) => reject(err));
	});
}

/**
 *  Function to re-render number on interest icon
 */
function renderInterestIcon() {
	axios
		.get('http://localhost:3000/interest/3')
		.then((interests) => $j('#interest-num').text(interests.data.length))
		.catch((err) => console.error(err));
}

/**
 *  Function to render Interests
 */
async function renderInterest() {
	$j('#interest-holder').empty();
	let categories = await queryCategories();
	axios
		.get('http://localhost:3000/interest/3')
		.then((interests) =>
			interests.data.forEach(async (interest) => {
				let matchedCategory = categories.find((category) => category.categoryid === interest.fk_category_id);
				const interestHtml = `<!-- cart row start here -->
                    <div class="cart-row">
                        <a href="#" class="img"><img src="http://placehold.it/75x75"
                                alt="image" class="img-responsive" /></a>
                        <div class="mt-h">
                            <span class="mt-h-title"><a href="#">${matchedCategory.category}</a></span>
                            <span class="price">${matchedCategory.description}</span>
                        </div>
                        <a class="close fa fa-times remove-interest" id="category-${matchedCategory.categoryid}"></a>
                    </div>
                    <!-- cart row end here -->`;
				$j('#interest-holder').append(interestHtml);
			})
		)
		.catch((err) => console.error(err));
}
