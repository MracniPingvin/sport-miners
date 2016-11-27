/**
 * Created by Miha on 27. 11. 2016.
 */
function display_gif(src, time){
    var image = new Image();
    image.src=src;
    $( ".cinema-container" ).animate({
        opacity: 1,
    }, 3000, function() {
        $( "#gif-placeholder" ).delay(2000).fadeIn(1,function () {
            $('#gif').css("display", "block");
            $('#gif').animate({
                opacity: 1,
            },1000);
            $('#gif').attr('src',image.src);
            setTimeout(function(){
                $( ".cinema-container" ).animate({
                    opacity: 0,
                }, 1000, function() {
                    $('#gif').css("display", "none");
                    $('#gif-placeholder').css("display", "block");
                    $('#gif').css("opacity", "0");
                    $('#gif').attr('src',"");
                });
            }, 3000);

        });
    });
}
$('.banner-wrapper').click(function(){
    display_gif("images/created.gif")
});