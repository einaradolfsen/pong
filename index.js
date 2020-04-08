import Game from "./src/game.js";

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 600;

let canvas = document.createElement("canvas");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
canvas.setAttribute("id", "game-area");
document.getElementById("the-body").appendChild(canvas);

let ctx = canvas.getContext("2d");

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

// GAMELOOP
let lastTime = 0;
function gameLoop(timeStamp) {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); //clear the canvas before drawing
  let deltatime = timeStamp - lastTime;
  lastTime = timeStamp;
  game.draw(ctx);
  game.update(deltatime);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop); // initiates the gameloop should use this instead of setInterval more efficient
