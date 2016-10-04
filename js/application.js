// (function() {
    'use strict';

    var video = document.getElementById("video");
    var transcriptLocation = document.getElementById("transcript");
    var container = document.getElementById('video-container');
    var controls = document.getElementsByClassName('video-controls');
    var playhead = document.getElementsByClassName('playhead');

    //Buttons
    var playButton = document.getElementById("play-pause");
    var speedButton = document.getElementById("speed");
    var ccButton = document.getElementById("cc");
    var muteButton = document.getElementById("mute");
    var fullScreenButton = document.getElementById("full-screen");
    var seekBarBG = document.getElementById('progress-background');
    var volumeBar = document.getElementById("volume");

    // Sliders
    var bufferBar = document.getElementById("buffer-bar");
    var seekBar = document.getElementById("progress-over");

    var transcript_array = [{
        "start": "0.00",
        "end": "4.0",
        "text": "Now that we've looked at the architecture of the internet, let's see how you might"
    }, {
        "start": "4.05",
        "end": "7.5",
        "text": "connect your personal devices to the internet inside your house."
    }, {
        "start": "7.9",
        "end": "11.2",
        "text": "Well there are many ways to connect to the internet, and"
    }, {
        "start": "11.21",
        "end": "13.9",
        "text": "most often people connect wirelessly."
    }, {
        "start": "14.0",
        "end": "17.9",
        "text": "Let's look at an example of how you can connect to the internet."
    }, {
        "start": "17.95",
        "end": "22.30",
        "text": "If you live in a city or a town, you probably have a coaxial cable for"
    }, {
        "start": "22.31",
        "end": "26.880",
        "text": "cable Internet, or a phone line if you have DSL, running to the outside of"
    }, {
        "start": "26.89",
        "end": "30.90",
        "text": "your house, that connects you to the Internet Service Provider, or ISP."
    }, {
        "start": "32.1",
        "end": "34.73",
        "text": "If you live far out in the country, you'll more likely have"
    }, {
        "start": "34.74",
        "end": "39.43",
        "text": "a dish outside your house, connecting you wirelessly to your closest ISP, or"
    }, {
        "start": "39.44",
        "end": "41.19",
        "text": "you might also use the telephone system."
    }, {
        "start": "42.35",
        "end": "46.3",
        "text": "Whether a wire comes straight from the ISP hookup outside your house, or"
    }, {
        "start": "46.32",
        "end": "49.27",
        "text": "it travels over radio waves from your roof,"
    }, {
        "start": "49.28",
        "end": "53.76",
        "text": "the first stop a wire will make once inside your house, is at your modem."
    }, {
        "start": "53.77",
        "end": "57.78",
        "text": "A modem is what connects the internet to your network at home."
    }, {
        "start": "57.79",
        "end": "60.0",
        "text": "A few common residential modems are..."
    }];



    /*--------------------
      Named Functions
    --------------------*/

    function loadTranscript() {
        let transcript;
        for (let item in transcript_array) {
            // create a span element
            transcript = document.createElement('span');

            // put the text to the span element
            transcript.innerHTML = transcript_array[item].text + ' ';

            // set the id to the time of start of the cue
            transcript.setAttribute('id', transcript_array[item].start);

            // append the element to transcript area
            transcriptLocation.appendChild(transcript);

            // attach event listener to each line
            transcript.addEventListener('click', skip_to_text);
        }
    }

    function showTime() {
        let showCurrentTime = document.getElementById('current');

        //time in seconds
        let seconds = Math.round(video.currentTime);
        //put zero in front if below 10 seconds
        let str = (seconds < 10) ? '0' + seconds : seconds;
        //set current time
        showCurrentTime.innerHTML = "00:" + str;
    }

    function skip_to_text(e) {
        video.currentTime = e.target.id;
        video.play();
    }

    function volumeChange(amount) {
        let volumeOver = document.getElementById('volume-over');
        volumeOver.style.width = amount + "%";
        // Update the video volume
        video.volume = amount / 100;
    }


    /*--------------------
      Click Events
    --------------------*/

    video.addEventListener('click', e => {
        playButton.click();
    });

    container.addEventListener('mouseenter', e => {

      controls[0].classList.remove('video-controls-animate');
      playhead[0].classList.remove('playhead-animate');

      //.classList.add('highlight');
    }
  );

    container.addEventListener('mouseleave', e => {

      controls[0].classList.add('video-controls-animate');
      playhead[0].classList.add('playhead-animate');

      //.classList.add('highlight');
    }
  );

    // Player controls functions
    playButton.addEventListener('click', e => {
        if (video.paused === true) {
            video.play();

            playButton.firstChild.src = 'icons/pause-icon.png';
        } else {
            video.pause();
            playButton.firstChild.src = 'icons/play-icon.png';
        }
    });

    speedButton.addEventListener('click', e => {
        console.log(speedButton.innerHTML);
        if (speedButton.innerHTML === '1x') {
            video.playbackRate = 2;
            video.play();

            speedButton.innerHTML = '2x';
        } else {
            video.playbackRate = 1;
            video.play();
            speedButton.innerHTML = '1x';
        }
    });

    ccButton.addEventListener('click', e => {
        if (video.textTracks[0].mode === "showing") {
            ccButton.firstChild.src = 'icons/cc-icon-off.png';
            video.textTracks[0].mode = "hidden";
        } else {
            video.textTracks[0].mode = "showing";
            ccButton.firstChild.src = 'icons/cc-icon.png';

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

    volumeBar.addEventListener("click", e => {
        let click = (e.layerX / volumeBar.clientWidth) * 100;
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
        let click = (e.layerX) / seekBarBG.clientWidth;
        let current = click * video.duration;

        // Update the video time
        video.currentTime = current;

    });

    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", e => {

        // Calculate the progress bars
        let valueProgress = Math.floor((100 / video.duration) * video.currentTime);
        let bufferProgress = (100 / video.duration) * video.buffered.end(0);

        // Update the slider values with css
        bufferBar.style.width = bufferProgress + "%";
        seekBar.style.width = valueProgress + "%";

        //execute time update
        showTime();

        //add highlight classes
        for (let item in transcript_array) {
            document.getElementById(transcript_array[item].start).classList.remove('highlight');

            if (video.currentTime >= transcript_array[item].start && video.currentTime <= transcript_array[item].end) {

                // append highlight class to the correct span
                document.getElementById(transcript_array[item].start).classList.add('highlight');

            }
        }


    });

    seekBarBG.addEventListener("mousedown", e => {
        video.pause();
        playButton.click();
    });

    // Play the video when the slider handle is dropped
    seekBarBG.addEventListener("mouseup", e => {
        video.play();
    });

    //set total duration time, after metadata is loaded
    video.addEventListener('loadeddata', function(){
      let showTotalTime = document.getElementById('total');
      showTotalTime.innerHTML = Math.floor(video.duration) + ":00";
    });


    showTime();
    loadTranscript();

// })();
