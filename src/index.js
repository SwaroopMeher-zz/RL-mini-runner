import obstacle from "./obstacle";
import "./styles.css";
import control from "/src/control.js";
import runner from "/src/runner.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let canvas2 = document.getElementById("background");
let ctx2 = canvas2.getContext("2d");
const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;
class background {
  constructor(ctx) {
    //ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    // ctx.fillStyle = "#de0";
    // ctx.moveTo(250, 0);
    // ctx.lineTo(250, 500);
    // ctx.moveTo(550, 0);
    // ctx.lineTo(550, 500);
    // ctx.stroke();
    ctx.fillStyle = "#0f0";
    ctx.fillRect(0, 0, 245, 500);

    ctx.fillStyle = "#0f0";
    ctx.fillRect(555, 0, 250, 500);

    ctx.fillStyle = "#000";
    ctx.fillRect(245, 0, 5, 500);
    ctx.fillRect(550, 0, 5, 500);

    ctx.fillStyle = "#964B00";
    ctx.fillRect(250, 0, 300, 500);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    // draw track lines
    ctx.beginPath();
    ctx.moveTo(350, 0);
    ctx.lineTo(350, 500);
    ctx.moveTo(450, 0);
    ctx.lineTo(450, 500);
    ctx.stroke();
  }
}
new background(ctx2);
new background(ctx);

let player = new runner(GAME_WIDTH, GAME_HEIGHT);

// player.update();
// player.draw(ctx);
let joystick = new control(player, ctx);

let lastTime = 0;
let block = new obstacle(GAME_WIDTH, GAME_HEIGHT);
function gameLoop(timestamp) {
  if (!joystick.stop) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    block.moveDown(ctx);
    player.draw(ctx);

    requestAnimationFrame(gameLoop);
  } else {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx2.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
}

gameLoop();
