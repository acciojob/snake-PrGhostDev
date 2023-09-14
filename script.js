//your code here
const container = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');

let snake = [{ x: 1, y: 20 }]; 
let food = generateFoodPosition();
let direction = 'right';
let score = 0;

function generateFoodPosition() {
    const x = Math.floor(Math.random() * 40);
    const y = Math.floor(Math.random() * 40);
    return { x, y };
}
function updateGame() {
    let headX = snake[0].x;
    let headY = snake[0].y;
    
    if (direction === 'right') {
        headX++;
    } else if (direction === 'left') {
        headX--;
    } else if (direction === 'up') {
        headY--;
    } else if (direction === 'down') {
        headY++;
    }

    if (headX === food.x && headY === food.y) {
        snake.unshift({ x: headX, y: headY });
        food = generateFoodPosition(); 
        score++; 
        scoreElement.textContent = score;
    } else {
        snake.pop();
        snake.unshift({ x: headX, y: headY });
    }
    updateGrid();
}

function updateGrid() {
    container.innerHTML = '';
    const foodPixel = document.createElement('div');
    foodPixel.className = 'pixel food';
    foodPixel.style.gridColumn = food.x + 1;
    foodPixel.style.gridRow = food.y + 1;
    container.appendChild(foodPixel);

    snake.forEach((segment, index) => {
        const snakePixel = document.createElement('div');
        snakePixel.className = 'pixel snakeBodyPixel';
        snakePixel.style.gridColumn = segment.x + 1;
        snakePixel.style.gridRow = segment.y + 1;
        container.appendChild(snakePixel);
    });
}

setInterval(updateGame, 100);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (e.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    } else if (e.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (e.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
});
