const playArea = document.getElementById("play-area");

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const small = 3; // col: 3, row:2
const medium = 6; // col: 4, row: 3
const large = 10; // col: 5, row: 4
const massive = 15; // col: 6, row: 5
const gridSize = [
  { name: "small", size: 3, column: 3, row: 2 },
  { name: "medium", size: 6, column: 4, row: 3 },
  { name: "large", size: 10, column: 5, row: 4 },
  { name: "massive", size: 15, column: 6, row: 5 }
];

// limit to 3 images for now, can expand later
const cardsArray = [
  { name: "cherry", img: "images/Cherry.png" },
  { name: "lemon", img: "images/Lemon.png" },
  { name: "watermelon", img: "images/Watermelon.png" },
  { name: "orange", img: "images/Orange.png" },
  { name: "avocado", img: "images/Avocado.png" },
  { name: "banana", img: "images/Banana.png" },
  { name: "blueberry", img: "images/Blueberry.png" },
  { name: "coconut", img: "images/Coconut.png" },
  { name: "dragonfruit", img: "images/Dragonfruit.png" },
  { name: "durian", img: "images/Durian.png" },
  { name: "grape", img: "images/Grape.png" },
  { name: "mango", img: "images/Mango.png" },
  { name: "mangosteen", img: "images/Mangosteen.png" },
  { name: "papaya", img: "images/Papaya.png" },
  { name: "peach", img: "images/Peach.png" },
];

const grid = document.querySelector(".grid");

let gameGrid = cardsArray.concat(cardsArray);

const newGame = () => {
  grid.innerHTML = "";
  shuffle(gameGrid);
  assembleGameGrid(gameGrid);
  resetMoves();
};

const assembleGameGrid = (array) => {
  array.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = item.name;

    const cover = document.createElement("div");
    cover.classList.add("cover");

    const face = document.createElement("div");
    face.classList.add("face");
    face.style.backgroundImage = `url(${item.img})`;

    grid.appendChild(card);
    card.appendChild(cover);
    card.appendChild(face);
  });
};

let count = 0;
let firstGuess = "";
let secondGuess = "";
let moves = 0;
const timeout = 1200;

const isMatch = (firstGuess, secondGuess) => {
  count = 0;
  if (firstGuess.dataset.name === secondGuess.dataset.name) {
    firstGuess.classList.add("match");
    secondGuess.classList.add("match");
  }
  setTimeout(() => {
    firstGuess.classList.remove("selected");
    secondGuess.classList.remove("selected");
  }, timeout);
};

const clickCardLogic = (card) => {
  if (count < 2) {
    if (count === 0) {
      count++;
      firstGuess = card;
      card.classList.add("selected");
    }
    if (count === 1 && !card.classList.contains("selected")) {
      count++;
      secondGuess = card;
      card.classList.add("selected");
    }
  }
  if (firstGuess !== "" && secondGuess !== "") {
    isMatch(firstGuess, secondGuess);
    firstGuess = "";
    secondGuess = "";
    moves++;
    moveScore.textContent = moves;
  }
};

playArea.addEventListener("click", (e) => {
  const clicked = e.target.closest(".card");
  if (
    clicked &&
    clicked.nodeName === "DIV" &&
    !clicked.classList.contains("match")
  ) {
    clickCardLogic(clicked);
  }
});

const moveScore = document.getElementById("score");

const resetMoves = () => {
  moves = 0;
  moveScore.textContent = 0;
};

const newGameButton = document.getElementById("new-game");

newGameButton.addEventListener("click", () => newGame());

const smallButton = document.getElementById("small");
const mediumButton = document.getElementById("medium");
const largeButton = document.getElementById("large");
const massiveButton = document.getElementById("massive");

const pickRandomItems = (array, x) => {
  const shuffledArray = shuffle(array);
  return shuffledArray.slice(0, x);
};

const setupGame = (gameSize) => {
  const sizeConfig = gridSize.find((size) => size.size === gameSize)
  grid.style.gridTemplateColumns = `repeat(${sizeConfig.column}, 1fr)`
  // console.log(sizeConfig.column)
  const newArray = pickRandomItems(cardsArray, gameSize);
  gameGrid = newArray.concat(newArray);
  newGame();
};

smallButton.addEventListener("click", () => {
  setupGame(small);
});

mediumButton.addEventListener("click", () => {
  setupGame(medium);
});

largeButton.addEventListener("click", () => {
  setupGame(large);
});

massiveButton.addEventListener("click", () => {
  setupGame(massive);
});
// const randomArray = pickRandomItems(cardsArray, small)

// console.log(randomArray)
setupGame(small)
newGame();