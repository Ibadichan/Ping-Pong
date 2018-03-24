var canvas = document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
var x = canvas.width / 2, y = canvas.height - 30, dx = 2, dy = -2, ballRadius = 8;
var paddleHeight = 7, paddleWidth = 60, paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false, leftPressed = false;
var brickRowCount = 3, brickColumnCount = 5, brickPadding = 5, bricks = [];
var brickWidth = 50, brickHeight = 10, brickOffsetTop = 15, brickOffsetLeft = 15;

for(var column = 0; column < brickColumnCount; column++) {
  bricks[column] = [];
  for(var row = 0; row < brickRowCount; row++) { bricks[column][row] = { x: 0, y: 0 } }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39)      { rightPressed = true }
  else if (e.keyCode == 37) { leftPressed = true }
}

function keyUpHandler(e) {
  if (e.keyCode == 39)      { rightPressed = false }
  else if (e.keyCode == 37) { leftPressed = false }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for(var column = 0; column < brickColumnCount; column++) {
    for(var row = 0; row < brickRowCount; row++) {
      var brickX = (column * (brickWidth + brickPadding)) + brickOffsetLeft;
      var brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
      bricks[column][row].x = brickX;
      bricks[column][row].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawBricks();
  drawPaddle();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { dx = -dx }

  if (y + dy < ballRadius) { dy = -dy }
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) { dy = -dy }
    else {
        alert("GAME OVER");
        clearInterval(game);
        document.location.reload();
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) { paddleX += 5 }
  else if (leftPressed && paddleX > 0) { paddleX -= 5 }

  x += dx, y += dy;
}

var game = setInterval(draw, 20);
