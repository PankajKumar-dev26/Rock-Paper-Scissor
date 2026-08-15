import {
  prevoiusHis,
  dateCalc,
  timeCalc,
  hisGenHTML,
} from "./scripts/previous.js";

const resultHtml = document.querySelector(".result-html");
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissor = document.querySelector(".scissor");
const scroreBoard = document.querySelector(".scrore-borad");
const resulDiscription = document.querySelector(".result-discription");
const reset = document.querySelector(".reset");
const closeRuleBtn = document.querySelector(".close-rule-box");
const containerRuleBox = document.querySelector(".container-rule");

const autoplayBtn = document.querySelector(".autoplay");
const stopAutobtn = document.querySelector(".stop-autoplay");

const uniBox = document.querySelector(".universal-alert-box");
const closeUniBtn = document.querySelector(".close-uni-alert");

const allScoreHis = document.querySelector(".all-score-his");

const alertDailogBoxHis = document.querySelector(".alert-dailog-box");
const closeBtnDailHis = document.querySelector(".close-alert-dailog-box");
const confirmNo = document.querySelector(".confirm-no");
const confirmYes = document.querySelector(".confirm-yes");

const historyBtn = document.querySelector(".history");
const hisContainer = document.querySelector(".history-container");
const closeHis = document.querySelector(".close-his");

let intervelId;
let isRunning = false;

const score = JSON.parse(localStorage.getItem("points-history")) || {
  WIN: 0,
  LOOSE: 0,
  TIE: 0,
};

scroreBoard.innerHTML = `
  WIN : ${score.WIN}<br />LOOSE : ${score.LOOSE}<br />TIE : ${score.TIE}
  `;

const historyHTMLgg = hisGenHTML();

if (historyHTMLgg === "") {
  allScoreHis.innerHTML = `
  <li>You dont have any previous records</li>
  `;
} else {
  allScoreHis.innerHTML = historyHTMLgg;
}

function gameLogic(userMove) {
  let computerMove;
  let result;

  const randomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  const userMoveRand = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

  if (!userMove) {
    if (userMoveRand === 1) {
      userMove = "ROCK";
    } else if (userMoveRand === 2) {
      userMove = "PAPER";
    } else if (userMoveRand === 3) {
      userMove = "SCISSOR";
    }
  }

  if (randomNumber === 1) {
    computerMove = "ROCK";
  } else if (randomNumber === 2) {
    computerMove = "PAPER";
  } else if (randomNumber === 3) {
    computerMove = "SCISSOR";
  }

  if (userMove === "ROCK") {
    if (computerMove === "ROCK") {
      result = "TIE";
    } else if (computerMove === "PAPER") {
      result = "You LOOSE";
    } else if (computerMove === "SCISSOR") {
      result = "You WIN";
    }
  } else if (userMove === "PAPER") {
    if (computerMove === "ROCK") {
      result = "You WIN";
    } else if (computerMove === "PAPER") {
      result = "TIE";
    } else if (computerMove === "SCISSOR") {
      result = "You LOOSE";
    }
  } else if (userMove === "SCISSOR") {
    if (computerMove === "ROCK") {
      result = "You LOOSE";
    } else if (computerMove === "PAPER") {
      result = "You WIN";
    } else if (computerMove === "SCISSOR") {
      result = "TIE";
    }
  }

  if (result === "You LOOSE") {
    score.LOOSE += 1;
  } else if (result === "You WIN") {
    score.WIN += 1;
  } else if (result === "TIE") {
    score.TIE += 1;
  }

  localStorage.setItem("points-history", JSON.stringify(score));

  resultHtml.innerHTML = result;

  resulDiscription.innerHTML = `
    You choose
    <span class="medium-img"><img src="./Assests/${userMove}.png" alt="" /></span>
    computer choose
    <span class="medium-img"><img src="./Assests/${computerMove}.png" alt="" /></span>
  `;

  scroreBoard.innerHTML = `
  WIN : ${score.WIN}<br />LOOSE : ${score.LOOSE}<br />TIE : ${score.TIE}
  `;

  prevoiusHis.unshift({
    userMove: userMove,
    computerMove: computerMove,
    result: result,
    date: dateCalc(),
    time: timeCalc(),
  });

  localStorage.setItem("previousHis", JSON.stringify(prevoiusHis));

  allScoreHis.innerHTML = hisGenHTML();
}

rock.addEventListener("click", () => {
  if (isRunning) {
    uniBox.classList.remove("hidden");
  } else if (!isRunning) {
    gameLogic("ROCK");
  }
});

paper.addEventListener("click", () => {
  if (isRunning) {
    uniBox.classList.remove("hidden");
  } else if (!isRunning) {
    gameLogic("PAPER");
  }
});

scissor.addEventListener("click", () => {
  if (isRunning) {
    uniBox.classList.remove("hidden");
  } else if (!isRunning) {
    gameLogic("SCISSOR");
  }
});

reset.addEventListener("click", () => {
  if (isRunning) {
    uniBox.classList.remove("hidden");
  } else if (!isRunning) {
    alertDailogBoxHis.classList.remove("hidden");
  }
});

confirmYes.addEventListener("click", () => {
  score.WIN = 0;
  score.LOOSE = 0;
  score.TIE = 0;
  localStorage.setItem("points-history", JSON.stringify(score));
  alertDailogBoxHis.classList.add("hidden");
  scroreBoard.innerHTML = `WIN : ${score.WIN}<br />LOOSE : ${score.LOOSE}<br />TIE : ${score.TIE}`;
  resultHtml.innerHTML = "";
  resulDiscription.innerHTML = "";
  prevoiusHis.length = 0;
  localStorage.setItem("previousHis", JSON.stringify(prevoiusHis));
  allScoreHis.innerHTML = `
  <li>You dont have any previous records</li>
  `;
});

closeRuleBtn.addEventListener("click", (e) => {
  containerRuleBox.classList.toggle("hidden");
});

autoplayBtn.addEventListener("click", () => {
  if (isRunning) {
    uniBox.classList.remove("hidden");
  } else if (!isRunning) {
    intervelId = setInterval(() => {
      gameLogic();
    }, 1500);
    isRunning = true;
  }
});

stopAutobtn.addEventListener("click", () => {
  clearInterval(intervelId);
  isRunning = false;
});

closeBtnDailHis.addEventListener("click", () => {
  alertDailogBoxHis.classList.toggle("hidden");
});

confirmNo.addEventListener("click", () => {
  alertDailogBoxHis.classList.toggle("hidden");
});

closeUniBtn.addEventListener("click", () => {
  uniBox.classList.toggle("hidden");
});

historyBtn.addEventListener("click", () => {
  hisContainer.classList.toggle("hide");
});

closeHis.addEventListener("click", () => {
  hisContainer.classList.toggle("hide");
});

document.querySelector("body").addEventListener("keydown", (e) => {
  console.log(e.key);
  if (isRunning) {
    if (e.key === "j" || e.key === "J") {
      clearInterval(intervelId);
      isRunning = false;
    } else if (
      e.key === "r" ||
      e.key === "R" ||
      e.key === "p" ||
      e.key === "P" ||
      e.key === "s" ||
      e.key === "S" ||
      e.key === "a" ||
      e.key === "A" ||
      e.key === "Backspace"
    ) {
      uniBox.classList.remove("hidden");
    }
  } else if (!isRunning) {
    if (e.key === "r" || e.key === "R") {
      gameLogic("ROCK");
    } else if (e.key === "p" || e.key === "P") {
      gameLogic("PAPER");
    } else if (e.key === "s" || e.key === "S") {
      gameLogic("SCISSOR");
    } else if (e.key === "a" || e.key === "A") {
      intervelId = setInterval(() => {
        gameLogic();
      }, 1500);
      isRunning = true;
    } else if (e.key === "Backspace") {
      alertDailogBoxHis.classList.remove("hidden");
    }
  }
});
