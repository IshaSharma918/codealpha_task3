const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const currentTimeEl = document.getElementById('current');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');

const songs = [
  {
    name: 'song1',
    title: 'Chill Vibes',
    artist: 'DJ Breeze',
    cover: 'cover1.jpg'
  },
  {
    name: 'song2',
    title: 'Night Drive',
    artist: 'ElectroKid',
    cover: 'cover2.jpg'
  }
];

let songIndex = 0;

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = `assets/audio/${song.name}.mp3`;
  cover.src = `assets/images/${song.cover}`;
}

function playSong() {
  audio.play();
  playBtn.innerText = '⏸️';
}

function pauseSong() {
  audio.pause();
  playBtn.innerText = '▶️';
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress() {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Time display
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = ('0' + Math.floor(time % 60)).slice(-2);
  return `${minutes}:${seconds}`;
}

// Volume Control
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Events
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Init
loadSong(songs[songIndex]);
