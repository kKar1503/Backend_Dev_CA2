// $("img").click(function(){
//     // Change src attribute of image
//     $(this).attr("src", image);
// });

// axios.get(...).then(response => { // './uploads/file1.png'
//     $("img").click(function(){
//         // Change src attribute of image
//         $(this).attr("src", response);
//     });
// })

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var pageNo = 3;
for (i = 0 + 4 * (pageNo - 1); i < 4 * pageNo && i < array.length; i++) {
	console.log(array[i]);
}
