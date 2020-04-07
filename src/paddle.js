
export class Paddle{
 
  constructor(game, align)
  {
    this.game = game;
    this.alignment = align;
    this.width = 10;
    this.height = 100;
    this.gap = 10;
    this.position = {x: this.gap, y : game.height/2 - this.height/2}
    this.maxSpeed = 1;
    this.speed = 0;

    if(this.alignment===ALIGN.left){ // left paddle
      this.position.x = game.width - this.width - this.gap;
     
      document.addEventListener("P1_down", this.moveDown.bind(this));
      document.addEventListener("P1_up", this.moveUp.bind(this));
      document.addEventListener("P1_stop", this.stop.bind(this))
    } else { // right paddle
      document.addEventListener("P2_down", this.moveDown.bind(this));
      document.addEventListener("P2_up", this.moveUp.bind(this));
      document.addEventListener("P2_stop", this.stop.bind(this));
    }
      
  }

  draw(ctx){
     ctx.fillStyle = "rgb(255, 179, 230)";
     ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime){

     this.position.y += this.speed * deltaTime;
     if (this.position.y < 0) this.position.y = 0;
     if(this.position.y > this.game.height - this.height)
      this.position.y = this.game.height - this.height;
     
    
  }

  moveUp(){
    this.speed = - this.maxSpeed;
    
  }

  moveDown(){
    this.speed = this.maxSpeed;
  }

  stop(){
    this.speed = 0;
  }
}

export const ALIGN ={left:1, right:2};