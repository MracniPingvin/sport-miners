/**
* register the html5Thumbnails plugin
*/

var editStart;
(function(){
	var defaults = {}, extend;
	extend = function(obj){
		var arg, prop, source;
		for (arg in arguments) {
			source = arguments[arg];
			for (prop in source) {
				if (source[prop] && typeof source[prop] === 'object') {
					obj[prop] = extend(obj[prop] || {}, source[prop]);
				} else {
					obj[prop] = source[prop];
				}
			}
		}
		return obj;
	};

	function buildThumbnailContainers(settings, player){
		var div, video, loader, progressControl;

		var scaleFactor = settings.scale || 0.35,
		loaderSize = settings.loaderSize || 32;

		var mainPlayerVideo = document.getElementById(settings.id).getElementsByTagName("video")[0];
		video = mainPlayerVideo.cloneNode(true);
		video.className = "";
		video.removeAttribute("data-setup");
		video.muted = true;
		video.id = "vjs-thumbnail-video";
		video.className = 'vjs-thumbnail-video';
		// create the thumbnail
		div = document.createElement('div');
		div.className = 'vjs-thumbnail-holder';

		//get the player width and height from the API
		var w = player.width();
		var h = player.height();

		//calculate the thumbnail width and height
		div.height = 0;
		div.width = 0;
		
		//set the thumbnail container width and height
		div.style.width = div.width;
		div.style.height = div.height;

		//set the thumbnail container width and height
		video.height = div.height;
		video.width = div.width;

		//hide the thumbnail by default
		div.style.opacity = 0;
		//append the video thumbnail to its container
		div.appendChild(video);

		//adjust the position
		div.style.top = div.style.top - div.height;
		div.style.position = "absolute";

		//create a throbber container
		loader = document.createElement('div');
		loader.className = "vjs-thumbnail-spinner";

		loader.style.position = "absolute";

		//set the throbber size
		loader.style.width = loader.style.height = loader.width = loader.height = loaderSize;
		
		//position the throbber
		loader.style.left = (div.width / 2) - ((loader.width) / 2);
		loader.style.top = (div.height / 2) - ((loader.height) / 2);

		//append the throbber to the thumbnail container
		div.appendChild(loader);
	
		// add the thumbnail to the player
		progressControl = player.controlBar.progressControl;
		progressControl.el().appendChild(div);

		return {
			div: div,
			video: video,
			loader: loader,
			progressControl: progressControl
		};
	}

	function showThumb(div, loader){
		div.style.opacity = '1';
		div.style.display = 'block';
		loader.style.display = 'block';
	}

	videojs.plugin('html5Thumbnails', function html5Thumbnails(options) {
		var addEventListener, settings, canvas, player, duration, scaleFactor, loaderSize;
		settings = extend(defaults, options);

		player = this;

		if(!settings.id){
			throw new Error("Invalid Parameter: an object containing the video ID is required. Example: video.html5Thumbnails({id:'video'})");
		}

		var thumbnailElems = buildThumbnailContainers(settings, player),
		div = thumbnailElems.div,
		video = thumbnailElems.video,
		loader = thumbnailElems.loader,
		progressControl = thumbnailElems.progressControl,
		mainPlayerVideo = videojs(settings.id).el();
		var timeout, hideInterval;

		var eventHandler = video.addEventListener ? "addEventListener" : "attachEvent";

		function getWidth(){
			return videojs(settings.id).width();
		}

		video[eventHandler]("seeked", function(){
			loader.style.display = 'none';
		});
		video[eventHandler]("timeupdate", function(){
			loader.style.display = 'none';
		});

		var trackPosition = false;
		progressControl.el()[eventHandler]('mouseover', function mouseover(event) {
			clearInterval(hideInterval);
			var boundingClientRect = mainPlayerVideo.getBoundingClientRect();
			var w = boundingClientRect.width-162;

			showThumb(div, loader);
			$(".edit-container").css("display","block");
			if(settings.autoPlay){
				//make sure the video doesn't continue downloading on mouse out.
			}
 
 			var x = event.clientX - boundingClientRect.left - 85;

			var percentX = x / w;

			if(timeout){
				clearTimeout(timeout);
			}
			timeout = setTimeout(function(){
				video.currentTime = player.duration() * percentX;
			}, 25);
		}, false);

		progressControl.el()[eventHandler]('mousemove', function mousemove(event) {
			clearInterval(hideInterval);
			var boundingClientRect = mainPlayerVideo.getBoundingClientRect();
			var w = boundingClientRect.width-162;
			var x = event.clientX - boundingClientRect.left - 85;
			//var x = event.offsetX;
			var percentX = x / w;
			showThumb(div, loader);
			if (!(x < 100) && !(x-32+$(".edit-container").width() > $("#video").width())){
				if(editMode==false){
				$(".edit-container").css("left",x-100);
				}
			}


			if(timeout){
				clearTimeout(timeout);
			}
			if(editMode==false){
			timeout = setTimeout(function(){
				editVideo.currentTime = parseInt(full_duration * percentX);
			}, 25);
			}
		}, false);


		progressControl.el()[eventHandler]('mouseout', function mouseout(){
			if(settings.autoPlay){
				video.pause(); //make sure the video doesn't continue downloading on mouse out.
			}
			if(editMode==false){
			$(".edit-container").css("display","none");
			}
			hideInterval = setInterval(function(){
				if(div.style.opacity <= 0){
					div.style.display = "none";
					loader.style.display = "none";
					clearInterval(hideInterval);
				}
				div.style.opacity = +(div.style.opacity)-0.02;
			}, 10);
		}, false);
		progressControl.el()[eventHandler]('click', function click(){

			$("#edit-controls").css("display","block");
			editMode=true;
			var boundingClientRect = mainPlayerVideo.getBoundingClientRect();
			var w = boundingClientRect.width-162;
			var x = event.clientX - boundingClientRect.left - 85;
			//var x = event.offsetX;
			var percentX = x / w;
			editStart=percentX;
			initSlider(percentX, 0.1);
		}, false);
	});
})();