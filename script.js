const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const restartButton = document.getElementById("restart-btn");
const xWinsDisplay = document.getElementById("x-wins");
const oWinsDisplay = document.getElementById("o-wins");
const tiesDisplay = document.getElementById("ties");

let currentPlayer = "X";
let gameActive = true;
let xWins = 0;
let oWins = 0;
let ties = 0;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell"));

  if (clickedCell.textContent !== "" || !gameActive) {
    return;
  }

  clickedCell.textContent = currentPlayer;

  if (checkWin()) {
    endGame(false);
    return;
  }

  if (checkTie()) {
    endGame(true);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = currentPlayer + "'s turn";
}

function checkWin() {
  return winningCombos.some((combination) => {
    return combination.every((index) => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function checkTie() {
  return [...cells].every((cell) => {
    return cell.textContent !== "";
  });
}

function endGame(isTie) {
  gameActive = false;
  if (isTie) {
    ties++;
    tiesDisplay.textContent = ties;
    statusDisplay.textContent = "It's a tie!";
  } else {
    currentPlayer === "X" ? xWins++ : oWins++;
    xWinsDisplay.textContent = xWins;
    oWinsDisplay.textContent = oWins;
    statusDisplay.textContent = currentPlayer + " wins!";
  }
}

function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  statusDisplay.textContent = currentPlayer + "'s turn";
  gameActive = true;
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
