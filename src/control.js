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

        default:
          break;
        case 27:
          this.stop = true;
          break;

        // case 32:
        //   game.start();
        //   break;
      }
    });
  }
}
