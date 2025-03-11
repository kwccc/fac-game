const playArea = document.getElementById('play-area')

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// limit to 3 images for now, can expand later
const cardsArray = [
  './images/Cherry.png',
  './images/Lemon.png',
  './images/Watermelon.png'
]

let indices = [0, 1, 2]
indices = [...indices, ...indices]
shuffle(indices)


indices.forEach(i => {
  const img = document.createElement('img')
  img.setAttribute('src', cardsArray[i])
  img.setAttribute('data-id', i)
  img.classList.add('card')
  playArea.appendChild(img)
})
