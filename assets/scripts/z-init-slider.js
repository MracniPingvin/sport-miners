function initSlider(start, area){
    var slider = document.getElementById('slider');
    console.log(start - area, start + area);
    noUiSlider.create(slider, {
    start: [0, 100],
    connect: true,
    range: {
        'min': start - area,
        'max': start + area
    }
});
slider.noUiSlider.on('update', function(values, handle){
    if(handle){
        editVideo.currentTime = (parseFloat(slider.noUiSlider.get()[1]))*full_duration;}
    else{
        editVideo.currentTime = (parseFloat(slider.noUiSlider.get()[0]))*full_duration;
    }
});
}
