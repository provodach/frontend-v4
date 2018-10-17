// Global vars.
// Haters gonna hate, otters gonna ott.

var
	audioCtx,
	audioEl,
	analyser,
	bufferLength,
	canvasCtx,
	source,
	dataArray,
	fullscreenRunning = false,
	visualActive = false,
	WIDTH  = 600,
	HEIGHT = 100,
	FS_WIDTH = 0,
	FS_HEIGHT = 0;


function launchFullScreen(element) {

	if (!settings.visualsActive)
		return; 

	if(element.requestFullScreen) {
		element.requestFullScreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	} else console.warn('No fullscreen support!');
}

function cancelFullscreen() {
	if(document.cancelFullScreen) {
		document.cancelFullScreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
}

function visualInit()
{
	FS_HEIGHT = window.screen.height;
	FS_WIDTH = window.screen.width;

	canvasInit();
	
	audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	analyser = audioCtx.createAnalyser();
	analyser.minDecibels = -180;
	analyser.maxDecibels = -20;
		
	analyser.fftSize = 2048;
	bufferLength = analyser.frequencyBinCount;
	dataArray = new Uint8Array(bufferLength);

	document.addEventListener("webkitfullscreenchange", onFullscreenToggle);
	document.addEventListener("mozfullscreenchange",    onFullscreenToggle);
	document.addEventListener("fullscreenchange",       onFullscreenToggle);

	$(document).dblclick(function(event) { launchFullScreen(document.getElementById('fullscreen-visuals')) });
	$('#fullscreen-visuals').dblclick(function(event) { cancelFullscreen(); });
}

function canvasInit() {
	var canvas = document.getElementById('player-vis' + ((fullscreenRunning) ? '-fs' : ''));

	canvas.width =  (fullscreenRunning) ? FS_WIDTH : WIDTH;
	canvas.height = (fullscreenRunning) ? FS_HEIGHT : HEIGHT;
	canvasCtx = canvas.getContext('2d');

	canvasCtx.strokeStyle = (fullscreenRunning) ? 'rgb(171, 17, 193)' : 'rgba(81, 6, 92, 0.95)';
	canvasCtx.lineWidth = 3;

	if (fullscreenRunning)
		$('#fullscreen-visuals').show();
	else
		$('#fullscreen-visuals').hide();
}

function visualStart() {
	radioPlayer.crossOrigin = "anonymous";
	source = audioCtx.createMediaElementSource(radioPlayer);
    source.connect(analyser);
	source.connect(audioCtx.destination);

	visualActive = true;
	draw();
}

function visualStop() {
	visualActive = false;
	
}

function draw() {

	var localHeight = (fullscreenRunning) ? FS_HEIGHT : HEIGHT,
		localWidth  = (fullscreenRunning) ? FS_WIDTH  : WIDTH;

	if (visualActive && settings.visualsActive)
		requestAnimationFrame(draw);
	else { // clean up the canvas 
		canvasCtx.fillStyle = 'rgb(0, 0, 0)';
		canvasCtx.fillRect(0, 0, localWidth, localHeight);
		return;
	}

	analyser.getByteTimeDomainData(dataArray);
	
	canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.07)';
	canvasCtx.fillRect(0, 0, localWidth, localHeight);

	canvasCtx.beginPath();
	var sliceWidth = localWidth * 1.0 / bufferLength;
	
	var x = 0;

	for (var i = 0; i < bufferLength; i++) {

		var v = dataArray[i] / 128.0,
			y = v * localHeight / 2;

		if(i === 0) {
			canvasCtx.moveTo(x, y);
		} else {
			canvasCtx.lineTo(x, y);
		}

		x += sliceWidth;
    }

    canvasCtx.lineTo(localWidth, localHeight / 2);
    canvasCtx.stroke();
}

function onFullscreenToggle(event) {
	var fse = 
		document.fullscreenElement || 
		document.mozFullScreenElement || 
		document.webkitFullscreenElement;

	fullscreenRunning = (fse) ? true : false;

	canvasInit();
}

function error (e) {
	console.log(e); // hm...
}