import { gameReset, gameStart } from ".";

export default class control {
  constructor(player, ctx) {
    this.stop = false;
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          if (gameStart && !this.stop) {
            player.moveLeft(ctx);
          }
          break;

        case 39:
          if (gameStart && !this.stop) {
            player.moveRight(ctx);
          }
          break;

        case 32:
          if (gameStart) {
            if (!this.stop) {
              this.stop = true;
              break;
            } else {
              this.stop = false;
              break;
            }
          }
          break;
        case 27:
          gameReset();
          break;
        default:
          break;
        // case 32:
        //   game.start();
        //   break;
      }
    });
  }
}
