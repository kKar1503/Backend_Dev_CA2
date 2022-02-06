// Render categories
queryCategories()
	.then((categories) => renderCategories(categories))
	.catch((err) => console.error(err));

// Event Listener on category click
$j(document).on('click', '.category', async function () {
	const categoryId = parseInt($j(this).attr('id').substring(9));
	if ($j(this).find('i.fa-heart-o').length) {
		await axios.post(`http://localhost:3000/interest/3/${categoryId}`);
		$j(this).find('.fa-heart-o').toggleClass('fa-heart-o fa-heart');
	} else {
		await axios.delete(`http://localhost:3000/interest/3/${categoryId}`);
		$j(this).find('.fa-heart').toggleClass('fa-heart fa-heart-o');
	}
	renderInterest();
	renderInterestIcon();
});

/**
 * Function to render all categories on page
 * @param {Array} categories
 */
function renderCategories(categories) {
	categories.forEach(async (category) => {
		let categoryId = category.categoryid;
		let categoryImg = category.image_file_name;
		console.log(categoryImg);
		let categories = await axios.get('http://localhost:3000/interest/3');
		let hasCategory = categories.data.some((category) => category.fk_category_id == categoryId);
		const categoryHtml = `<!-- mt product2 start here -->
        <div class="mt-product2 large bg-grey">
            <!-- box start here -->
            <div class="box">
                <img alt="image description" src="../../uploads/${category.image_file_name}" />
                <ul class="links">
                    <li>
                        <a class="category" id="category-${categoryId}"><i class="fa ${hasCategory ? 'fa-heart' : 'fa-heart-o'}" id="heart-${
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
