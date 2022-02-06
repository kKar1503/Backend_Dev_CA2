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

let d = new Date();
let date = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString();
let t = ('0' + d.getHours()).slice(-2) + ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2) + ('00' + d.getMilliseconds()).slice(-3);
console.log(`${date}-${t}_Laptops.jpg`);
