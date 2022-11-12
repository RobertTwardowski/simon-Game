const title = document.querySelector("#level-title");
const btn = document.querySelectorAll(".btn");
const body = document.querySelector("body");

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let userChosenColour = [];
let level = 0;

const wrong = new Audio("sounds/wrong.mp3");

const anyKey = () => {
  restart();
  title.textContent = "Press A Key to Start";
  setTimeout(() => {
    randomColor();
    title.textContent = `level + ${level}`;
  }, 400);
};

const randomColor = (e) => {
  e = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColors[e]);
  let sound = gamePattern.slice(-1);
  userClickedPattern = [];
  changeOpacity(sound);
  sounds(sound);
};

const changeOpacity = (e) => {
  btn.forEach((btns) => {
    if (btns.className === `btn ${e.slice(-1)}`) {
      btns.classList.add("pressed");
      setTimeout(() => {
        btns.classList.remove("pressed");
      }, 200);
    }
  });
};

const sounds = (e) => {
  const sounds = new Audio(`sounds/${e}.mp3`);
  sounds.play();
};

const addColor = (btn) => {
  let color = btn.target.id;
  userClickedPattern.push(color);
  compareArrays(userClickedPattern, gamePattern);
};

const compareArrays = (userClickedPattern, gamePattern) => {
  if (
    userClickedPattern.every((element, index) => element === gamePattern[index])
  ) {
    sounds(userClickedPattern.slice(-1));
    changeOpacity(userClickedPattern.slice(-1));
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        randomColor();
      }, 500);
      level++;
      title.textContent = `Level ${level}`;
    }
  } else {
    title.textContent = `Game Over you reached level ${level} click any key to restart`;
    body.classList.add("game-over");
    wrong.play();
    setTimeout(() => {
      body.classList.remove("game-over");
    }, 700);
  }
};
const restart = () => {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
};

btn.forEach((btn) => {
  btn.addEventListener("click", addColor);
});
document.addEventListener("keypress", anyKey);
