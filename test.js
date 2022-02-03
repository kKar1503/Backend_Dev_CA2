$("img").click(function(){
    // Change src attribute of image
    $(this).attr("src", image);
});

axios.get(...).then(response => { // './uploads/file1.png'
    $("img").click(function(){
        // Change src attribute of image
        $(this).attr("src", response);
    });
})