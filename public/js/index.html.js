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
	categories.forEach((category) => {
		const categoryHtml = `<!-- mt product2 start here -->
        <div class="mt-product2 large bg-grey">
            <!-- box start here -->
            <div class="box">
                <img alt="image description" src="http://placehold.it/275x290" />
                <ul class="links">
                    <li>
                        <a href="#"><i class="icon-heart"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-eye"></i></a>
                    </li>
                </ul>
            </div>
            <!-- box end here -->
            <!-- txt end here -->
            <div class="txt">
                <strong class="title">Bombi Chair</strong>
            </div>
            <!-- txt end here -->
        </div>
        <!-- mt product2 end here -->`;
		console.log('here');
		$('#mt-productscrollbar > .mt-holder').append(categoryHtml);
	});
}
