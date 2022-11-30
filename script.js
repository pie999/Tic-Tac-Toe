const cells = document.querySelectorAll("button");


const gameBoard = (() => {

    const gameArr =[0, 0, 0, 0, 0, 0, 0, 0, 0];

    let playerTurn = 1;

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
                console.log(`Player ${playerTurn} wins`);
                for (let i=0; i<cells.length; i++) {
                    cells[i].disabled = true;
                }
            }
    }

    const switchTurn = function() {
        if (playerTurn == 1) playerTurn = 2;
        else if (playerTurn == 2) playerTurn = 1;
    }

    return {checkLegal, placeMark, renderBoard, checkWin, switchTurn};
})();


const playerFactory = () => {

};


for (let i=0; i<cells.length; i++) {
    cells[i].addEventListener("click", () => {
        if (gameBoard.checkLegal(i)) {
            gameBoard.placeMark(i);
            gameBoard.checkWin();
            gameBoard.renderBoard();
            gameBoard.switchTurn();
        }
    });
}

