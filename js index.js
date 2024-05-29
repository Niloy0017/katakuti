const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// initializing game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index) => {
        box.innerText = "";

        // enabling pointer
        boxes[index].style.pointerEvents = "auto";

        // going back to original classes applied on each box index
        box.classList = `box box${index + 1}`;
    })
    gameInfo.innerText = `current player-${currentPlayer}`;
    newGameBtn.classList.remove("active");
}
initGame();

// checking player turns after eventlistener operations
function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// to check if game is over
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if ( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ) {

            //check if winner is X
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "O";
            }

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    // it means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `winner is -${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    //to check if board is filled
    let count = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            count++;
        }
    })
    //board is Filled, game is tie
    if (count === 9) {
        gameInfo.innerText = `game is tied`;
        newGameBtn.classList.add("active");
    }
}

// operations to do under event listener called function when box is clicked, index of that particular box is passed
function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        // disabling pointer
        boxes[index].style.pointerEvents = "none";

        swapTurn();
        checkGameOver();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

// when new game button is clicked
newGameBtn.addEventListener("click", initGame);

