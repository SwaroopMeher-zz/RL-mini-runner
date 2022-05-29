export default class control {
  constructor(player, ctx) {
    this.stop = false;
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          player.moveLeft(ctx);
          break;

        case 39:
          player.moveRight(ctx);
          break;

        case 32:
          if (!this.stop) {
            this.stop = true;
            break;
          } else {
            this.stop = false;
            break;
          }

        default:
          break;
        // case 32:
        //   game.start();
        //   break;
      }
    });
  }
}
