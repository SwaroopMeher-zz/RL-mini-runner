import game from "./game";
import obstacle from "./obstacle";
import "./styles.css";
import control from "/src/control.js";
import runner from "/src/runner.js";
import { score } from "./obstacle";

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
    ctx.font = "20px Arial";
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
let gameStop = false;
let gameStart = false;
let collision = false;
let prev_score = 0;
let player = new runner(GAME_WIDTH, GAME_HEIGHT);
let blockpos = [
  GAME_WIDTH / 2 - 30 / 2 - 100,
  GAME_WIDTH / 2 - 30 / 2,
  GAME_WIDTH / 2 - 30 / 2 + 100
];

// player.update();
// player.draw(ctx);
let joystick = new control(player, ctx);

let block = new obstacle(GAME_WIDTH, GAME_HEIGHT);
let block2 = new obstacle(GAME_WIDTH, GAME_HEIGHT);
let block3 = new obstacle(GAME_WIDTH, GAME_HEIGHT);
let block4 = new obstacle(GAME_WIDTH, GAME_HEIGHT);

let level = 2;

function controlStart() {
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.keyCode === 83) {
        gameStop = false;
        gameStart = true;
        reqAniFrame();
      } else {
        controlStart();
      }
    },
    { once: true }
  );
}
function gamestart() {
  collision = false;
  ctx.fillStyle = "yellow";
  ctx.fillText("PRESS S TO START", 310, 250);
  ctx.fillText("SCORE: " + prev_score, 353, 275);
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.keyCode === 83) {
        gameStop = false;
        gameStart = true;
        reqAniFrame();
      } else {
        controlStart();
      }
    },
    { once: true }
  );
}

export function gameReset() {
  gameStop = true;
  collision = false;
  gameStart = false;
  prev_score = score;
  //cancelAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  block.initialize(GAME_WIDTH, GAME_HEIGHT);
  block2.initialize(GAME_WIDTH, GAME_HEIGHT);
  block3.initialize(GAME_WIDTH, GAME_HEIGHT);
  block4.initialize(GAME_WIDTH, GAME_HEIGHT);
  player.initialize(GAME_WIDTH, GAME_HEIGHT);
  joystick.stop = false;
  gamestart();
}

function vector(p1, p2) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y
  };
}

function dot(u, v) {
  return u.x * v.x + u.y * v.y;
}

function pointInRectangle(m, r) {
  var AB = vector(r.A, r.B);
  var AM = vector(r.A, m);
  var BC = vector(r.B, r.C);
  var BM = vector(r.B, m);
  var dotABAM = dot(AB, AM);
  var dotABAB = dot(AB, AB);
  var dotBCBM = dot(BC, BM);
  var dotBCBC = dot(BC, BC);
  return (
    0 <= dotABAM && dotABAM <= dotABAB && 0 <= dotBCBM && dotBCBM <= dotBCBC
  );
}

function blockcords(block) {
  var b = {
    A: { x: block.position.x, y: block.position.y },
    B: { x: block.position.x, y: block.position.y + 30 },
    C: { x: block.position.x + 30, y: block.position.y },
    D: { x: block.position.x + 30, y: block.position.y + 30 }
  };

  return b;
}

function collisionDetection() {
  var p1 = { x: player.position.x, y: player.position.y };
  var p2 = { x: player.position.x, y: player.position.y + 30 };
  var p3 = { x: player.position.x + 30, y: player.position.y };
  var p4 = { x: player.position.x + 30, y: player.position.y + 30 };

  var b1 = blockcords(block);
  var b2 = blockcords(block2);
  var b3 = blockcords(block3);
  var b4 = blockcords(block4);

  if (
    pointInRectangle(p1, b1) ||
    pointInRectangle(p1, b2) ||
    pointInRectangle(p1, b3) ||
    pointInRectangle(p1, b4) ||
    pointInRectangle(p4, b1) ||
    pointInRectangle(p4, b2) ||
    pointInRectangle(p4, b3) ||
    pointInRectangle(p4, b4) ||
    pointInRectangle(p2, b1) ||
    pointInRectangle(p2, b2) ||
    pointInRectangle(p2, b3) ||
    pointInRectangle(p2, b4) ||
    pointInRectangle(p3, b1) ||
    pointInRectangle(p3, b2) ||
    pointInRectangle(p3, b3) ||
    pointInRectangle(p3, b4)
  ) {
    return true;
  }
}
//let gamebox = new game(GAME_WIDTH, GAME_HEIGHT);
function gameLoop() {
  collision = collisionDetection();
  if (!collision) {
    if (!gameStop) {
      if (!joystick.stop) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        //if (score === 25 || score === 75 || score === 150)) {
        //level += 1;
        //}
        block.moveDown(ctx);
        if (block.flag) {
          block2.moveDown(ctx);
        }
        if (block2.flag) {
          block3.moveDown(ctx);
        }
        if (block3.flag) {
          block4.moveDown(ctx);
        }
        player.draw(ctx);
        ctx.fillStyle = "black";
        ctx.fillText("Score:" + score, 600, 20);

        requestAnimationFrame(gameLoop);
      } else {
        cancelAnimationFrame(gameLoop);
        requestAnimationFrame(gameLoop);
      }
    } else {
      block.initialize(GAME_WIDTH, GAME_HEIGHT);
      block2.initialize(GAME_WIDTH, GAME_HEIGHT);
      block3.initialize(GAME_WIDTH, GAME_HEIGHT);
      block4.initialize(GAME_WIDTH, GAME_HEIGHT);
      player.initialize(GAME_WIDTH, GAME_HEIGHT);
      joystick.stop = false;
      gameStart = false;
    }
  } else {
    gameReset();
  }
}

function reqAniFrame() {
  requestAnimationFrame(gameLoop);
}
// reqAniFrame()

gamestart();
export { level, gameStart };
//let interval= setInterval(reaniframe, 3000);
