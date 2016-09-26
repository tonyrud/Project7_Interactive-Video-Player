// (function() {
'use strict';

/**** Notes ****
Add vtt captions
button to turn captions on/off
transcript interactive
video buffering loader
*/


var video = document.getElementById("video");

//Buttons
var playButton = document.getElementById("play-pause");
var ccButton = document.getElementById("cc");
var muteButton = document.getElementById("mute");
var fullScreenButton = document.getElementById("full-screen");

// Sliders
var seekBarBG = document.getElementById('progress-background');
var seekBar = document.getElementById("progress-over");
var volumeBar = document.getElementById("volume-background");
var volumeOver = document.getElementById("volume-over");

showTime();

// Player controls functions
playButton.addEventListener('click', e => {
    if (video.paused === true) {
        video.play();

        playButton.firstChild.src = 'icons/pause-icon.png';
    } else {
        video.pause();
        playButton.firstChild.src = 'icons/play-icon.png';
    }
})

ccButton.addEventListener('click', e => {
    var trackAdd = document.createElement('<track id="captions" label="English" kind="subtitles" srclang="en" src="video/captions.vtt" default>');
    //var track = video.appendChild(trackAdd);
    if (video.childElementCount === 3) {
      var track = video.appendChild(trackAdd);
    } else {
      video.removeChild(track);
    }

});

muteButton.addEventListener('click', e => {
    if (video.muted === false) {
        video.muted = true;
        muteButton.firstChild.src = 'icons/volume-off-icon.png';
        volumeChange(0);
    } else {
        video.muted = false;
        muteButton.firstChild.src = 'icons/volume-on-icon.png';

        volumeChange(100);
    }

});


function volumeChange (amount) {
  volumeOver.style.width = amount + "%";
  // Update the video volume
  video.volume = amount / 100;
}

volumeBar.addEventListener("click",  e => {
  var click = (e.layerX / volumeBar.clientWidth) * 100;
  volumeChange(click);
});

fullScreenButton.addEventListener("click", e => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen(); // Chrome and Safari
    }
});

// Event listener for the seek bar
seekBarBG.addEventListener("click", e => {
    // Calculate the new time
    var click = (e.layerX) / seekBarBG.clientWidth;
    var current = click * video.duration;

    // Update the video time
    video.currentTime = current;

});

function showTime() {
    var showCurrentTime = document.getElementById('current');
    var showTotalTime = document.getElementById('total')
        //time in seconds
    var seconds = Math.round(video.currentTime);
    //put zero in front if below 10 seconds
    var str = (seconds < 10) ? '0' + seconds : seconds;
    //set current time
    showCurrentTime.innerHTML = "00:" + str + " /";

    //set total time
    showTotalTime.innerHTML = Math.floor(video.duration) + ":00";
}

// Update the seek bar as the video plays
video.addEventListener("timeupdate", e => {
    // Calculate the slider value
    var valueProgress = Math.floor((100 / video.duration) * video.currentTime);

    // Update the slider value
    seekBar.style.width = valueProgress + "%";
    showTime();
});

seekBarBG.addEventListener("mousedown", e => {
    video.pause();
    playButton.click();
});

// Play the video when the slider handle is dropped
seekBarBG.addEventListener("mouseup", e => {
    video.play();
});

// })();
