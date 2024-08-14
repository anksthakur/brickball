const innerdiv = document.getElementById("innerdiv");
const bar = document.getElementById("bar");
const ball = document.getElementById("ball");
const bricks = document.querySelectorAll(".brick");

let barX = (innerdiv.clientWidth - bar.clientWidth) / 2;
let ballX = (innerdiv.clientWidth - ball.clientWidth) / 2;
let ballY = innerdiv.clientHeight / 2;

let movebar = 35;
let moveball = 2;
let ballXDirection = 1;
let ballYDirection = 1;

bar.style.left = `${barX}px`;
ball.style.left = `${ballX}px`;
ball.style.top = `${ballY}px`;

// Move bar
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    if (barX - movebar > 0) {
      barX -= movebar;
    } else {
      barX = 0;
    }
  } else if (e.key === "ArrowRight") {
    if (barX + bar.clientWidth + movebar < innerdiv.clientWidth) {
      barX += movebar;
    } else {
      barX = innerdiv.clientWidth - bar.clientWidth;
    }
  }
  bar.style.left = `${barX}px`;
});

// Move ball
function moveBall() {
  ballX += moveball * ballXDirection;
  ballY += moveball * ballYDirection;
  if (ballY <= 0) {
    ballYDirection *= -1;
    console.log("Ball bounced on top");
  }
  if (ballY + ball.clientHeight >= innerdiv.clientHeight) {
    console.log("Ball hit bottom, Game Over");
    alert("Game Over");
    clearInterval(gameInterval);
    return;
  }
  // Ball bounces left right
  if (ballX <= 0 || ballX + ball.clientWidth >= innerdiv.clientWidth) {
    ballXDirection *= -1;
  }
  // Ball bounces on bar
  if (
    ballY + ball.clientHeight >= innerdiv.clientHeight - bar.clientHeight - 1 &&
    ballX + ball.clientWidth >= barX &&
    ballX <= barX + bar.clientWidth
  ) {
    ballYDirection *= -1;
    console.log("Ball bounced on bar");
  }
  // Ball and brick
    let hiddenbrick = true;
    bricks.forEach(function (brick) {
      let brickX = brick.offsetLeft;
      let brickY = brick.offsetTop;
      if (
        ballX + ball.clientWidth >= brickX &&
        ballX <= brickX + brick.clientWidth &&
        ballY + ball.clientHeight >= brickY &&
        ballY <= brickY + brick.clientHeight &&
        brick.style.visibility !== "hidden"
      ) {
        brick.style.visibility = "hidden";
        ballYDirection *= -1;
        console.log("Ball hit a brick :");
      }
      if (brick.style.visibility !== "hidden") {
       hiddenbrick = false;
      }
    });
   if(hiddenbrick){
    alert("you are the winner")
    clearInterval(gameInterval);
    return ;
   }
  
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}
let gameInterval = setInterval(moveBall, 16);
