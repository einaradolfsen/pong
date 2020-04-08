export class Ball {
  constructor(game, player1, player2) {
    this.game = game;
    this.player1 = player1;
    this.player2 = player2;
    this.speed = { x: 0.1, y: 0.1 };
    this.size = 15;
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

    //ball is at the bonaries of left or right
    if (this.position.x + this.size >= this.game.width || this.position.x <= 0)
      this.speed.x = -this.speed.x;

    if (this.collide(this, this.player1) || this.collide(this, this.player2))
      this.speed.x = -this.speed.x;
  }

  draw(ctx) {
    ctx.beginPath(); //to clrear previous ball
    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(255, 179, 230)";
    ctx.fill();
  }

  collide(o1, o2) {
    var left1 = o1.position.x;
    var right1 = o1.hasOwnProperty("size")
      ? o1.position.x + o1.size
      : o1.position.x + o1.width;
    var top1 = o1.position.y;
    var bottom1 = o1.hasOwnProperty("size")
      ? o1.position.y + o1.size
      : o1.position.y + o1.height;
    var left2 = o2.position.x;
    var right2 = o2.hasOwnProperty("size")
      ? o2.position.x + o2.size
      : o2.position.x + o2.width;
    var top2 = o2.position.y;
    var bottom2 = o1.hasOwnProperty("size")
      ? o2.position.y + o2.size
      : o2.position.y + o2.height;

    return (
      left1 <= right2 && right1 <= left2 && top1 <= bottom2 && bottom2 >= top2
    );
  }
}
