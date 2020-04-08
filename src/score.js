export class Score{
    constructor(game, x, y, caption) {
        this.game = game;
        this.text = {x: x, y: y, caption:caption};

        this.addEventHandler(game.onGameScoreUpdated, this.updateText.bind(this));
    }

    draw(ctx) {
       ctx.font = "30px Arial";
       ctx.fillStyle = "rgb(255, 179, 230)";
       ctx.textAlign = "center";
       ctx.fillText(this.text.caption, this.text.x, this.text.y);
    }

    update(deltaTime){}
    updateText(newValue) {
        this.text.caption = newValue;
    }
}