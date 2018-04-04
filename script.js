var canvas = document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
var x = canvas.width / 2, y = canvas.height - 30, dx = 2, dy = -2, ballRadius = 8;
var paddleHeight = 7, paddleWidth = 60, paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false, leftPressed = false;
var brickRowCount = 3, brickColumnCount = 5, brickPadding = 5, bricks = [];
var brickWidth = 50, brickHeight = 10, brickOffsetTop = 20, brickOffsetLeft = 15;
var score = 0;

for(var column = 0; column < brickColumnCount; column++) {
  bricks[column] = [];
  for(var row = 0; row < brickRowCount; row++) { bricks[column][row] = { x: 0, y: 0, status: 1 } }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
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
           clearInterval(game);
           document.location.reload();
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "10px Comic Sans MS";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 15, 10);
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
	collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { dx = -dx }

  if (y + dy < ballRadius) { dy = -dy }
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) { dy = -dy }
    else {
        alert("GAME OVER !!! Score: " + score);
        clearInterval(game);
        document.location.reload();
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) { paddleX += 5 }
  else if (leftPressed && paddleX > 0) { paddleX -= 5 }

  x += dx, y += dy;
}

var game = setInterval(draw, 20);
