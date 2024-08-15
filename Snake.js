const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let dx = gridSize;
let dy = 0;
let score = 0;
let changingDirection = false;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (changingDirection) {
        changeDirection();
    }
    moveSnake();
    if (checkCollision()) {
        alert('Game Over! Your score: ' + score);
        resetGame();
        return;
    }
    if (eatFood()) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
    clearCanvas();
    drawFood();
    drawSnake();
    changingDirection = false;
    setTimeout(gameLoop, 100);
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
}

function changeDirection(event) {
    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -gridSize;
    }
    if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = gridSize;
    }
    if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -gridSize;
        dy = 0;
    }
    if (event.key === 'ArrowRight' && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
    changingDirection = true;
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function eatFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

function placeFood() {
    const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food = { x, y };
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    dx = gridSize;
    dy = 0;
    score = 0;
    placeFood();
}

placeFood();
gameLoop();
