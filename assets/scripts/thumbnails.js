var myVideoPlayer = document.getElementById('video');
var full_duration;
myVideoPlayer.addEventListener('durationchange', function() {
    full_duration = myVideoPlayer.duration;
});
var editVideo = document.getElementById('edit-video-content')

var videos = {
        a: Popcorn("#edit-video-content"),
        b: Popcorn("#edit-video-camera"),
    },
    scrub = $("#scrub"),
    loadCount = 0,
    events = "play pause timeupdate seeking".split(/\s+/g);

// iterate both media sources
Popcorn.forEach(videos, function(media, type) {

    // when each is ready...
    media.on("canplayall", function() {

        // trigger a custom "sync" event
        this.emit("sync");

        // set the max value of the "scrubber"
        scrub.attr("max", this.duration());

        // Listen for the custom sync event...
    }).on("sync", function() {

        // Once both items are loaded, sync events
        if (++loadCount == 2) {

            // Iterate all events and trigger them on the video B
            // whenever they occur on the video A
            events.forEach(function(event) {

                videos.a.on(event, function() {

                    // Avoid overkill events, trigger timeupdate manually
                    if (event === "timeupdate") {

                        if (!this.media.paused) {
                            return;
                        }
                        videos.b.emit("timeupdate");

                        // update scrubber
                        scrub.val(this.currentTime());

                        return;
                    }

                    if (event === "seeking") {
                        videos.b.currentTime(this.currentTime());
                    }

                    if (event === "play" || event === "pause") {
                        videos.b[event]();
                    }
                });
            });
        }
    });
});

scrub.bind("change", function() {
    var val = this.value;
    videos.a.currentTime(val);
    videos.b.currentTime(val);
});

// With requestAnimationFrame, we can ensure that as
// frequently as the browser would allow,
// the video is resync'ed.
function sync() {
    if (videos.b.media.readyState === 4) {
        videos.b.currentTime(
            videos.a.currentTime()
        );
    }
    requestAnimationFrame(sync);
}

sync();


/*function updateProgressBar() {
 var progressBar = document.getElementById('progress-bar');
 var percentage = Math.floor((100 / editVideo.duration) *
 editVideo.currentTime);
 progressBar.value = percentage;
 progressBar.innerHTML = percentage + '% played';
 }
editVideo.addEventListener('timeupdate', updateProgressBar, false);
 */
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        console.log('style changed!');
    });
});

function make_gif(start, lenght, file){
 gifshot.createGIF({
     'video': ["images/"+ file + "#t=" +(start)],
     'gifWidth': parseInt(400*1.7777777),
     'gifHeight': 200,
     'numFrames': parseInt(10*lenght),
 },function(obj) {
     if(!obj.error) {
         var image = obj.image,
             animatedImage = document.createElement('img');
         animatedImage.src = image;
         animatedImage.className = "created-gif";
         document.body.appendChild(animatedImage);
     }
 });
}
