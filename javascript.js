
let currentChords
let counter
let indices

let chordText = document.getElementById('current')
let counterText = document.getElementById('counter')
let nextButton = document.getElementById('progress')
nextButton.addEventListener('click', (event) => {
  event.preventDefault()
  progress()
})
let playButton = document.getElementById('play')


document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault() // Prevent spacebar from triggering the button's built-in click
    progress() // Always call progress() for spacebar, regardless of focus
  }
})


generateChords = () => {
  const NOTES = ['A','A#/Bb','B','C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab']
  const TYPES = ['Major', 'Minor']
  const INVERSIONS = ['Root', '1st Inversion', '2nd Inversion']
  const chords = []

  NOTES.forEach((note) => {
    TYPES.forEach((type) => {
      INVERSIONS.forEach((inversion) => {
        let chord = `${note} ${type} ${inversion}`
        chords.push(chord)
      })
    })
  })
  console.log(chords)
  return chords
}

const progress = () => {
  if (counter === 72) {
    chordText.textContent = 'Finished!'
    start()
    return
  }
  playTone(currentChords[indices[counter]])
  counterText.textContent = `${counter + 1}/${currentChords.length}`
  chordText.innerText = currentChords[indices[counter]]
  counter++
}

const start = () => {
  currentChords = generateChords()
  indices = Array.from({ length: 72 }, (_, i) => i)
  indices.sort(() => Math.random() - 0.5)
  playButton.addEventListener('click', playTone(currentChords[indices[counter]]))
  counter = 0 
  progress()
}

async function playTone(chord) {
  // Create and start Tone context (needs to happen on user interaction)
  await Tone.start();
  let pitch = chord.split(' ')[0].split('/')[0]
  console.log(pitch)
  
  // Create a synth and connect it to the speakers
  const synth = new Tone.Synth().toDestination();
  
  // Play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease(`${pitch}4`, "2n");
  
  // Other example notes you can try:
  // synth.triggerAttackRelease("E4", "8n");  // E note
  // synth.triggerAttackRelease("G4", "8n");  // G note
  // synth.triggerAttackRelease("440", "8n"); // Using frequency in Hz
}


start()