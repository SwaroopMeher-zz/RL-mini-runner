export default class runner {
  constructor(gameWidth, gameHeight) {
    this.initialize(gameWidth, gameHeight);
  }

  initialize(gameWidth, gameHeight) {
    this.width = 30;
    this.height = 30;
    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 60
    };

    this.axis = 0;
  }
  draw(ctx) {
    ctx.fillStyle = "#faf";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft(ctx) {
    if (this.position.x >= 350) {
      // ctx.fillStyle = "#964B00";
      // ctx.fillRect(
      //   this.position.x,
      //   this.position.y,
      //   this.width + 5,
      //   this.height + 5
      // );
      ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
      this.position.x -= 100;
      this.draw(ctx);
    }
  }

  moveRight(ctx) {
    if (this.position.x <= 450) {
      // ctx.fillStyle = "#964B00";
      // ctx.fillRect(
      //   this.position.x,
      //   this.position.y,
      //   this.width + 5,
      //   this.height + 5
      // );
      ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
      this.position.x += 100;
      this.draw(ctx);
    }
  }
  // update() {
  //   if (this.position.x >= 350 || this.position.x <= 450) {
  //     this.position.x += this.axis;
  //   }
  // }
}
