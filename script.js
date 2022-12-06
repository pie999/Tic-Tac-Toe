const topDiv = document.querySelector(".topDiv");
const vsHumanBut = document.querySelector(".vsHumanBut");
const vsAiBut = document.querySelector(".vsAiBut");

const main = document.querySelector("main");

const gridContainer = document.createElement("div");
gridContainer.classList.add("grid-container");

let cells;
let playAgainBut;
let playerTurnText;

main.appendChild(gridContainer);


const topUI = (() => {

    let playerText;

    const clean = function () {
        while (topDiv.firstChild)
            topDiv.removeChild(topDiv.firstChild);
    }

    const createPlayers = function () {

        playerText = document.createElement("p");
        playerText.textContent = "Player 1:"
        topDiv.appendChild(playerText);

        const playerNameInput = document.createElement("input");
        playerNameInput.setAttribute("type", "text");
        topDiv.appendChild(playerNameInput);

        const playerMarkInput = document.createElement("select");
        const playerMarkInputOpt1 = document.createElement("option");
        playerMarkInputOpt1.setAttribute("value", "x");
        playerMarkInputOpt1.textContent = "X";
        const playerMarkInputOpt2 = document.createElement("option");
        playerMarkInputOpt2.setAttribute("value", "o");
        playerMarkInputOpt2.textContent = "O";
        topDiv.appendChild(playerMarkInput);
        playerMarkInput.appendChild(playerMarkInputOpt1);
        playerMarkInput.appendChild(playerMarkInputOpt2);

        const nextPlayerBut = document.createElement("button");
        nextPlayerBut.textContent = "next";
        topDiv.appendChild(nextPlayerBut);
        
        nextPlayerBut.addEventListener("click", () => {

            game.player1 = playerFactory(playerNameInput.value, playerMarkInput.value);

            topDiv.removeChild(nextPlayerBut);
            topDiv.removeChild(playerMarkInput);
            playerText.textContent = "Player 2:"
            playerNameInput.value = "";

            const startBut = document.createElement("button");
            startBut.textContent = "start";
            topDiv.appendChild(startBut);

            startBut.addEventListener("click", () => {

                let p2mark;
                game.player1.mark == "x" ? p2mark = "o" : p2mark = "x"
                game.player2 = playerFactory(playerNameInput.value, p2mark);
                topDiv.removeChild(startBut);
                topDiv.removeChild(playerNameInput);
                playerText.textContent = `${game.player1.name}: 0 - ${game.player2.name}: 0`;
                game.spawnBoard();
            });

        });
    }

    const updateScore = function () {
        playerText.textContent = `${game.player1.name}: ${game.player1.score} - ${game.player2.name}: ${game.player2.score}`;
    }

    return { clean, createPlayers, updateScore };
})();


const game = (() => {

    let player1;
    let player2;

    const spawnBoard = function () {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("button");
            cell.classList.add("cell");
            gridContainer.appendChild(cell);
        }
        cells = document.querySelectorAll(".cell");

        playerTurnText = document.createElement("p");
        playerTurnText.textContent = game.player1.name + "'s turn";
        main.appendChild(playerTurnText);

        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener("click", () => {
                if (gameBoard.checkLegal(i)) {
                    gameBoard.placeMark(i);
                    gameBoard.renderBoard();
                    if (gameBoard.checkWin())
                        topUI.updateScore();
                    else gameBoard.switchTurn();   
                }
            });
        }

    }

    const spawnPlayAgain = function () {
        playAgainBut = document.createElement("button");
        playAgainBut.textContent = "play again";
        main.appendChild(playAgainBut);
        playAgainBut.addEventListener("click", () => {
            gameBoard.reset();
            gameBoard.switchTurn();
        });
    }

    return { player1, player2, spawnBoard, spawnPlayAgain };
})();


const gameBoard = (() => {

    const gameArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    let activePlayer = "player1";
    let turn = 1;

    const checkLegal = function (index) {
        if (gameArr[index] == 0) return true;
        else return false;
    }

    const placeMark = function (index) {
        gameArr[index] = game[activePlayer].mark;
    }

    const renderBoard = function () {
        for (let i = 0; i < 9; i++) {
            if (gameArr[i] == 0) cells[i].textContent = "";
            else if (gameArr[i] == "x") cells[i].textContent = "X"
            else if (gameArr[i] == "o") cells[i].textContent = "O"
        }
    }

    const checkWin = function () {
        turn++
        let mark = game[activePlayer].mark;
        if (gameArr[0] == mark && gameArr[1] == mark && gameArr[2] == mark ||
            gameArr[3] == mark && gameArr[4] == mark && gameArr[5] == mark ||
            gameArr[6] == mark && gameArr[7] == mark && gameArr[8] == mark ||
            gameArr[0] == mark && gameArr[3] == mark && gameArr[6] == mark ||
            gameArr[1] == mark && gameArr[4] == mark && gameArr[7] == mark ||
            gameArr[2] == mark && gameArr[5] == mark && gameArr[8] == mark ||
            gameArr[0] == mark && gameArr[4] == mark && gameArr[8] == mark ||
            gameArr[2] == mark && gameArr[4] == mark && gameArr[6] == mark) {

            game[activePlayer].score++;
            for (let i = 0; i < cells.length; i++) {
                cells[i].disabled = true;
            }
            playerTurnText.textContent = game[activePlayer].name + " wins!"
            game.spawnPlayAgain();
            return true;
        }
        else if (turn == 10) {
            playerTurnText.textContent = "It's a draw!";
            game.spawnPlayAgain();
            return true;
        }
            
    }

    const switchTurn = function () {
        if (activePlayer == "player1") activePlayer = "player2";
        else activePlayer = "player1";

        playerTurnText.textContent = game[activePlayer].name + "'s turn";
    }

    const reset = function () {
        for (let i = 0; i < gameArr.length; i++) {
            gameArr[i] = 0;
            cells[i].disabled = false;
        }
        turn = 1;
        gameBoard.renderBoard();
        main.removeChild(playAgainBut);
    }

    return {
        checkLegal, placeMark, renderBoard, checkWin,
        switchTurn, reset
    };
})();


const playerFactory = (name, mark) => {
    let score = 0;
    return { name, mark, score };
};



vsHumanBut.addEventListener("click", () => {
    topUI.clean();
    topUI.createPlayers();
});

