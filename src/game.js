import control from "./control";

export default class game {
  constructor(GAME_WIDTH, GAME_HEIGHT) {
    (this.GAME_HEIGHT = GAME_WIDTH), (this.GAME_HEIGHT = GAME_HEIGHT);
  }

  gameLoop(ctx2, ctx, player, block, joystick) {
    if (joystick.stop) {
      ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

      block.moveDown(ctx);
      player.draw(ctx);

      requestAnimationFrame(this.gameLoop);
    } else {
      ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
      ctx2.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
    }
  }
}
