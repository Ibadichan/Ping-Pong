var canvas = document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
canvas.width = window.innerWidth, canvas.height = window.innerHeight;

var x = canvas.width / 2, y = canvas.height - 50, dx = 2, dy = -2, ballRadius = canvas.width / 50;
var paddleHeight = canvas.height / 25, paddleWidth = canvas.width / 6, paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false, leftPressed = false, score = 0, lives = 3;
var brickRowCount = 3, brickColumnCount = 5, brickPadding = canvas.width / 100, bricks = [];
var brickWidth = canvas.width / 6, brickHeight = canvas.height / 20, brickOffsetTop = canvas.width / 15, brickOffsetLeft = canvas.width / 15;

for(var column = 0; column < brickColumnCount; column++) {
  bricks[column] = [];
  for(var row = 0; row < brickRowCount; row++) { bricks[column][row] = { x: 0, y: 0, status: 1 } }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", movingHandler, false);
document.addEventListener("touchmove", movingHandler, false);

function movingHandler(e) {
  var relativeX = e.clientX || e.touches[0].clientX;
  if (relativeX > 0 && relativeX < canvas.width) { paddleX = relativeX - paddleWidth / 2 }
}

function keyDownHandler(e) {
  if (e.keyCode == 39)      { rightPressed = true }
  else if (e.keyCode == 37) { leftPressed = true }
}

function keyUpHandler(e) {
  if (e.keyCode == 39)      { rightPressed = false }
  else if (e.keyCode == 37) { leftPressed = false }
}

function collisionDetection() {
  for(var column = 0; column < brickColumnCount; column++) {
    for(var row = 0; row < brickRowCount; row++) {
      var brick = bricks[column][row];
      if (brick.status == 0) { continue; }
      if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
        dy = -dy;
        brick.status = 0;
        score++;
        if(score == brickRowCount * brickColumnCount) {
           alert("YOU WIN, CONGRATULATIONS! Score: " + score);
           document.location.reload();
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = canvas.width / 50 + "px Comic Sans MS";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, canvas.width / 50, canvas.width / 50);
}

function drawLives() {
  ctx.font = canvas.width / 50 + "px Comic Sans MS";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - canvas.width / 10, canvas.width / 50);
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
      if(bricks[column][row].status == 0) { continue; }
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
  drawBricks();
	drawBall();
	drawPaddle();
  drawScore();
  drawLives()
	collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { dx = -dx }
  if (y + dy < ballRadius) { dy = -dy }
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) { dy = -dy }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER !!! Score: " + score);
        document.location.reload();
      }
      x = canvas.width / 2, y = canvas.height - 50;
      dx = 2, dy = -2;
      paddleX = (canvas.width - paddleWidth) / 2;
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) { paddleX += 5 }
  else if (leftPressed && paddleX > 0) { paddleX -= 5 }

  x += dx, y += dy;
  requestAnimationFrame(draw);
}

draw();
