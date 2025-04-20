// Create eventListener to all the button 
// All button should be able to play a different sound.
const sounds = {
  'w': 'https://files.codingninjas.in/tom-1-28537.mp3',
  'a': 'https://files.codingninjas.in/tom-2-28541.mp3',
  's': 'https://files.codingninjas.in/tom-3-28542.mp3',
  'd': 'https://files.codingninjas.in/tom-4-28543.mp3',
  'j': 'https://files.codingninjas.in/snare-28545.mp3',
  'k': 'https://files.codingninjas.in/crash-28546.mp3',
  'l': 'https://files.codingninjas.in/kick-bass-28547.mp3',
};

const buttons = document.querySelectorAll('.drum');

buttons.forEach(button => {
  const key = button.textContent; 
  const soundURL = sounds[key];

  console.log("key" + key);

  // Add keypress event listenerb
  document.addEventListener('keypress', (event) => {
    if (event.key === key) {
      playSound(soundURL);
    }
  });

  // Add click event listener
  button.addEventListener('click', () => {
    playSound(soundURL);
  });
});

function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}