import {Paddle, ALIGN } from "./paddle.js";

export default class Game{
  constructor(gameWidth, gameHeight){
    this.width = gameWidth;
    this.heigth = gameHeight;

    this.player1 = new Paddle(this, ALIGN.right);
    this.player2 = new Paddle(this, ALIGN.left);
  }

  draw(ctx){
     this.player1.draw(ctx);
     this.player2.draw(ctx);
  }

  update(deltaTime)
  {
     this.player1.update(deltaTime);
     this.player2.update(deltaTime);
  }

}