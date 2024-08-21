import move from '../game.js';

export const numSquares = 4;
const squareGap = 10;

const gridElement = document.getElementById('grid');
gridElement.style.gridTemplateRows = `repeat(${numSquares}, 1fr)`;
gridElement.style.gridTemplateColumns = `repeat(${numSquares}, 1fr)`;
gridElement.style.gap = `${squareGap}px`;

const percentOfScreen = 0.9;
const squareSize = (Math.min(window.innerHeight, window.innerWidth) - (numSquares - 1) * squareGap) / numSquares * percentOfScreen;

const squares = Array(numSquares).fill().map(() => Array(numSquares).fill().map(() => {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style = `width: ${squareSize}px; height: ${squareSize}px;`;

    const number = document.createElement('div');
    number.classList.add('number');
    square.appendChild(number);

    gridElement.appendChild(square);

    return square;
}));

export function updateGrid(array) {
    array.forEach((row, i) => row.forEach((num, j) => {
        const numText = num ? String(num) : '';
        const numDigits = numText.length > 1 ? numText.length : 2;
        const numElement = squares[i][j].querySelector('.number');
        numElement.style.fontSize = `${4 / 3 * squareSize / numDigits}px`;
        numElement.innerHTML = numText;
    }));
}

document.addEventListener('keydown', event => {
    const key = event.key;
    if (/^Arrow/.test(key)) {
        move(key.substring(5).toLowerCase());
    }
});