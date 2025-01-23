let currentChords;
let currentChord;
let counter;
let indices;
let toneDuration = 1;
let toneVolume = 5;

let chordText = document.getElementById("current");
let counterText = document.getElementById("counter");
let nextButton = document.getElementById("progress");
nextButton.addEventListener("click", (event) => {
  event.preventDefault();
  progress();
});
let playButton = document.getElementById("play");
playButton.addEventListener("click", () => playTone());
let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => {
  stopTone();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    progress();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "KeyP") {
    playTone();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "KeyS") {
    stopTone();
  }
});

const slider = document.getElementById("numberSlider");
const sliderValue = document.getElementById("sliderValue");

slider.addEventListener("input", () => {
  sliderValue.textContent = slider.value;
  toneDuration = sliderValue.value;
});

const volume = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");

volume.addEventListener("input", () => {
  volumeValue.textContent = volume.value;
  toneVolume = volumeSlider.value;
});

generateChords = () => {
  const NOTES = [
    "A",
    "A#/Bb",
    "B",
    "C",
    "C#/Db",
    "D",
    "D#/Eb",
    "E",
    "F",
    "F#/Gb",
    "G",
    "G#/Ab",
  ];
  const TYPES = ["Major", "Minor"];
  const INVERSIONS = ["Root", "1st Inversion", "2nd Inversion"];
  const chords = [];

  NOTES.forEach((note) => {
    TYPES.forEach((type) => {
      INVERSIONS.forEach((inversion) => {
        let chord = `${note} ${type} ${inversion}`;
        chords.push(chord);
      });
    });
  });
  console.log(chords);
  return chords;
};

const progress = () => {
  if (counter === 72) {
    chordText.textContent = "Finished!";
    start();
    return;
  }
  currentChord = currentChords[indices[counter]];
  playTone();
  counterText.textContent = `${counter + 1}/${currentChords.length}`;
  chordText.innerText = currentChords[indices[counter]];
  counter++;
};

const start = () => {
  currentChords = generateChords();
  indices = Array.from({ length: 72 }, (_, i) => i);
  indices.sort(() => Math.random() - 0.5);
  counter = 0;
  slider.value = 1;
  sliderValue.textContent = slider.value;
  toneDuration = slider.value;
  volume.value = 5;
  volumeValue.textContent = volume.value;
  toneVolume = volume.value;
  progress();
};

let synth;

async function playTone() {
  await Tone.start();
  let pitch = currentChord.split(" ")[0].split("/")[0];

  if (synth) {
    synth.dispose();
  }
  console.log(toneVolume);
  synth = new Tone.Synth({
    volume: toneVolume < 11 && -20 + 2 * toneVolume,
  }).toDestination();

  synth.triggerAttackRelease(`${pitch}4`, `${toneDuration}m`);
}

stopTone = () => {
  synth.dispose();
};

start();
