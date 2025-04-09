const rollButton = document.querySelector("#rollBtn");
const dice = document.querySelector(".dice");
const circles = Array.from(dice.querySelectorAll(".circle"));
const dice2 = document.querySelector(".dice2");
const circles2 = Array.from(dice2.querySelectorAll(".circle"));
const winnerAnnouncement = document.querySelector("#winner");
const reset = document.querySelector("p");
// removing middle dot of dice in the beggining
circles[3].classList.remove("black");
circles2[3].classList.remove("black");
const gameHistory = document.querySelector("ul");

const player1_score = document.getElementById("player1Score");
let player2_score = document.getElementById("player2Score");
// setting initial score to 0 and keeping track of them with score1 and score2 variables
player1_score.textContent = "0";
player2_score.textContent = "0";
let score1 = 0;
let score2 = 0;
let round = 0;
// this function rolls dice by 
function algorithm(circles) {
  // Reset all circles first (remove all black classes)
  Array.from(circles).forEach((circle) => circle.classList.remove("black"));
  const point = Math.floor(Math.random() * 6) + 1;
  // this is slightly more time efficient approach than from previous version
  // switch based on the point adds class black to circles and make them visible
  // note for me,insted class black I coumd use display hidden
  switch (point) {
    case 1:
      circles[3].classList.add("black"); // Only middle dot
      break;

    case 2:
      circles[0].classList.add("black");
      circles[6].classList.add("black");
      break;

    case 3:
      circles[0].classList.add("black");
      circles[3].classList.add("black");
      circles[6].classList.add("black");

      break;
    case 4:
      circles.forEach((c, i) => {
        if (i !== 2 && i !== 3 && i !== 4 && i !== 7) c.classList.add("black");
      });
      break;

    case 5:
      circles.forEach((c, i) => {
        if (i !== 2 && i !== 4 && i !== 7) c.classList.add("black");
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
function historyRecord(message, winner) {
  let update = document.createElement("li");
  update.textContent = message;
  gameHistory.appendChild(update);
  winnerAnnouncement.textContent = winner;
}
function rolling(circles, circles2) {
  round++;
  // by rolling rounds amount is increasing
  // based on rolled amound returned from algorithm function appropriate message is displayed and score increased
  const rolled = algorithm(circles);
  const rolled2 = algorithm(circles2);
  console.log(rolled, rolled2);
  let message =
    "Round " +
    round +
    " Player 1 rolled " +
    rolled +
    ",Player 2 rolled " +
    rolled2;
  if (rolled == rolled2) {
    historyRecord(message + "→🤝 It is a Draw!", "Draw");
    return;
  } else if (rolled > rolled2) {
    score1 += 1;
    player1_score.textContent = score1;
    historyRecord(message + "→ 🏆Player 1 Wins!", "Player 1 Won");
  } else {
    score2 += 1;
    player2_score.textContent = score2;
    historyRecord(message + "→ 🏆Player 2 Wins!", "Player 2 Won");
  }
  gameHistory.scrollTop = gameHistory.scrollHeight;
}
// ensures all circles except meddle one are black whet starting over
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
  gameHistory.replaceChildren();
});
