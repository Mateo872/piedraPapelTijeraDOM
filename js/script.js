const submitBtn = document.querySelector(".btn-submit");
const nameInput = document.querySelector("#nameInput");
const cardsContainer = document.querySelector("[data-container-cards]");
const cardsRegister = document.querySelector("[data-container-register]");
const messageEmpty = document.querySelectorAll(".border");
const cards = document.querySelectorAll(".card-hover");

let cardSelected = false;

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    cards.forEach((card) => {
      if (card !== e.currentTarget) {
        card.style.backgroundColor = "";
        card.style.border = "";
        card.style.color = "";
      }
    });

    if (e.currentTarget.style.backgroundColor === "rgb(52, 58, 64)") {
      e.currentTarget.style.backgroundColor = "";
      e.currentTarget.style.border = "";
      e.currentTarget.style.color = "";
      cardSelected = false;
    } else {
      e.currentTarget.style.backgroundColor = "#343a40";
      e.currentTarget.style.border = "2px solid #ffa500";
      e.currentTarget.style.color = "#fff";
      cardSelected = true;
      messageEmpty[1].classList.add("d-none");
    }
  });
});

submitBtn.addEventListener("click", inputValidation);

nameInput.addEventListener("blur", (e) => {
  if (e.target.value.length > 0) {
    messageEmpty[0].classList.add("d-none");
    e.target.style.border = "2px solid green";
  } else {
    messageEmpty[0].classList.remove("d-none");
    e.target.style.border = "2px solid rgb(220,53,69)";
  }
});

function inputValidation(e) {
  e.preventDefault();

  if (nameInput.value.length > 0) {
    cardsContainer.classList.remove("d-none");
    messageEmpty[0].classList.add("d-none");
    nameInput.style.border = "2px solid green";
    cardsRegister.classList.add("d-none");
    userNameInit();
  } else {
    messageEmpty[0].classList.remove("d-none");
    nameInput.style.border = "2px solid rgb(220,53,69)";
    cardsRegister.classList.remove("d-none");
  }
}

let userName = "";

let title = document.querySelector("h2");

function userNameInit() {
  userName = nameInput.value;

  title.innerHTML = `Elige tu jugada, ${userName}`;
}

const playBtn = document.querySelector("[data-play-btn]");

playBtn.addEventListener("click", play);

function play() {
  let userMove = -1;

  if (cardSelected === false) {
    messageEmpty[1].classList.remove("d-none");
    return;
  } else {
    const cards = document.querySelectorAll(".card-hover");

    cards.forEach((card, index) => {
      if (card.style.backgroundColor === "rgb(52, 58, 64)") {
        userMove = index;
      }
    });

    const computerMove = generateComputerMove();
    const computerNames = ["robot1", "robot2", "robot3"];
    const computerName =
      computerNames[Math.floor(Math.random() * computerNames.length)];

    const result = determineWinner(userMove, computerMove, computerName);

    const cardTitleUser = document.querySelector(".card-title-user");
    const cardTitlePC = document.querySelector(".card-title-pc");
    const winnerTitle = document.querySelector("#winner");

    const cardUser = cards[userMove].cloneNode(true);
    const cardComputer = cards[computerMove].cloneNode(true);

    if (result === "¡Empate!") {
      winnerTitle.innerHTML = "¡Empate!";
    } else {
      winnerTitle.innerHTML = `El ganador es: ${result}`;
    }

    if (result) {
      cardsContainer.classList.add("d-none");

      const results = document.querySelector("#results");
      results.classList.remove("d-none");

      cardComputer.style.backgroundColor = "";
      cardComputer.style.border = "";
      cardComputer.style.color = "";
      cardComputer.style.pointerEvents = "none";

      cardUser.style.pointerEvents = "none";

      document.querySelector("#card-user").appendChild(cardUser);
      document.querySelector("#card-computer").appendChild(cardComputer);

      cardTitleUser.innerHTML = `El usuario ${userName} eligió:`;
      cardTitlePC.innerHTML = `La computadora ${computerName} eligió:`;
    }
  }
}

const replayBtn = document.querySelector("#replayBtn");

replayBtn.addEventListener("click", () => {
  resetGame();
  cardsContainer.classList.remove("d-none");
  document.querySelector("#results").classList.add("d-none");
});

function resetGame() {
  document.querySelector("#card-user").innerHTML = "";
  document.querySelector("#card-computer").innerHTML = "";

  cards.forEach((card) => {
    card.style.backgroundColor = "";
    card.style.border = "";
    card.style.color = "";
  });

  cardSelected = false;

  messageEmpty[1].classList.add("d-none");
  document.querySelector(".card-title-user").innerHTML = "";
  document.querySelector(".card-title-pc").innerHTML = "";
  document.querySelector("#winner").innerHTML = "";
}

function generateComputerMove() {
  return Math.floor(Math.random() * 3);
}

function determineWinner(userMove, computerMove, computerName) {
  if (userMove === computerMove) {
    return "¡Empate!";
  } else if (
    (userMove === 0 && computerMove === 2) ||
    (userMove === 1 && computerMove === 0) ||
    (userMove === 2 && computerMove === 1)
  ) {
    return `${userName}`;
  } else {
    return `${computerName}`;
  }
}
