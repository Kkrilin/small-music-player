const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "Hothon se chhoo lo tum",
    displayName: "Hothon se chhoo lo tum",
    artist: "jagjit Singh",
    img: "kd-1",
  },
  {
    name: "Aarti Kunj Bihari Ki",
    displayName: "Aarti Kunj Bihari Ki",
    artist: "Unknown",
    img: "kd-2",
  },
  {
    name: "Kya Yaad Karonge",
    displayName: "Kya Yaad Karonge",
    artist: "Kumar Sanu",
    img: "kd-3",
  },
  {
    name: "Yeh Jism Hai Toh Kya",
    displayName: "Yeh Jism Hai Toh Kya",
    artist: "Ali Azmat",
    img: "kds-1",
  },
];

let isPlaying = false;

// play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

// play or pause Event Listener

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update the Dom
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.img}.jpg`;
}

// Current Song
let songIndex = 0;

// previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  isPlaying ? playSong() : pauseSong();
}
// next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  isPlaying ? playSong() : pauseSong();
}

// On load
loadSong(songs[songIndex]);

// Update Progress bar & time

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration Element to Avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  console.log("width", width);
  const clickX = e.offsetX;
  console.log("clickX", clickX);

  const { duration } = music;

  console.log(clickX / width);
  //   console.log(duration);
  //
  music.currentTime = (clickX / width) * duration;
}

// Event Listener
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
