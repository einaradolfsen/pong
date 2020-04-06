import Game from "./src/game.js";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let canvas = document.createElement("canvas");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
canvas.setAttribute("id", "game-area");
document.getElementById("the-body").appendChild(canvas);

let ctx = canvas.getContext("2d");

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

//the - gameLoop
let lastTime = 0;
function gameLoop(timeStamp){

  let deltatime = timeStamp - lastTime;
  lastTime = timeStamp;
  game.draw(ctx);
  game.update(deltatime);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
