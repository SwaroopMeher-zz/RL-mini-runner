export default class obstacle {
  constructor(gameWidth, gameHeight) {
    this.width = 30;
    this.height = 30;
    this.gameWidth = gameWidth;
    this.blockpos = [
      gameWidth / 2 - this.width / 2 - 100,
      gameWidth / 2 - this.width / 2,
      gameWidth / 2 - this.width / 2 + 100
    ];
    this.position = {
      x: this.blockpos[Math.floor(Math.random() * this.blockpos.length)],
      y: 0
    };

    this.axis = 0;
  }
  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveDown(ctx) {
    if (this.position.y >= 0 && this.position.y <= 505) {
      // ctx.fillStyle = "#964B00";
      // ctx.fillRect(
      //   this.position.x,
      //   this.position.y,
      //   this.width + 5,
      //   this.height + 5
      // );
      ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
      this.position.y += 2;
      this.draw(ctx);
    } else {
      this.position.x = this.blockpos[
        Math.floor(Math.random() * this.blockpos.length)
      ];
      this.position.y = 0;
      //ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
    }
  }

  // update() {
  //   if (this.position.x >= 350 || this.position.x <= 450) {
  //     this.position.x += this.axis;
  //   }
  // }
}
