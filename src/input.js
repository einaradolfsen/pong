export class InputHandler {
  constructor() {
    document.addEventListener("keydown", this.onKeyDownHandler.bind(this));
    document.addEventListener("keyup", this.onKeyUpHandler.bind(this));
  }

  onKeyDownHandler(event) {
    //console.log(event.keyCode);

    var message = undefined;
    switch (event.keyCode) {
      case 38: //up arrow
        message = new Event("P1_up");
        break;
      case 40: //down arrow
        message = new Event("P1_down");
        break;
      case 81: //Q
        message = new Event("P2_up");
        break;
      case 65: //A
        message = new Event("P2_down");
        break;
    }

    if (message) document.dispatchEvent(message);
  }

  onKeyUpHandler(event) {
    var message = undefined;
    switch (event.keyCode) {
      case 38: //up arrow
      case 40: //down arrow
        message = new Event("P1_stop");
        break;

      case 81: //Q
      case 65: //A
        message = new Event("P2_stop");
        break;
    }

    if (message) document.dispatchEvent(message);
  }
}
