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
        2: {'#C5BAAF': false}, 
        4: {'#EBCFB2': false},
        8: {'#D5ACA9': false},
        16: {'#B38D97': false},
        32: {'#AFBAC5': false},
        64: {'#B2CEEB': false},
        128: {'#A9D2D5': false},
        256: {'#8DB3A9': false},
        512: {'#C5BAAF': false},
        1024: {'#EBCFB2': false},
        2048: {'#D5ACA9': false},
        4096: {'#B38D97': false},
        8192: {'#AFBAC5': false},
        16384: {'#B2CEEB': false},
        32768: {'#A9D2D5': false},
        65536: {'#8DB3A9': false}
    },
    {
        2: {'#E5C3D1': false},
        4: {'#F7A9A8': false},
        8: {'#613F75': true}, // dark
        16: {'#7D82B8': false},
        32: {'#EF798A': false},
        64: {'#C3E5D7': false},
        128: {'#A8F6F7': false},
        256: {'#53753F': true}, // dark
        512: {'#B8B37D': false},
        1024: {'#79EFDE': false},
        2048: {'#E5C3D1': false},
        4096: {'#F7A9A8': false},
        8192: {'#613F75': true}, // dark
        16384: {'#7D82B8': false},
        32768: {'#EF798A': false},
        65536: {'#C3E5D7': false}
    },
    {
        2: {'#C6E0FF': false},
        4: {'#315659': true}, // dark
        8: {'#2978A0': false},
        16: {'#BCAB79': false},
        32: {'#587274': true}, // dark
        64: {'#FFE5C6': false},
        128: {'#798ABC': false},
        256: {'#593431': true}, // dark
        512: {'#745A58': true}, // dark
        1024: {'#C6E0FF': false},
        2048: {'#315659': true}, // dark
        4096: {'#2978A0': false},
        8192: {'#BCAB79': false},
        16384: {'#587274': true}, // dark
        32768: {'#FFE5C6': false},
        65536: {'#798ABC': false}
    }
]

export function updateGrid(array) {
    array.forEach((row, i) => row.forEach((num, j) => {
        const numColorObj = num ? colors[colorChoice][num] : [];
        const numColor = num ? Object.keys(numColorObj)[0] : '#768493';
        const dark = num ? numColorObj[numColor] : false;
        squares[i][j].style.backgroundColor = num ? numColor : '#768493';
        const numText = num ? String(num) : '';
        const numDigits = numText.length > 1 ? numText.length : 2;
        const numElement = squares[i][j].querySelector('.number');
        numElement.style.fontSize = `${4 / 3 * squareSize / numDigits}px`;
        numElement.style.color = dark ? '#99a4af' : '#424B54';
        numElement.innerHTML = numText;
    }));
}
