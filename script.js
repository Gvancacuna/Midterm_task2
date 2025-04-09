const rollButton = document.querySelector("#rollBtn");
const circles = Array.from(document.getElementsByClassName("circle"));
const dice2 = document.querySelector(".dice2");
const circles2 = Array.from(dice2.querySelectorAll(".circle"));
const winnerAnnouncement = document.querySelector(".winner");
const reset = document.querySelector("p");
circles[3].classList.remove("black");
circles2[3].classList.remove("black");
const gameHistory = document.querySelector("ul");

const player1_score = document.getElementById("player1Score");
let player2_score = document.getElementById("player2Score");
player1_score.textContent = "0";
player2_score.textContent = "0";
let score1 = 0;
let score2 = 0;
let round = 0;
function algorithm(circles) {
  // Reset all circles first (remove all black classes)
  Array.from(circles).forEach((circle) => circle.classList.remove("black"));
  const point = Math.floor(Math.random() * 6) + 1;
  switch (point) {
    case 1:
      circles[3].classList.add("black"); // Only middle dot
      break;

    case 2:
      circles.forEach((c, i) => {
        if (i === 0 || i === 6) c.classList.add("black");
      });
      break;

    case 3:
      circles.forEach((c, i) => {
        if (i === 0 || i === 3 || i === 6) c.classList.add("black");
      });
      break;

    case 4:
      circles.forEach((c, i) => {
        if ([0, 1, 5, 6].includes(i)) c.classList.add("black");
      });
      break;

    case 5:
      circles.forEach((c, i) => {
        if ([0, 1, 3, 5, 6].includes(i)) c.classList.add("black");
      });
      break;

    case 6:
      circles.forEach((c, i) => {
        if (i !== 3) c.classList.add("black");
      });
      break;
  }
  return point;
}
function rolling(circles, circles2) {
  round++;
  const rolled = algorithm(circles);
  const rolled2 = algorithm(circles2);
  console.log(rolled, rolled2);
  if (rolled == rolled2) {
    winnerAnnouncement.textContent = "Draw";
    let update = document.createElement("li");
    update.textContent =
      "Round " + round+" Player 1 rolled "+rolled+",Player 2 rolled "+ rolled2+"→🤝 It is a Draw!";
    gameHistory.appendChild(update);
    return;
  } else if (rolled > rolled2) {
    score1 += 1;
    player1_score.textContent = score1;
  let update = document.createElement("li");
    update.textContent ="Round " + round+" Player 1 rolled "+rolled+",Player 2 rolled "+ rolled2+"→ 🏆Player 1 Wins!"
      ;
      gameHistory.appendChild(update);
    winnerAnnouncement.textContent = "Player 1 Won";
  } else {
    score2 += 1;
    player2_score.textContent = score2;
    let update = document.createElement("li");
    update.textContent = update.textContent ="Round " + round+" Player 1 rolled "+rolled+",Player 2 rolled "+ rolled2+"→ 🏆Player 2 Wins!"
      ;
      gameHistory.appendChild(update);
    winnerAnnouncement.textContent = "Player 2 Won";
  }

  gameHistory.scrollTop = gameHistory.scrollHeight;
  
}
function resetDice(circles) {
  circles.forEach((circle, index) => {
    if (index === 3) {
      circle.classList.remove("black");
    } else {
      circle.classList.add("black");
    }
  });
}

rollButton.addEventListener("click", (event) => rolling(circles, circles2));
reset.addEventListener("click", (event) => {
  player1_score.textContent = 0;
  player2_score.textContent = 0;
  winnerAnnouncement.textContent = "Start the game";
  resetDice(circles);
  resetDice(circles2);
  gameHistory.replaceChildren()
});