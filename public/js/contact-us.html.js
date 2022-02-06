function getBrands() {
	axios
		.get(
			// the backend api we want to hit
			'http://localhost:3000/products/distinctBrand'
		)
		.then((res) => {
			console.log(res);
			let brands = res.data;
			brands.forEach((brand) => {
				let option = `
                <option value=${brand.brand}>${brand.brand}</option>`;
				// console.log(filterBrandHTML);
				$('#brand').append(option);
			}); // res.data just get the data
		})
		.catch((err) => console.error(err));
}

getBrands();
