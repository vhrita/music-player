import { secondsToMinutes } from "./utils.js";

export default {
  get() {
    this.cover = document.querySelector("#img img");
    this.title = document.querySelector("#title");
    this.artist = document.querySelector("#artist");
    this.play = document.querySelector("#play");
    this.pause = document.querySelector("#pause");
    this.mute = document.querySelector("#mute");
    this.volume = document.querySelector("#sound-bar");
    this.seekbar = document.querySelector("#seek-bar");
    this.currentDuration = document.querySelector("#current-duration");
    this.totalDuration = document.querySelector("#total-duration");
    this.nextBtn = document.querySelector("#next");
    this.prevBtn = document.querySelector("#prev");
  },
  createAudioElement(audio) {
    this.audio = new Audio(audio);
  },
  actions() {
    this.audio.onended = () => this.next();
    this.audio.ontimeupdate = () => this.timeUpdate();
    this.play.onclick = () => this.togglePlay();
    this.pause.onclick = () => this.togglePause();
    this.mute.onclick = () => this.toggleMute();
    this.volume.oninput = () => this.setVolume(this.volume.value);
    this.volume.onchange = () => this.setVolume(this.volume.value);
    this.seekbar.oninput = () => this.setSeek(this.seekbar.value);
    this.seekbar.onchange = () => this.setSeek(this.seekbar.value);
    this.seekbar.max = this.audio.duration;
    this.totalDuration.innerText = secondsToMinutes(this.audio.duration);
    this.nextBtn.onclick = () => this.next();
    this.prevBtn.onclick = () => this.prev();
  }
};