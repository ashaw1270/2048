import {colorChoice} from '../game.js';

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

const colors = [
    {
        2: "hsl(209.03deg 100.00% 81.76%)",
        4: "hsl(338.25deg 100.00% 84.31%)",
        8: "hsl(207.69deg 97.01% 86.86%)",
        16: "hsl(337.09deg 100.00% 89.22%)",
        32: "hsl(278.46deg 35.14% 78.24%)",
        64: "hsl(29.03deg 100.00% 81.76%)",
        128: "hsl(158.25deg 100.00% 84.31%)",
        256: "hsl(27.69deg 97.01% 86.86%)",
        512: "hsl(157.09deg 100.00% 89.22%)",
        1024: "hsl(98.46deg 35.14% 78.24%)",
        2048: "hsl(209.03deg 100.00% 81.76%)",
        4096: "hsl(338.25deg 100.00% 84.31%)",
        8192: "hsl(207.69deg 97.01% 86.86%)",
        16384: "hsl(337.09deg 100.00% 89.22%)",
        32768: "hsl(278.46deg 35.14% 78.24%)"
    },
    {
        2: "hsl(142.88deg 80.82% 71.37%)",
        4: "hsl(50.00deg 100.00% 81.18%)",
        8: "hsl(100.00deg 91.58% 81.37%)",
        16: "hsl(345.37deg 100.00% 91.96%)",
        32: "hsl(178.76deg 77.60% 75.49%)",
        64: "hsl(322.88deg 80.82% 71.37%)",
        128: "hsl(230.00deg 100.00% 81.18%)",
        256: "hsl(280.00deg 91.58% 81.37%)",
        512: "hsl(165.37deg 100.00% 91.96%)",
        1024: "hsl(358.76deg 77.60% 75.49%)",
        2048: "hsl(142.88deg 80.82% 71.37%)",
        4096: "hsl(50.00deg 100.00% 81.18%)",
        8192: "hsl(100.00deg 91.58% 81.37%)",
        16384: "hsl(345.37deg 100.00% 91.96%)",
        32768: "hsl(178.76deg 77.60% 75.49%)"
    },
    {
        2: "hsl(349.29deg 83.58% 73.73%)",
        4: "hsl(117.39deg 37.10% 75.69%)",
        8: "hsl(355.20deg 100.00% 95.10%)",
        16: "hsl(0.67deg 64.96% 73.14%)",
        32: "hsl(11.49deg 64.38% 85.69%)",
        64: "hsl(169.29deg 83.58% 73.73%)",
        128: "hsl(297.39deg 37.10% 75.69%)",
        256: "hsl(175.20deg 100.00% 95.10%)",
        512: "hsl(180.67deg 64.96% 73.14%)",
        1024: "hsl(191.49deg 64.38% 85.69%)",
        2048: "hsl(349.29deg 83.58% 73.73%)",
        4096: "hsl(117.39deg 37.10% 75.69%)",
        8192: "hsl(355.20deg 100.00% 95.10%)",
        16384: "hsl(0.67deg 64.96% 73.14%)",
        32768: "hsl(11.49deg 64.38% 85.69%)"        
    }
]

export function updateGrid(array) {
    array.forEach((row, i) => row.forEach((num, j) => {
        if (!num) {
            squares[i][j].style.backgroundColor = '#768493';
            squares[i][j].querySelector('.number').innerHTML = '';
            return;
        }
        squares[i][j].style.backgroundColor = colors[colorChoice][num];
        const numText = String(num);
        const numDigits = numText.length === 1 ? 2 : numText.length;
        const numElement = squares[i][j].querySelector('.number');
        numElement.style.fontSize = `${4 / 3 * squareSize / numDigits}px`;
        numElement.style.color = '#424B54';
        numElement.innerHTML = numText;
    }));
}
