import {detectRectCollision, Rect} from './collision.js';

export class Ball {
  constructor(game, player1, player2) {
    this.game = game;
    this.player1 = player1;
    this.player2 = player2;
    this.speed = { x: 0.1, y: 0.1 };
    this.size = 10;
    this.position = { x: this.game.width / 2, y: this.game.height / 2 };
  }

  update(deltaTime) {
    this.position.x = this.position.x + this.speed.x * deltaTime;
    this.position.y = this.position.y + this.speed.y * deltaTime;

    //ball hits top or bottom of screen
    if (
      this.position.y <= this.size ||
      this.position.y + this.size >= this.game.height
    ) {
      this.speed.y = -this.speed.y;
    }

    //DEBUG ball is at the bonaries of left or right of the pitch
    //if (this.position.x + this.size >= this.game.width || this.position.x <= 0)
    //  this.speed.x = -this.speed.x;

   if(detectRectCollision(this.toRect(),this.player1.toRect()) ||
     detectRectCollision(this.toRect(), this.player2.toRect())){
      this.speed.x = -this.speed.x;
    }
  }

  draw(ctx) {
    ctx.beginPath(); //to clrear previous ball
    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(255, 179, 230)";
    ctx.fill();
  }

  toRect(){
    return new Rect(this.position.x - this.size/2, this.position.y - this.size/2, this.size, this.size);
  }

  


}
