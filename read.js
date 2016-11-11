"use strict";

let arr = matrix(22, 12);

function calculateButton(row, col) {
    console.log("am dat click pe", row, col);
    if (arr[row][col].innerHTML === '!') {
        alert('you are dead');
        return;
    }

    if (arr[row][col].innerHTML) {
        return;
    }

    let sum = 0;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (arr[row + i] && arr[row + i][col + j] && arr[row + i][col + j].innerHTML === '!') {
                sum++;
            }
        }
    }

    arr[row][col].innerHTML = sum;

    if (sum === 0) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (arr[row + i] && arr[row + i][col + j] && !arr[row + i][col + j].innerHTML) {
                    calculateButton(row + i, col + j);
                }
            }
        }
    }
}
function verifyIfWin() {
    var hasEmptyCell = false;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (!arr[i][j].innerHTML) {
                hasEmptyCell = true;
            }
        }
    }
    if (!hasEmptyCell) {
        var response = confirm("Ai castigat! Vrei sa incepi un nou joc?");
        if (response) {
            reset();
        } else {
            return;
        }
    }
}
function reset() {
    var tabel = document.querySelector(".board");
    tabel.innerHTML = "";
    arr = matrix(arr.length, arr[0].length);

}

function generateClickHandler(row, col) {
    return function (event) {
        calculateButton(row, col);
        verifyIfWin();
    }
}

function matrix(rows, columns) {
    let board = new Array(rows);
    let table = document.querySelector(".board");
    for (var i = 0; i < rows; i++) {
        board[i] = [];
        let tr = document.createElement("tr");
        for (var j = 0; j < columns; j++) {
            let td = document.createElement("td");
            board[i][j] = document.createElement("button");
            td.appendChild(board[i][j]);
            tr.appendChild(td);
            board[i][j].addEventListener('click', generateClickHandler(i, j))
        }
        table.appendChild(tr)

    }

    for (let i = 0; i < 13; i++) {
        let row, col;
        do {
            row = getRandom(9);
            col = getRandom(9);
        } while (board[row][col].innerHTML === "!") ;
        board[row][col].innerHTML = "!";
    }
    return board;
}

function getRandom(max) {
    return Math.floor(Math.random() * max)
}

//console.log(JSON.stringify(arr, false, 4));