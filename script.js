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
  {
    name: 'cherry',
    img: 'images/Cherry.png'
  },
  {
    name: 'lemon',
    img: 'images/Lemon.png'
  },
  {
    name: 'watermelon',
    img: 'images/Watermelon.png'
  }
]

const gameGrid = cardsArray.concat(cardsArray)

shuffle(gameGrid)

gameGrid.forEach(item => {
  const card = document.createElement('div')
  card.classList.add('card')
  card.dataset.name = item.name
  card.style.backgroundImage = `url(${item.img})`
  playArea.appendChild(card)
})
