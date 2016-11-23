var selection_start, selection_end, selection_now, selection_edit;
function initSlider(start, area) {
    var slider = document.getElementById('slider');
    noUiSlider.create(slider, {
        start: [0, 60, 100],
        connect: true,
        range: {
            'min': start - area,
            'max': start + area
        }

    });

    $(".noUi-handle").each(function (index) {
        if ($(this).attr("data-handle") == "0") {
            $(this).html("<img class='marker marker-left' src='images/marker-left.png'>");

        } else if ($(this).attr("data-handle") == "2") {
            $(this).html("<img class='marker marker-right' src='images/marker-right.png'>");
        } else {
            $(this).html("<img class='marker marker-now' src='images/marker-now.png'>");

        }
    });
    slider.noUiSlider.on('start', function (values, handle) {
        editVideo.pause();
    });
    slider.noUiSlider.on('update', function (values, handle) {
        selection_start = (parseFloat(slider.noUiSlider.get()[0])) * full_duration;
        selection_end = (parseFloat(slider.noUiSlider.get()[2])) * full_duration;
        selection_now = (parseFloat(slider.noUiSlider.get()[1])) * full_duration;
        if (handle == 2) {
            editVideo.currentTime = selection_end;
        } else if (handle == 0) {
            editVideo.currentTime = selection_start;
        }
        else if (handle == 1) {
            editVideo.currentTime = selection_now;
        }

    });
    slider.noUiSlider.on('end', function (values, handle) {
        if (handle == 1) {

        } else {
            editVideo.currentTime = selection_start;
            editVideo.play();
        }

    });
    editVideo.addEventListener("timeupdate", function () {
        selection_edit = (parseFloat(start - area)) * full_duration;
        sliderPercent = 100 * (editVideo.currentTime - selection_edit) / (selection_end - selection_edit);
        console.log(sliderPercent);
        $('.noUi-test').css('left', sliderPercent + '%');
        if (editVideo.currentTime >= selection_end) {
            editVideo.currentTime = selection_start;
        }
    });
}
$("#generate").click(function () {
    make_gif(selection_start, selection_end-selection_start, "joined-video.mp4");
});
$("#cancel").click(function () {
    editMode=false;
    $(".edit-container").css("display","none");
    $("#slider").remove();
    $(".edit-controls").css("display","none");
    $("#edit-controls").prepend('<div id="slider"><div id="generate" class="edit-button v-center" ><img src="images/generate.png" ></div> <div id="cancel" class="edit-button v-center"><img src="images/cancel.png"></div></div>');
});
$("#sync").click(function () {
    $('.created-gif').gifplayer();
});