
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let food = {};
let dx = gridSize;
let dy = 0;
let score = 0;
let gameLoop;

function initGame() {
  snake = [
    { x: 5 * gridSize, y: 5 * gridSize }
  ];
  generateFood();
  score = 0;
  dx = gridSize;
  dy = 0;
  updateScore();
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * tileCount) * gridSize,
    y: Math.floor(Math.random() * tileCount) * gridSize
  };
}

function drawGame() {
  clearCanvas();
  moveSnake();
  drawSnake();
  drawFood();
  checkCollision();
}

function clearCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    updateScore();
    generateFood();
  } else {
    snake.pop();
  }
}

function drawSnake() {
  ctx.fillStyle = '#4CAF50';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize - 2, gridSize - 2);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize - 2, gridSize - 2);
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 0 || head.x >= canvas.width || 
      head.y < 0 || head.y >= canvas.height ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(gameLoop);
  alert(`Game Over! Score: ${score}`);
  startButton.style.display = 'block';
}

function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

document.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'ArrowUp':
      if (dy === 0) { dx = 0; dy = -gridSize; }
      break;
    case 'ArrowDown':
      if (dy === 0) { dx = 0; dy = gridSize; }
      break;
    case 'ArrowLeft':
      if (dx === 0) { dx = -gridSize; dy = 0; }
      break;
    case 'ArrowRight':
      if (dx === 0) { dx = gridSize; dy = 0; }
      break;
  }
});

startButton.addEventListener('click', () => {
  initGame();
  startButton.style.display = 'none';
  gameLoop = setInterval(drawGame, 100);
});

initGame();
