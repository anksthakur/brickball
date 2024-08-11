//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let canvas;

// player
let playerWidth = 50;
let playerHeight = 10;
let playerMoveX = 10;
let player = {
  x: boardWidth / 2 - playerHeight / 2,
  y: boardHeight - playerHeight - 5,
  width: playerWidth,
  height: playerHeight,
  velocityX: playerMoveX,
};

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  //player
  canvas = board.getContext("2d");
  canvas.fillStyle = "lightgreen";
  canvas.fillRect(player.x, player.y, player.width, player.height);
  requestAnimationFrame(update);
  document.addEventListener("keydown", movePlayer);
};

// ball
let ballHeight = 10;
let ballWidth = 10;
let ballvelocityX =3;
let ballvelocityY = 2;
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX : ballvelocityX,
    velocityY : ballvelocityY
}

function update() {
  requestAnimationFrame(update);
  canvas.clearRect(0, 0, boardWidth, boardHeight);
  //player
  canvas.fillStyle = "lightgreen";
  canvas.fillRect(player.x, player.y, player.width, player.height);
  //ball
  canvas.fillStyle = "white";
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  canvas.fillRect(ball.x,ball.y,ball.width,ball.height);
  //bounce the ball
  if(ball.y <= 0){
    ball.velocityY *= -1
  }else if (ball.x <=0){
    ball.velocityX *= -1;
  }
}
// out of div
function outOfdiv(xPosition) {
  return xPosition < 0 || xPosition + playerWidth > boardWidth;
}

//move player
function movePlayer(e) {
  if (e.code == "ArrowLeft") {
    // player.x -= player.velocityX;
  let divPlayerX = player.x - player.velocityX;
    if (!outOfdiv(divPlayerX)) {
        player.x = divPlayerX;
    }
  } else if (e.code == "ArrowRight") {
    // player.x += player.velocityX;
    let divPlayerX = player.x + player.velocityX;
    if (!outOfdiv(divPlayerX)) {
      player.x = divPlayerX;
    }
  }
}
