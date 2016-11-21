// on page load...
moveProgressBar();
// on browser resize...
$(window).resize(function() {
    moveProgressBar();
});

// SIGNATURE PROGRESS
function moveProgressBar() {
    $( ".progress-wrap" ).each(function( index ) {
        var getPercent = ($(this).data('progress-percent') / 100);
        var getProgressWrapWidth = $(this).height();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 2500;

        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar:eq('+index+')').stop().animate({
            top: progressTotal
        }, animationLength);
    });
    console.log("moveProgressBar");

}
