const songs = [
  { id: 1, name: "Song A", artist: "Artist A", img: "song-a.jpg", genre: "Pop", source: "song-a.mp3" },
  { id: 2, name: "Song B", artist: "Artist B", img: "song-b.jpg", genre: "Rock", source: "song-b.mp3" },
  { id: 3, name: "Song C", artist: "Artist C", img: "song-c.jpg", genre: "Jazz", source: "song-c.mp3" }
];

let playlists = {};
let currentSongIndex = 0;
let isDarkTheme = false;

const songList = document.getElementById("song-list");
const songCard = document.getElementById("song-card");
const songImage = document.getElementById("song-img");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const audioPlayer = document.getElementById("audio-player");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const addToPlaylistBtn = document.getElementById("add-to-playlist");
const playlistContainer = document.getElementById("playlist-container");
const createPlaylistBtn = document.getElementById("create-playlist");
const playlistInput = document.getElementById("playlist-input");
const genreFilter = document.getElementById("genre-filter");
const themeToggleBtn = document.getElementById("theme-toggle");

document.addEventListener("DOMContentLoaded", () => {
  showSongs();
  updateTheme();
});

function showSongs(genre = "All") {
  songList.innerHTML = "";
  songs.filter(song => genre === "All" || song.genre === genre).forEach(song => {
    const songItem = document.createElement("li");
    songItem.textContent = song.name;
    songItem.addEventListener("click", () => playSong(song.id));
    songList.appendChild(songItem);
  });
}

genreFilter.addEventListener("change", (e) => {
  showSongs(e.target.value);
});

function playSong(id) {
  currentSongIndex = songs.findIndex(song => song.id === id);
  renderCurrentSong();
}

function renderCurrentSong() {
  const song = songs[currentSongIndex];
  songImage.src = song.img;
  songName.textContent = song.name;
  songArtist.textContent = song.artist;
  audioPlayer.src = song.source;
  audioPlayer.play();
}

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  renderCurrentSong();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  renderCurrentSong();
});

createPlaylistBtn.addEventListener("click", () => {
  const playlistName = playlistInput.value.trim();
  if (playlistName && !playlists[playlistName]) {
    playlists[playlistName] = [];
    updatePlaylists();
  }
  playlistInput.value = "";
});

function updatePlaylists() {
  playlistContainer.innerHTML = "";
  Object.keys(playlists).forEach(playlist => {
    const playlistItem = document.createElement("li");
    playlistItem.textContent = playlist;
    playlistItem.addEventListener("click", () => showPlaylist(playlist));
    playlistContainer.appendChild(playlistItem);
  });
}

addToPlaylistBtn.addEventListener("click", () => {
  const selectedPlaylist = prompt("Enter Playlist Name");
  if (selectedPlaylist && playlists[selectedPlaylist]) {
    playlists[selectedPlaylist].push(songs[currentSongIndex]);
  }
});

function showPlaylist(playlistName) {
  songList.innerHTML = "";
  playlists[playlistName].forEach(song => {
    const songItem = document.createElement("li");
    songItem.textContent = song.name;
    songItem.addEventListener("click", () => playSong(song.id));
    songList.appendChild(songItem);
  });
}

themeToggleBtn.addEventListener("click", () => {
  isDarkTheme = !isDarkTheme;
  updateTheme();
});

function updateTheme() {
  document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
}