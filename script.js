const musicContainer = document.getElementById('music-container');

const title = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const audio = document.getElementById('audio');
const cover = document.getElementById('cover');

const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

const mute = document.getElementById('mute');
const full = document.getElementById('full');
const volumeBar = document.getElementById('volume-bar');
const volume = document.getElementById('volume');


// song titles 
const songs = [
  'Aankh Marey - Simba',
  'Avicii - The Nights',
  'Roo Dhari ( Sansarini )',
  'Komali-Jaanu',
  'Hithe Upanni',
  'Opada',
  '3LAU feat. Carly Paige - Touch',
  'Tere vaaste',
  'Thawthisa Lowen - Ashen senarathna',
  'Ramuloo Ramulaa',
  'Anne-Marie - 2002',
  'Jigidi Killaadi-pattas',
  'Saami Saami - Pushpa'
]

// keep track of song 
let songIndex = 1;

// initially load song details in the DOM
loadSong(songs[songIndex]);

// update song details 
function loadSong(song) {
  title.innerText = song;
  audio.src = `assets/music/${song}.mp3`;
  cover.src = `assets/image/${song}.jpg`;
}

// play song
function playSong() {
  musicContainer.classList.add('play');
  playButton.querySelector('i.fas').classList.remove('fa-play');
  playButton.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playButton.querySelector('i.fas').classList.add('fa-play');
  playButton.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// previous song 
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// next song 
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// set progress 
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Update Progress 
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progessPercent = (currentTime / duration) * 100;
  progress.style.width = `${progessPercent}%`;
}

// Mute volume
function muteVolume() {
  audio.volume = 0;

  volume.style.width = `0%`;
}

// Full volume
function fullVolume() {
  audio.volume = 1.0;

  volume.style.width = `100%`;
}

// Volumn bar
function setVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  audio.volume = clickX / 100;

  volume.style.width = `${clickX}%`;
}


// event listeners
playButton.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  }
  else {
    playSong();
  }
})

// change song 
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

// Time/ SOng update 
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar 
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// volume icons click
mute.addEventListener('click', muteVolume);
full.addEventListener('click', fullVolume);

volumeBar.addEventListener('click', setVolume);

