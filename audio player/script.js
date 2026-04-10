const songs = [
  { title: "Song 1", artist: "Artist 1", src: "song1.mp3" },
  { title: "Song 2", artist: "Artist 2", src: "song2.mp3" },
  { title: "Song 3", artist: "Artist 3", src: "song3.mp3" }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const duration = document.getElementById("duration");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
}

playBtn.addEventListener("click", () => {
  if (audio.paused) audio.play();
  else audio.pause();
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  duration.textContent =
    formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function loadPlaylist() {
  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.textContent = `${song.title} - ${song.artist}`;
    div.onclick = () => {
      currentSong = index;
      loadSong(currentSong);
      audio.play();
    };
    playlist.appendChild(div);
  });
}

loadSong(currentSong);
loadPlaylist();