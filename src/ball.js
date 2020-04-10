import { detectRectCollision, Rect } from "./collision.js";

export class Ball {
  constructor(game, player1, player2) {
    this.game = game;
    this.player1 = player1;
    this.player2 = player2;

    this.size = 10;
    this.resetBall();
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

    //player1 scores
    if (this.position.x + this.size >= this.game.width) {
      this.player1.scorePoint(1);
      this.resetBall();
      this.sendScore();
    }

    //player2 scores
    if (this.position.x <= 0) {
      this.player2.scorePoint(1);
      this.resetBall();
      this.sendScore();
    }

    if (
      detectRectCollision(this.toRect(), this.player1.toRect()) ||
      detectRectCollision(this.toRect(), this.player2.toRect())
    ) {
      var isLeft = this.position.x > this.game.width/2;
      var player = isLeft ? this.player2 : this.player1; //active player
      
      var middleOfPlayer = player.position.y + player.height/2;
      var dist = this.position.y - middleOfPlayer; // dist>0 ball hits bottom of paddle
      
      // hit top of the player - ball.speed.y becomes negative
      // hit bottom of the player - ball.speed.y becomes positive 
      // 15 is just a magic number for adjusting the ball.speed.y
      var angleOut = dist/15; 

      // Increces the ball.speed.y 
      var yIncrease = Math.abs(0.001 * dist);
      var ballDirection = this.speed.x <0 ? -1 : 1;
      
      this.speed.x = -1 * (this.speed.x + Math.abs(player.speed) * 0.1*ballDirection);
      this.speed.y =  yIncrease * angleOut + player.speed * 0.05;  
    }
  }

  sendScore() {
    document.dispatchEvent(
      new CustomEvent("onScore", {
        bubbles: true,
        detail: { newScore: this.getScore() },
      })
    );
  }

  resetBall() {
    this.position = { x: this.game.width / 2, y: this.game.height / 2 };
    this.speed = { x: 0.1, y: 0.05 };
  }

  getScore() {
    return this.player1.score + " - " + this.player2.score;
  }

  draw(ctx) {
    ctx.beginPath(); //to clrear previous ball
    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(255, 179, 230)";
    ctx.fill();
  }

  toRect() {
    return new Rect(
      this.position.x - this.size / 2,
      this.position.y - this.size / 2,
      this.size,
      this.size
    );
  }
}
