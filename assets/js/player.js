import audios from "./data.js";
import { path, secondsToMinutes } from "./utils.js";
import elements from "./playerElements.js";

export default {
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0,
  isPlaying: false,
  start() {
    elements.get.call(this);
    this.update();
    this.setVolume(localStorage.getItem('volume'));
    this.timeUpdate();
  },

  togglePlay() {
    this.isPlaying = true;
    this.audio.play();
    $('#play').hide();
    $('#pause').show();
  },

  togglePause() {
    this.isPlaying = false;
    this.audio.pause();
    $('#pause').hide();
    $('#play').show();
  },

  toggleMute() {
    this.audio.muted = !this.audio.muted;
    //this.mute.innerText = this.audio.muted ? "volume_down" : "volume_up";
  },

  next() {
    this.audio.pause();
    this.currentPlaying++;
    if (this.currentPlaying == this.audioData.length) this.restart();
    this.update();
    this.setVolume(this.volume.value);
    this.togglePlay();
  },

  prev() {
    this.audio.pause();
    this.currentPlaying--;
    if (this.currentPlaying == -1) this.currentPlaying = this.audioData.length-1;
    this.update();
    this.setVolume(this.volume.value);
    this.togglePlay();
  },

  setVolume(value) {
    this.audio.volume = value / 100;
    localStorage.setItem('volume', value);
    this.volume.value = value;
    let val = (this.volume.value - this.volume.min) / (this.volume.max - this.volume.min);
    $(this.volume).css('background-image',
                        '-webkit-gradient(linear, left top, right top, '
                        + 'color-stop(' + val + ', #C6C6C6), '
                        + 'color-stop(' + val + ', #3F3F3F)'
                        + ')'
    );
  },

  setSeek(value) {
    this.audio.currentTime = value;
  },

  timeUpdate() {
    this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
    this.seekbar.value = this.audio.currentTime;
    let val = (this.seekbar.value - this.seekbar.min) / (this.seekbar.max - this.seekbar.min);
    $(this.seekbar).css('background-image',
                        '-webkit-gradient(linear, left top, right top, '
                        + 'color-stop(' + val + ', #C6C6C6), '
                        + 'color-stop(' + val + ', #3F3F3F)'
                        + ')'
    );
  },

  update() {
    this.currentAudio = this.audioData[this.currentPlaying];
    this.cover.src = path(this.currentAudio.cover);
    this.title.innerText = this.currentAudio.title;
    if(this.currentAudio.title.length > 21) {
      marqueeTitle();
    }
    this.artist.innerText = this.currentAudio.artist;
    if(this.currentAudio.artist.length > 30) {
      marqueeArtist();
    }
    elements.createAudioElement.call(this, path(this.currentAudio.file));

    this.audio.onloadeddata = () => {
      elements.actions.call(this);
    };
  },

  restart() {
    this.currentPlaying = 0;
    this.update();
  }
};

function marqueeTitle() {
  var options = {
      startVisible: true,
      delayBeforeStart: 0
  };
  $('#title').marquee(options);

  $('#title').marquee('pause');  

  $(document).on('mouseover', '#title', function() {
      $(this).marquee('resume');
  });

  $(document).on('mouseleave', '#title', function() {
      $(this).marquee('destroy'); 
      $(this).marquee(options);
      $(this).marquee('pause');
  });
};

function marqueeArtist() {
  let options = {
      startVisible: true,
      delayBeforeStart: 0
  };
  $('#artist').marquee(options);

  $('#artist').marquee('pause');  

  $(document).on('mouseover', '#artist', function() {
      $(this).marquee('resume');
  });

  $(document).on('mouseleave', '#artist', function() {
      $(this).marquee('destroy'); 
      $(this).marquee(options);
      $(this).marquee('pause');
  });
};