import { level } from "./index";
let score = 0;

export default class obstacle {
  constructor(gameWidth, gameHeight) {
    this.initialize(gameWidth, gameHeight);
  }
  initialize(gameWidth, gameHeight) {
    score = 0;
    this.width = 30;
    this.height = 30;
    this.gameWidth = gameWidth;
    this.flag = false;
    this.score_flag = true;
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
    if (this.position.y > 440 && this.score_flag) {
      score += 1;
      this.score_flag = false;
    }
    if (this.position.y >= 0 && this.position.y <= 505) {
      // ctx.fillStyle = "#964B00";
      // ctx.fillRect(
      //   this.position.x,
      //   this.position.y,
      //   this.width + 5,
      //   this.height + 5
      // );
      ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
      this.position.y += level;
      this.draw(ctx);

      if (this.position.y > Math.floor(Math.random() * (400 - 100) + 100)) {
        this.flag = true;
      }
    } else {
      this.position.x = this.blockpos[
        Math.floor(Math.random() * this.blockpos.length)
      ];
      this.position.y = 0;
      this.score_flag = true;
      //ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
    }
  }

  // update() {
  //   if (this.position.x >= 350 || this.position.x <= 450) {
  //     this.position.x += this.axis;
  //   }
  // }
}

export { score };
