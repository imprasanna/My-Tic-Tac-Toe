const xClass = "x";
const circleClass = "circle";
let currentTurn = xClass;
const winCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6]
];
// 0 1 2
// 3 4 5
// 6 7 8

const cellElements = document.querySelectorAll(".cell");
const playingBoard = document.getElementById("playingBoard");
const turnText = document.querySelector(".turn-text");
const resetBtn = document.querySelector(".reset-btn");

startGame();

resetBtn.addEventListener("click", startGame);

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener("click", handleClick);
        turnText.style.fontSize = "1rem";
        if (currentTurn == circleClass) {
            currentTurn = xClass;
            displayTurnText();
        }
        if (currentTurn == xClass) {
            displayTurnText();
        }
        cell.addEventListener("click", handleClick, { once: true });
    });
    setHoverBoard();
}

function handleClick(ev) {
    const cell = ev.target;
    placeMark(cell, currentTurn);
    if (checkWin(currentTurn)) {
        endGame(true);  //win
        // displayWinLine();
    }
    else if (isDraw()) {
        endGame(false);   //draw
    }
    else {
        changeTurn();
        displayTurnText();
        setHoverBoard();
    }
}

function placeMark(cell, currentTurn) {
    cell.classList.add(currentTurn);
}

function changeTurn() {
    if (currentTurn == xClass) {
        currentTurn = circleClass;
    }
    else if (currentTurn == circleClass) {
        currentTurn = xClass;
    }
}

function setHoverBoard() {
    playingBoard.classList.remove(xClass);
    playingBoard.classList.remove(circleClass);
    if (currentTurn == xClass) {
        playingBoard.classList.add(xClass);
    }
    else if (currentTurn == circleClass) {
        playingBoard.classList.add(circleClass);
    }
}

function checkWin(currentTurn) {
    return winCombinations.some(individualCombination => {
        return individualCombination.every(cellIndex => {
            return cellElements[cellIndex].classList.contains(currentTurn);
        });
    });
}

function endGame(win) {
    if (win) {
        if (currentTurn == circleClass) {
            turnText.innerHTML = "Hurray, O won!";
        }
        else if (currentTurn == xClass) {
            turnText.innerHTML = "Hurray, X won!";
        }
    }
    else {
        turnText.innerHTML = "Nobody wins, it's a draw!";
        turnText.style.fontSize = "0.8rem";
    }
}

function isDraw() {
    return [...cellElements].every(cellFill => {
        return cellFill.classList.contains(xClass) || cellFill.classList.contains(circleClass);
    })
}

function displayTurnText() {
    if (currentTurn == xClass) {
        turnText.innerHTML = "X's turn!";
    }
    else if (currentTurn == circleClass) {
        turnText.innerHTML = "O's turn!";
    }
}

function displayWinLine(currentTurn) {
    if (winCombinations[0].every(index => {
        cellElements[index].classList.contains(currentTurn)
    })) {
        console.log("Nice!");
    }
}

// function getCellsArray() {
//     for (const condition of winCombinations) {
//         let [a, b, c] = condition;
        
//         if (cellElements[a] != null && cellElements[a] == cellElements[c] && cellElements[a] == cellElements[b]) {
//             return [a, b, c];
//         }
//     }
// }

// function displayWinLine() {
//     if (winCombinations[0] == getCellsArray()) {
//         console.log("Hello World!");
//     }
// }

// if (winCombinations[0].every(index => {
//     cellElements[index].classList.contains(currentTurn);
// })) {

// }