import {Paddle, ALIGN } from "./paddle.js";
import { InputHandler } from "./input.js";

export default class Game{
  constructor(gameWidth, gameHeight){
    this.width = gameWidth;
    this.height = gameHeight;
    this.player1 = new Paddle(this, ALIGN.right);
    this.player2 = new Paddle(this, ALIGN.left);
    this.input = new InputHandler();
    this.gameObjects = [this.player1, this.player2];
    
  }

  draw(ctx){
     this.gameObjects.forEach(obj => obj.draw(ctx));
  }

  update(deltaTime)
  {
     this.gameObjects.forEach(obj => obj.update(deltaTime));
  }

}