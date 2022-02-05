// Get all categories using axios
axios
	.get('http://localhost:3000/category')
	.then((categories) => printCategories(categories.data))
	.catch((err) => console.error(err));

/**
 *
 * @param {Array} categories
 */
function printCategories(categories) {
	categories.forEach(async (category) => {
		let categoryId = category.categoryid;
		let categories = await axios.get('http://localhost:3000/interest/3');
		let hasCategory = categories.data.some((category) => category.fk_category_id == categoryId);
		console.log(hasCategory);
		const categoryHtml = `<!-- mt product2 start here -->
        <div class="mt-product2 large bg-grey">
            <!-- box start here -->
            <div class="box">
                <img alt="image description" src="http://placehold.it/275x290" />
                <ul class="links">
                    <li>
                        <a class="category" id="category-${categoryId}"><i class="fa ${hasCategory ? 'fa-heart' : 'fa-heart-o'}" id="hi-${
			category.categoryid
		}"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-eye"></i></a>
                    </li>
                </ul>
            </div>
            <!-- box end here -->
            <!-- txt end here -->
            <div class="txt">
                <strong class="title">${category.category}</strong>
            </div>
            <!-- txt end here -->
        </div>
        <!-- mt product2 end here -->`;
		$j('#category-holder').append(categoryHtml);
	});
}

$j(document).on('click', '.category', function () {
	const categoryId = parseInt($j(this).attr('id').substring(9));
	// axios
	// 	.post(`http://localhost:3000/interest/3/${categoryId}`)
	// 	.then(() => console.log('done'))
	// 	.catch((err) => console.error(err));
	$j(this).find('.fa-heart-o').toggleClass('fa-heart-o fa-heart');

	// paramObj = new Object();
	// paramObj.category = parseInt($j(this).attr('id').substring(9));
	// paramObj.brand =
	// window.location.href = `/product?${$.param(paramObj)}`;
});
