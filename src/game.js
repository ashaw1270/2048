import {updateGrid, numSquares} from './display/display.js';

let grid;
export let colorChoice = 0;

document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    if (/^arrow/.test(key)) {
        move(key.substring(5));
    } else if (['w', 'a', 's', 'd'].includes(key)) {
        move(key);
    } else if (key === '*') {
        randomMoves();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    newGame();
    document.getElementById('modal-button').addEventListener('click', () => newGame());
});

function newGame() {
    colorChoice = (colorChoice + 1) % 3;
    document.getElementById('modal').style.display = 'none';
    grid = Array(numSquares).fill().map(() => Array(numSquares).fill(0));
    generateNewBlock();
    generateNewBlock();
    updateGrid(grid);
}

function move(direction) {
    switch (direction) {
        case 'up':
        case 'w':
            moveUp();
            break;
        case 'right':
        case 'd':
            moveRight();
            break;
        case 'down':
        case 's':
            moveDown();
            break;
        case 'left':
        case 'a':
            moveLeft();
            break;
    }
    generateNewBlock();
    updateGrid(grid);
    checkForGameOver();
}

function shiftRowUp(col, oldEnd, newEnd) {
    for (let i = oldEnd; i < numSquares; i++) {
        grid[i + newEnd - oldEnd][col] = grid[i][col];
        grid[i][col] = 0;
    }
}

function moveUp() {
    for (let col = 0; col < numSquares; col++) {
        for (let row = 0; row < numSquares; row++) {
            if (row !== 0 && grid[row][col] === grid[row - 1][col]) {
                grid[row - 1][col] *= 2;
                grid[row][col] = 0;
            }
            if (!grid[row][col]) {
                let oldEnd = row;
                while (oldEnd < numSquares && !grid[oldEnd][col]) {
                    oldEnd++;
                }
                if (oldEnd < numSquares) {
                    shiftRowUp(col, oldEnd, row);
                }
            }
        }
    }
}

function shiftRowRight(row, oldEnd, newEnd) {
    for (let i = oldEnd; i >= 0; i--) {
        grid[row][i + newEnd - oldEnd] = grid[row][i];
        grid[row][i] = 0;
    }
}

function moveRight() {
    for (let row = 0; row < numSquares; row++) {
        for (let col = numSquares - 1; col >= 0; col--) {
            if (col !== numSquares - 1 && grid[row][col] === grid[row][col + 1]) {
                grid[row][col + 1] *= 2;
                grid[row][col] = 0;
            }
            if (!grid[row][col]) {
                let oldEnd = col;
                while (oldEnd >= 0 && !grid[row][oldEnd]) {
                    oldEnd--;
                }
                if (oldEnd >= 0) {
                    shiftRowRight(row, oldEnd, col);
                }
            }
        }
    }
}

function shiftRowDown(col, oldEnd, newEnd) {
    for (let i = oldEnd; i >= 0; i--) {
        grid[i + newEnd - oldEnd][col] = grid[i][col];
        grid[i][col] = 0;
    }
}

function moveDown() {
    for (let col = 0; col < numSquares; col++) {
        for (let row = numSquares - 1; row >= 0; row--) {
            if (row !== numSquares - 1 && grid[row][col] === grid[row + 1][col]) {
                grid[row + 1][col] *= 2;
                grid[row][col] = 0;
            }
            if (!grid[row][col]) {
                let oldEnd = row;
                while (oldEnd >= 0 && !grid[oldEnd][col]) {
                    oldEnd--;
                }
                if (oldEnd >= 0) {
                    shiftRowDown(col, oldEnd, row);
                }
            }
        }
    }
}

function shiftRowLeft(row, oldEnd, newEnd) {
    for (let i = oldEnd; i < numSquares; i++) {
        grid[row][i + newEnd - oldEnd] = grid[row][i];
        grid[row][i] = 0;
    }
}

function moveLeft() {
    for (let row = 0; row < numSquares; row++) {
        for (let col = 0; col < numSquares; col++) {
            if (col !== 0 && grid[row][col] === grid[row][col - 1]) {
                grid[row][col - 1] *= 2;
                grid[row][col] = 0;
            }
            if (!grid[row][col]) {
                let oldEnd = col;
                while (oldEnd < numSquares && !grid[row][oldEnd]) {
                    oldEnd++;
                }
                if (oldEnd < numSquares) {
                    shiftRowLeft(row, oldEnd, col);
                }
            }
        }
    }
}

function generateNewBlock() {
    const emptyCells = [];
    grid.forEach((row, i) => row.forEach((cell, j) => {
        if (!cell) {
            emptyCells.push([i, j]);
        }
    }));
    const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const numToAdd = Math.floor(Math.random() * 9) === 8 ? 4 : 2;
    grid[index[0]][index[1]] = numToAdd;
}

function checkForGameOver() {
    for (let i = 0; i < numSquares; i++) {
        for (let j = 0; j < numSquares; j++) {
            if (!grid[i][j]
                || i !== numSquares - 1 && grid[i][j] === grid[i + 1][j]
                || j !== numSquares - 1 && grid[i][j] === grid[i][j + 1]) {
                return false;
            }
        }
    }
    gameOver();
    return true;
}

function gameOver() {
    document.getElementById('modal').style.display = 'block';
}

function randomMoves() {
    const interval = setInterval(() => {
        if (!checkForGameOver()) {
            move(['up', 'right', 'down', 'left'][Math.floor(Math.random() * 4)]);
        } else {
            clearInterval(interval);
        }
    }, 100);
}
