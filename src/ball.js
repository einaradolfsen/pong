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
      this.speed.x = -this.speed.x;
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
    this.speed = { x: 0.5, y: 0.45 };
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
