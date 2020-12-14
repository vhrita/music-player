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
  },

  play() {
    this.isPlaying = true;
    this.audio.play();
    $('#play-pause').replaceWith('<span id="play-pause" class="iconify mx-2 big-bt" data-inline="false" data-icon="gg:play-pause-o"></span>');
  },

  pause() {
    this.isPlaying = false;
    this.audio.pause();
    $('#play-pause').replaceWith('<span id="play-pause" class="iconify mx-2 big-bt" data-inline="false" data-icon="gg:play-button-o"></span>');
  },

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },

  toggleMute() {
    this.audio.muted = !this.audio.muted;
    //this.mute.innerText = this.audio.muted ? "volume_down" : "volume_up";
  },

  next() {
    this.currentPlaying++;
    if (this.currentPlaying == this.audioData.length) this.restart();
    this.update();
    this.play();
  },

  setVolume(value) {
    this.audio.volume = value / 100;
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
    this.artist.innerText = this.currentAudio.artist;
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