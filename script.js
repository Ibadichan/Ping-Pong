var canvas = document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
var x = canvas.width / 2, y = canvas.height - 30, dx = 2, dy = -2, ballRadius = 10;
var paddleHeight = 10, paddleWidth = 75, paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false, leftPressed = false;

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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  if (rightPressed && paddleX < canvas.width - paddleWidth) { paddleX += 7 }
  else if (leftPressed && paddleX > 0) { paddleX -= 7 }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { dx = -dx }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) { dy = -dy }

  x += dx;
  y += dy;
}

setInterval(draw, 20);
