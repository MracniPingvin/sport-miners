var selection_start, selection_end, selection_now, selection_edit;
function initSlider(start, area) {
    var slider = document.getElementById('slider');
    var min, max;
    if(start - area < 0){
        min=0;
        max=start + area;
    }else{
        min=start - area;
        max=start + area;
    }


    noUiSlider.create(slider, {
        start: [0, 100],
        connect: true,
        range: {
            'min': min,
            'max': max
        }

    });

    $(".noUi-connect").append("<div class='noUi-test'></div>");
    $(".noUi-handle").each(function (index) {
        if ($(this).attr("data-handle") == "0") {
            $(this).html("<img class='marker marker-left' src='images/marker-left.png'>");

        } else if ($(this).attr("data-handle") == "1") {
            $(this).html("<img class='marker marker-right' src='images/marker-right.png'>");
        }
    });
    slider.noUiSlider.on('start', function (values, handle) {
        editVideo.pause();
        $(".noUi-test").css("display", "none");
    });
    slider.noUiSlider.on('update', function (values, handle) {
        selection_start = (parseFloat(slider.noUiSlider.get()[0])) * full_duration;
        selection_end = (parseFloat(slider.noUiSlider.get()[1])) * full_duration;
        // selection_now = (parseFloat(slider.noUiSlider.get()[1])) * full_duration;
        if (handle == 1) {
            editVideo.currentTime = selection_end;
        } else if (handle == 0) {
            editVideo.currentTime = selection_start;
        }

        //else if (handle == 1) {
           // editVideo.currentTime = selection_now;
        //}

    });
    slider.noUiSlider.on('end', function (values, handle) {
        editVideo.currentTime = selection_start;
        editVideo.play();

        $(".noUi-test").css("display", "block");
    });
    editVideo.addEventListener("timeupdate", function () {
        if(editMode==true){
            selection_edit = (parseFloat(start - area)) * full_duration;
            selection_edit_end = (parseFloat(start + area)) * full_duration;
            sliderPercent = 100 * ((editVideo.currentTime - selection_start ) / (selection_end - selection_start));
            var minutes = Math.floor((editVideo.currentTime-selection_start) / 60);
            var seconds = Math.floor((editVideo.currentTime-selection_start) % 60);
            if(minutes<0 || seconds<0){
                minutes=0;
                seconds=0;
            }
            function str_pad_left(string,pad,length) {
                return (new Array(length+1).join(pad)+string).slice(-length);
            }
            var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
            $(".clock-box").html(finalTime);
            if(sliderPercent>99){
                sliderPercent=99;
            }else if(sliderPercent<0){
                sliderPercent=0;
            }
            $('.noUi-test').css('left', sliderPercent + "%");
            if (editVideo.currentTime >= selection_end) {
                editVideo.currentTime = selection_start;
            }
        }
    });
    $("#generate").click(function () {
        waiting=true;

        make_gif(selection_start, selection_end-selection_start, "joined-video.mp4");
        function waitForIt(){
            if (created_gif == undefined) {
                console.log(created_gif);
                setTimeout(function(){waitForIt()},100);
            } else {
                console.log(created_gif);
                var sendContent={
                    name: "boža",
                    text: "asdfsadfasdfads faw fadf awwf awfw efawf awef wef awfawef awdf waef ",
                    gif: created_gif,
                    profile: "",
                    friendly: true,
                };
                send(sendContent);
                created_gif=undefined;
            };
        }
        waitForIt()

    });
    $("#cancel").click(function () {
        editMode=false;
        editVideo.pause();
        $(".edit-container").css("display","none");
        $("#slider").remove();
        $("#edit-controls").prepend('<div id="slider"><div id="generate" class="edit-button v-center" ><img src="images/generate.png" ></div> <div id="cancel" class="edit-button v-center"><img src="images/cancel.png"></div></div>');
        $("#edit-controls").css("display","none");
    });
}

$("#sync").click(function () {
    $('.created-gif').gifplayer();
});
