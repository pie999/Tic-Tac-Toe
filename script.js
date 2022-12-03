const cells = document.querySelectorAll(".cell");
const resetBut = document.querySelector(".resetBut");
const winMess = document.querySelector(".winMess");


const gameBoard = (() => {

    const gameArr =[0, 0, 0, 0, 0, 0, 0, 0, 0];

    let playerTurn = 1;

    let turn = 1;

    const checkLegal = function(index) {
        if (gameArr[index] == 0) return true;
        else return false;
    }

    const placeMark = function(index) {
        if (playerTurn == 1) gameArr[index] = 1;
        else if (playerTurn == 2) gameArr[index] = 2;
    }

    const renderBoard = function() {
        for (let i=0; i<9; i++) {
            if (gameArr[i] == 0) cells[i].textContent = "";
            else if (gameArr[i] == 1) cells[i].textContent = "X"
            else if (gameArr[i] == 2) cells[i].textContent = "O"
        }
    }

    const checkWin = function() {
        let mark = playerTurn;
        if (gameArr[0] == mark && gameArr[1] == mark && gameArr[2] == mark ||
            gameArr[3] == mark && gameArr[4] == mark && gameArr[5] == mark ||
            gameArr[6] == mark && gameArr[7] == mark && gameArr[8] == mark ||
            gameArr[0] == mark && gameArr[3] == mark && gameArr[6] == mark ||
            gameArr[1] == mark && gameArr[4] == mark && gameArr[7] == mark ||
            gameArr[2] == mark && gameArr[5] == mark && gameArr[8] == mark ||
            gameArr[0] == mark && gameArr[4] == mark && gameArr[8] == mark ||
            gameArr[2] == mark && gameArr[4] == mark && gameArr[6] == mark) {
                winMess.textContent = `Player ${playerTurn} wins!`
                for (let i=0; i<cells.length; i++) {
                    cells[i].disabled = true;
                }
            }
    }

    const checkDraw = function() {
        turn++;
        if (turn == 10)
            winMess.textContent = `It's a draw!`
    }

    const switchTurn = function() {
        if (playerTurn == 1) playerTurn = 2;
        else if (playerTurn == 2) playerTurn = 1;
    }

    const reset = function() {
        for (let i=0; i<gameArr.length; i++){
            gameArr[i] = 0;
            cells[i].disabled = false;
        }
        turn = 1;
        winMess.textContent = ""
    }

    return {checkLegal, placeMark, renderBoard, checkWin, checkDraw, switchTurn, reset};
})();


const playerFactory = () => {

};


for (let i=0; i<cells.length; i++) {
    cells[i].addEventListener("click", () => {
        if (gameBoard.checkLegal(i)) {
            gameBoard.placeMark(i);
            gameBoard.checkWin();
            gameBoard.checkDraw();
            gameBoard.renderBoard();
            gameBoard.switchTurn();
        }
    });
}

resetBut.addEventListener("click", () => {
    gameBoard.reset();
    gameBoard.renderBoard();
});

