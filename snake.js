// snake.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const gridSize = 20;
let tileCount = canvas.width / gridSize;  // Calculate dynamically
let speed = 7;

// Snake
let snakeX = 10;
let snakeY = 10;
let snakeTail = [];
let snakeLength = 1;

// Food
let foodX = 5;
let foodY = 5;

// Input
let velocityX = 0;
let velocityY = 0;

// Game Loop
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 1000 / speed);  // Control game speed
}

function update() {
    // Update snake position
    snakeX += velocityX;
    snakeY += velocityY;

    // Game over conditions
    if (snakeX < 0) {
        snakeX = tileCount - 1;
    }
    if (snakeX >= tileCount) {
        snakeX = 0;
    }
    if (snakeY < 0) {
        snakeY = tileCount - 1;
    }
    if (snakeY >= tileCount) {
        snakeY = 0;
    }

    // Check for collision with self
    for (let i = 0; i < snakeTail.length; i++) {
        if (snakeX === snakeTail[i].x && snakeY === snakeTail[i].y) {
            resetGame();
        }
    }

    // Handle food collision
    if (snakeX === foodX && snakeY === foodY) {
        snakeLength++;
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
    }

    // Update snake tail
    snakeTail.push({ x: snakeX, y: snakeY });
    while (snakeTail.length > snakeLength) {
        snakeTail.shift();
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = 'black';  //Use 'black' instead of color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = 'lime';  //Use 'lime' instead of color
    for (let i = 0; i < snakeTail.length; i++) {
        ctx.fillRect(snakeTail[i].x * gridSize, snakeTail[i].y * gridSize, gridSize - 2, gridSize - 2);
    }

    // Draw food
    ctx.fillStyle = 'red'; //Use 'red' instead of color
    ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
}

// Input handling
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case 'ArrowDown':
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case 'ArrowLeft':
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case 'ArrowRight':
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
});

function resetGame() {
    snakeX = 10;
    snakeY = 10;
    snakeTail = [];
    snakeLength = 1;
    velocityX = 0;
    velocityY = 0;
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
}


// Start the game
gameLoop();
