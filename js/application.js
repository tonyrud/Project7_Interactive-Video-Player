// (function() {
//   'use strict';
  var video = document.getElementById("video");

  //Buttons
  var playButton = document.getElementById("play-pause");
  var muteButton = document.getElementById("mute");
  var fullScreenButton = document.getElementById("full-screen");

  var changeBtn = playButton.getElementsByClassName("fa")

  // Sliders
  var seekBar = document.getElementById("seek-bar");
  var volumeBar = document.getElementById("volume-bar");

  // Player controls functions
//classList.toggle('editMode');

    playButton.addEventListener('click', e => {
      playButton.firstElementChild.classList.toggle('fa-pause');
      if (video.paused === true) {
        video.play()
      } else {
        video.pause();
      }


    })

// })();
