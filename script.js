const playArea = document.getElementById("play-area");

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// limit to 3 images for now, can expand later
const cardsArray = [
  {
    name: "cherry",
    img: "images/Cherry.png",
  },
  {
    name: "lemon",
    img: "images/Lemon.png",
  },
  {
    name: "watermelon",
    img: "images/Watermelon.png",
  },
];

const gameGrid = cardsArray.concat(cardsArray);

shuffle(gameGrid);

const grid = document.querySelector(".grid");

gameGrid.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = item.name;
  card.style.backgroundImage = `url(${item.img})`;
  grid.appendChild(card);
});

let count = 0;
let firstGuess = "";
let secondGuess = "";

const isMatch = (firstGuess, secondGuess) => {
  count = 0;
  firstGuess.classList.remove("selected");
  secondGuess.classList.remove("selected");
  if (firstGuess.dataset.name === secondGuess.dataset.name) {
    firstGuess.classList.add("match");
    secondGuess.classList.add("match");
  }
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
  }
};

playArea.addEventListener("click", (e) => {
  const clicked = e.target;

  if (clicked.nodeName === "DIV" && !clicked.classList.contains("match")) {
    clickCardLogic(clicked);
  }
});
