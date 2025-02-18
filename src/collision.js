export function detectRectCollision (r1, r2)
{                       
   return r1.x     < r2.x + r2.width &&
   r1.x + r1.width > r2.x &&
   r1.y            < r2.y + r2.height &&
   r1.y + r1.height > r2.y;
}

export function Rect(x,y,width, height)
{
    return {x:x, y:y, width: width, height:height};
}