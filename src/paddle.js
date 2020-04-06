export class Paddle{
  constructor(game, align)
  {
    this.alignment = align;
    this.width = 10;
    this.height = 100;
    this.gap = 5;
    this.posision = {x: game.width - this.width - this.gap, y : game.heigth/2 - this.height/2}
    
    if(this.alignment===ALIGN.left)
      this.posision.x = this.gap + this.width;    
      
  }

  draw(ctx){
     ctx.fillStyle = "rgb(255, 179, 230)";
     ctx.fillRect(this.posision.x, this.posision.y, this.width, this.height);
  }

  update(deltaTime){

  }
}

export const ALIGN ={left:1, right:2};