const playArea = document.getElementById("play-area");

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const small = 3
const medium = 6
const large = 10
const massive = 15

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

const cardsArrayMed = [
  {
    name: "orange",
    img: "images/Orange.png"
  },
  {
    name: "avocado",
    img: "images/Avocado.png",
  },
  {
    name: "banana",
    img: "images/Banana.png",
  },
  {
    name: "blueberry",
    img: "images/Blueberry.png",
  },
  {
    name: "coconut",
    img: "images/Coconut.png",
  },
  {
    name: "dragonfruit",
    img: "images/Dragonfruit.png",
  },
  {
    name: "durian",
    img: "images/Durian.png",
  },
  {
    name: "grape",
    img: "images/Grape.png",
  },
  {
    name: "mango",
    img: "images/Mango.png",
  },
  {
    name: "mangosteen",
    img: "images/Mangosteen.png",
  },
  {
    name: "papaya",
    img: "images/Papaya.png",
  },
  {
    name: "peach",
    img: "images/Peach.png",
  }
];

const gameGrid = cardsArray.concat(cardsArray);

shuffle(gameGrid);

const grid = document.querySelector(".grid");

gameGrid.forEach((item) => {
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

let count = 0;
let firstGuess = "";
let secondGuess = "";
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
  }
};

playArea.addEventListener("click", (e) => {
  const clicked = e.target.closest(".card");

  if (clicked && clicked.nodeName === "DIV" && !clicked.classList.contains("match")) {
    clickCardLogic(clicked);
  }
});
