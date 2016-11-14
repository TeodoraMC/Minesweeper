'use strict';

let gameOver = false;
let buttonList = matrix(9, 9);
let StartGame;
function calculateButton(row, col) {
    if (!StartGame) {
        StartGame = Date.now();
    }
    if (gameOver) {
        const mesaj = confirm('Do you want to restart?');
        if (!mesaj) {
            return;
        } else {
            reset();
            return;
        }
    }
    buttonList[row][col].classList.add('buttonClicked');
    if (buttonList[row][col].innerHTML === '!') {
        buttonList[row][col].classList.add('background');
        let EndGame = Date.now();
        let timer = ((EndGame - StartGame) / 1000).toFixed(2);
        setTimeout(() => {
            alert('game over in ' + timer + " seconds");
        }, 1);
        showBombs();
        gameOver = true;
    }
    if (buttonList[row][col].innerHTML) {
        return;
    }

    let sum = 0;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (buttonList[row + i] &&
                buttonList[row + i][col + j] &&
                buttonList[row + i][col + j].innerHTML === '!') {
                sum++;
            }
        }
    }
    buttonList[row][col].classList.add('PressButton' + sum);
    buttonList[row][col].innerHTML = sum;

    if (sum === 0) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (buttonList[row + i] &&
                    buttonList[row + i][col + j] && !buttonList[row + i][col + j].innerHTML) {
                    calculateButton(row + i, col + j);
                }
            }
        }
    }
}

function showBombs() {
    for (let i = 0; i < buttonList.length; i++) {
        for (let j = 0; j < buttonList[i].length; j++) {
            if (buttonList[i][j].innerHTML === '!') {
                buttonList[i][j].classList.add('buttonClicked');
            }
        }
    }
}
function verifyIfWin() {
    let hasEmptyCell = false;
    for (let i = 0; i < buttonList.length; i++) {
        for (let j = 0; j < buttonList[i].length; j++) {
            if (!buttonList[i][j].innerHTML) {
                hasEmptyCell = true;
                break;
            }
        }

        if (hasEmptyCell) {
            break;
        }
    }

    if (!hasEmptyCell) {
        let wonGame = Date.now();
        let winTimer = ((wonGame - StartGame) / 1000).toFixed(2);
        setTimeout(() => {
            alert('You won!Congratulation! :)' + winTimer + 'seconds');
        }, 1);

        gameOver = true;
    }
}

function reset() {
    const table = document.querySelector('.board');
    table.innerHTML = '';
    gameOver = false;
    StartGame=false;
    buttonList = matrix(buttonList.length, buttonList[0].length);
}

function generateClickHandler(row, col) {
    return function buttonClickEventHandler(event) {
        calculateButton(row, col);
        verifyIfWin();
    };
}

function matrix(rows, columns) {
    const board = new Array(rows);
    const table = document.querySelector('.board');
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        const tr = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
            const td = document.createElement('td');
            board[i][j] = document.createElement('button');
            td.appendChild(board[i][j]);
            tr.appendChild(td);
            board[i][j].addEventListener('click', generateClickHandler(i, j));
        }
        table.appendChild(tr);
    }
    for (let i = 0; i < 13; i++) {
        let row;
        let col;
        do {
            row = getRandom(9);
            col = getRandom(9);
        } while (board[row][col].innerHTML === '!') ;
        board[row][col].innerHTML = '!';
        if (board[row][col].innerHTML = '!') {
            board[row][col].classList.add('hideBombs');
        }
    }
    return board;
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}